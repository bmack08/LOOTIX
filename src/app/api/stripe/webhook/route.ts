import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantOrderEntries, voidOrderEntries } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';
import { isEntryWindowOpen } from '@/lib/site';
import { entriesForSubtotalCents } from '@/config/giveaway';

export const runtime = 'nodejs';

/**
 * Stripe webhook — the ONLY place purchased entries are granted or voided.
 *
 * Stripe signs every request; we verify that signature before trusting it, so
 * a random POST to this URL can't award itself entries.
 *
 * Events:
 *   checkout.session.completed → grant floor(subtotal after discounts) entries
 *   charge.refunded (full)     → void that order's entries
 *   charge.dispute.created     → void that order's entries
 *
 * Entry counts are computed HERE from the Stripe session totals, never from
 * client-supplied metadata.
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://www.getlootix.com/api/stripe/webhook
 *   events: checkout.session.completed, charge.refunded, charge.dispute.created
 * then copy the signing secret into STRIPE_WEBHOOK_SECRET.
 */

/**
 * Entries for a paid session: the subtotal after discounts, before tax and
 * shipping. amount_subtotal is the pre-discount line-item total, so the
 * discount comes off it — which equals amount_total minus tax and shipping.
 */
function entriesForSession(session: Stripe.Checkout.Session): number {
  const subtotal = session.amount_subtotal ?? 0;
  const discount = session.total_details?.amount_discount ?? 0;
  const net = subtotal - discount;
  return entriesForSubtotalCents(Math.max(0, net));
}

/**
 * The moment the order was actually paid, for the entry-window check.
 *
 * `event.created` is when Stripe emitted checkout.session.completed, i.e. when
 * payment succeeded — NOT session.created, which is when the customer opened
 * checkout and can be hours earlier. Retries of the same event keep the
 * original timestamp, so this stays stable.
 */
function paidAtMs(event: Stripe.Event, session: Stripe.Checkout.Session): number {
  const seconds = event.created ?? session.created ?? Math.floor(Date.now() / 1000);
  return seconds * 1000;
}

async function sessionIdForCharge(stripe: Stripe, charge: Stripe.Charge): Promise<string | null> {
  const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!pi) return null;
  try {
    const list = await stripe.checkout.sessions.list({ payment_intent: pi, limit: 1 });
    return list.data[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) {
    return NextResponse.json({ ok: false, error: 'Stripe not configured' }, { status: 503 });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ ok: false, error: 'Missing signature' }, { status: 400 });

  // must use the RAW body for signature verification
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (e) {
    console.error('Stripe signature verification failed', e);
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = (session.customer_details?.email || session.customer_email || '').toLowerCase();
        const entries = entriesForSession(session);

        // No entries outside the entry window — the order still stands, it
        // just doesn't earn a shot at a giveaway that isn't running.
        if (!isEntryWindowOpen(paidAtMs(event, session))) {
          console.log(`order ${session.id}: paid outside the entry window — no entries granted`);
          break;
        }
        if (!email || entries <= 0) break;

        const pi = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
        const result = await grantOrderEntries(email, entries, session.id, {
          payment_intent: pi ?? null,
          amount_subtotal: session.amount_subtotal ?? null,
          amount_discount: session.total_details?.amount_discount ?? null,
        });
        if (result.granted > 0) {
          await sendWelcome(email, entries);
        }
        // No customer email in the logs.
        console.log(
          `order ${session.id}: ${result.duplicate ? 'already granted (duplicate event)' : `granted ${entries} entries`}`,
        );
        break;
      }

      // Full refund voids the order's entries. A partial refund (a size
      // exchange price difference, say) leaves them alone.
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        if (charge.amount_refunded < charge.amount) {
          console.log(`charge ${charge.id}: partial refund — entries kept`);
          break;
        }
        const sessionId = await sessionIdForCharge(stripe, charge);
        const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id ?? null;
        const { voided } = await voidOrderEntries(sessionId, pi, 'refund');
        console.log(`charge ${charge.id}: refunded — voided ${voided} entry row(s)`);
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        const chargeId = typeof dispute.charge === 'string' ? dispute.charge : dispute.charge?.id;
        let sessionId: string | null = null;
        let pi: string | null =
          typeof dispute.payment_intent === 'string' ? dispute.payment_intent : dispute.payment_intent?.id ?? null;
        if (chargeId) {
          const charge = await stripe.charges.retrieve(chargeId);
          sessionId = await sessionIdForCharge(stripe, charge);
          pi =
            pi ?? (typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id ?? null);
        }
        const { voided } = await voidOrderEntries(sessionId, pi, 'chargeback');
        console.log(`dispute ${dispute.id}: chargeback — voided ${voided} entry row(s)`);
        break;
      }

      default:
        break;
    }
  } catch (e) {
    // Return 500 so Stripe retries — never silently lose or keep entries.
    console.error(`Stripe webhook handler failed for ${event.type}`, e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
