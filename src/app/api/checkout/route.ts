import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SHOP_PRODUCTS } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * Creates a Stripe Checkout Session.
 *
 * SECURITY: the browser only sends {slug, qty}. Price and entry counts are
 * looked up server-side from our own catalog, so a tampered client can't
 * buy a $140 sneaker for $1 or award itself 10,000 entries.
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
  let totalEntries = 0;

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
          description: `${product.sub} · Earns ${product.entries} entries`,
        },
      },
    });
    totalEntries += product.entries * quantity;
  }

  if (!line_items.length) {
    return NextResponse.json({ ok: false, error: 'No valid items in cart.' }, { status: 400 });
  }

  const origin = req.headers.get('origin') || 'https://www.getlootix.com';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // entries are granted by the webhook after payment succeeds
      metadata: { totalEntries: String(totalEntries) },
      customer_email: body.email || undefined,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'IE', 'NZ'] },
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error('Stripe session failed', e);
    return NextResponse.json({ ok: false, error: 'Could not start checkout. Try again.' }, { status: 502 });
  }
}
