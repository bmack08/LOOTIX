import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantOrderEntry } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';
import { decideOrderEntry } from '@/lib/stripe-entries';

export const runtime = 'nodejs';

/**
 * Stripe webhook — the ONLY place purchased entries are granted.
 *
 * Stripe signs every request; we verify that signature before trusting it,
 * so a random POST to this URL can't award itself entries. Fires on
 * `checkout.session.completed` (payment actually succeeded).
 *
 * Entry rules enforced here (see src/lib/sweepstakes.ts):
 *   · one completed, PAID order → exactly 1 entry, never per item or per dollar
 *   · entry only for eligible US residents (merch still sells elsewhere)
 *   · idempotent on the Stripe session id, so retries never double-grant
 *   · no per-person cap — repeat orders each earn their own entry
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://getlootix.com/api/stripe/webhook
 *   event: checkout.session.completed
 * then copy the signing secret into STRIPE_WEBHOOK_SECRET.
 */
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const decision = decideOrderEntry(session);

    if (!decision.grant) {
      // Not an error — an ineligible or unpaid order is still a valid sale.
      console.log(`Order ${session.id}: no entry granted (${decision.reason})`);
      return NextResponse.json({ received: true });
    }

    try {
      const result = await grantOrderEntry(decision.email, session.id, { country: decision.country });
      if (result.duplicate) {
        console.log(`Order ${session.id} already granted its entry; skipping replay`);
      } else {
        console.log(`Granted ${result.granted} entry to ${decision.email} (order ${session.id}, ${decision.country})`);
        // Only email on a first grant, so retries don't spam the customer.
        await sendWelcome(decision.email, result.granted);
      }
    } catch (e) {
      // Return 500 so Stripe retries — never silently lose someone's entry
      console.error('Failed to grant entry', e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
