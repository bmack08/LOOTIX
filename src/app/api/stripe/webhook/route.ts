import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantOrderEntry, voidOrderEntries } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';
import { decideOrderEntry } from '@/lib/stripe-entries';
import { decideRefundVoid, decideDisputeVoid, type VoidDecision } from '@/lib/refunds';

export const runtime = 'nodejs';

/**
 * Stripe webhook — the ONLY place purchased entries are granted or voided.
 *
 * Stripe signs every request; we verify that signature before trusting it,
 * so a random POST to this URL can't award itself entries.
 *
 * Entry rules enforced here (see src/lib/sweepstakes.ts):
 *   · one completed, PAID order → exactly 1 entry, never per item or per dollar
 *   · entry only for eligible US residents (merch still sells elsewhere)
 *   · idempotent on the Stripe session id, so retries never double-grant
 *   · no per-person cap — repeat orders each earn their own entry
 *
 * Void rules (see src/lib/refunds.ts):
 *   · full refund        → void the entry
 *   · partial refund     → entry stands
 *   · chargeback opened  → void the entry
 *
 * Nothing here logs an email address: session and charge ids are enough to
 * trace an order and are not personal data.
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://getlootix.com/api/stripe/webhook
 *   events: checkout.session.completed
 *           charge.refunded
 *           charge.dispute.created
 * then copy the signing secret into STRIPE_WEBHOOK_SECRET.
 */

const HANDLED_EVENTS = [
  'checkout.session.completed',
  'charge.refunded',
  'charge.dispute.created',
] as const;

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

  if (!(HANDLED_EVENTS as readonly string[]).includes(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      return await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }
    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge;
      return await handleVoid(stripe, decideRefundVoid(charge), charge.id);
    }
    if (event.type === 'charge.dispute.created') {
      const dispute = event.data.object as Stripe.Dispute;
      return await handleVoid(stripe, decideDisputeVoid(dispute), dispute.id);
    }
  } catch (e) {
    // Return 500 so Stripe retries — never silently lose or keep an entry
    console.error(`Failed to process ${event.type} (${event.id})`, e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const decision = decideOrderEntry(session);

  if (!decision.grant) {
    // Not an error — an ineligible or unpaid order is still a valid sale.
    console.log(`Order ${session.id}: no entry granted (${decision.reason})`);
    return NextResponse.json({ received: true });
  }

  // payment_intent and the charge id are recorded so a later refund or
  // chargeback can find this entry: refund events carry no session id.
  const paymentIntent =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const result = await grantOrderEntry(decision.email, session.id, {
    country: decision.country,
    payment_intent: paymentIntent,
  });

  if (result.duplicate) {
    console.log(`Order ${session.id} already granted its entry; skipping replay`);
  } else {
    console.log(`Granted ${result.granted} entry for order ${session.id} (${decision.country})`);
    // Only email on a first grant, so retries don't spam the customer.
    await sendWelcome(decision.email, result.granted);
  }
  return NextResponse.json({ received: true });
}

async function handleVoid(stripe: Stripe, decision: VoidDecision, eventObjectId: string) {
  if (!decision.void) {
    console.log(`${eventObjectId}: no entry voided (${decision.reason})`);
    return NextResponse.json({ received: true });
  }

  // Orders granted before payment_intent was recorded in meta can only be
  // found by session id, so ask Stripe which checkout session this payment
  // belongs to and match on that as well.
  let sessionId: string | null = null;
  if (decision.paymentIntent) {
    try {
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: decision.paymentIntent,
        limit: 1,
      });
      sessionId = sessions.data[0]?.id ?? null;
    } catch (e) {
      // Not fatal: payment_intent / charge_id may still match.
      console.error(`Could not resolve a checkout session for ${decision.paymentIntent}`, e);
    }
  }

  const result = await voidOrderEntries(
    { paymentIntent: decision.paymentIntent, chargeId: decision.chargeId, sessionId },
    decision.reason,
  );

  if (result.voided === 0) {
    // Either already voided (a replayed webhook) or the order never earned an
    // entry — a non-US or unpaid order, for instance. Neither is an error.
    console.log(
      `${decision.reason} for charge ${decision.chargeId}: nothing to void ` +
        `(already voided, or this order never earned an entry)`,
    );
  } else {
    console.log(
      `Voided ${result.voided} entry/entries for charge ${decision.chargeId} (${decision.reason})`,
    );
  }
  return NextResponse.json({ received: true });
}
