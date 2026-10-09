import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SHOP_PRODUCTS } from '@/lib/site';
import { ENTRIES_PER_ORDER, SITE_ORIGIN } from '@/lib/sweepstakes';

export const runtime = 'nodejs';

/** Origins we will redirect back to after checkout. Anything else → canonical. */
const ALLOWED_ORIGINS = [
  SITE_ORIGIN,
  'https://www.getlootix.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function safeOrigin(req: Request): string {
  const origin = req.headers.get('origin');
  // Never echo an attacker-supplied Origin into success_url / cancel_url.
  return origin && ALLOWED_ORIGINS.includes(origin) ? origin : SITE_ORIGIN;
}

/**
 * Creates a Stripe Checkout Session (Stripe-hosted payment page).
 *
 * SECURITY: the browser only sends {slug, qty}. Prices are looked up
 * server-side from our own catalog, so a tampered client can't buy a $140
 * sneaker for $1.
 *
 * ENTRIES: the client cannot influence the entry count at all. One completed
 * order earns exactly ENTRIES_PER_ORDER, decided by the webhook after payment
 * (and only for eligible US residents). We record the rule in metadata purely
 * for auditability — the webhook does not trust it as a quantity.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Checkout is not configured yet.' }, { status: 503 });
  }
  const stripe = new Stripe(secret);

  let body: { items?: { slug: string; qty: number }[]; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const items = (body.items || []).filter((i) => i && typeof i.slug === 'string');
  if (!items.length) {
    return NextResponse.json({ ok: false, error: 'Your cart is empty.' }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const { slug, qty } of items) {
    const product = SHOP_PRODUCTS.find((p) => p.slug === slug);
    if (!product) continue; // silently drop unknown slugs
    const quantity = Math.max(1, Math.min(10, Math.floor(qty || 1))); // clamp 1–10

    line_items.push({
      quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.priceValue * 100), // cents
        product_data: {
          name: product.name,
          description: product.sub,
        },
      },
    });
  }

  if (!line_items.length) {
    return NextResponse.json({ ok: false, error: 'No valid items in cart.' }, { status: 400 });
  }

  const origin = safeOrigin(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // The entry is granted by the webhook after payment succeeds. This is a
      // record of the RULE, not a client-supplied quantity.
      metadata: {
        entry_rule: 'one-per-completed-order',
        entries_per_order: String(ENTRIES_PER_ORDER),
      },
      customer_email: body.email || undefined,
      // Merch ships worldwide; only the sweepstakes ENTRY is US-only, which the
      // webhook enforces from the collected address.
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'IE', 'NZ'] },
      // Guarantees we always have a country to judge entry eligibility against.
      billing_address_collection: 'required',
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error('Stripe session failed', e);
    return NextResponse.json({ ok: false, error: 'Could not start checkout. Try again.' }, { status: 502 });
  }
}
