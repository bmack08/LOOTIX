import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { grantEntries } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';

export const runtime = 'nodejs';

/**
 * Stripe webhook — the ONLY place purchased entries are granted.
 *
 * Stripe signs every request; we verify that signature before trusting it,
 * so a random POST to this URL can't award itself entries. Fires on
 * `checkout.session.completed` (payment actually succeeded).
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://www.getlootix.com/api/stripe/webhook
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
    const email = (session.customer_details?.email || session.customer_email || '').toLowerCase();
    const entries = parseInt(session.metadata?.totalEntries || '0', 10);

    if (email && entries > 0) {
      try {
        await grantEntries(email, entries, 'order', { session_id: session.id });
        await sendWelcome(email, entries);
        console.log(`Granted ${entries} entries to ${email} (order ${session.id})`);
      } catch (e) {
        // Return 500 so Stripe retries — never silently lose someone's entries
        console.error('Failed to grant entries', e);
        return NextResponse.json({ ok: false }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
