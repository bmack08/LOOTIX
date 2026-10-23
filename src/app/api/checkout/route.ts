import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SHOP_PRODUCTS, GIVEAWAY, type ShopProduct } from '@/lib/site';
import { isComingSoon, isValidSize, needsSize, ONE_SIZE } from '@/config/sizes';

export const runtime = 'nodejs';

/** Stripe's hard cap on a single metadata VALUE. */
const METADATA_VALUE_MAX = 500;

/**
 * Creates a Stripe Checkout Session.
 *
 * SECURITY: the browser only sends {slug, qty, size}. Prices are looked up
 * server-side from our own catalog, so a tampered client can't buy a $140
 * sneaker for $1, and the size is validated against the catalog too — the
 * client cannot invent a size we don't sell. Entries are never sent from here
 * either — the webhook computes them from the session's own totals after
 * payment succeeds.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Checkout is not configured yet.' }, { status: 503 });
  }
  const stripe = new Stripe(secret);

  let body: { items?: { slug: string; qty: number; size?: string }[]; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const items = (body.items || []).filter((i) => i && typeof i.slug === 'string');
  if (!items.length) {
    return NextResponse.json({ ok: false, error: 'Your cart is empty.' }, { status: 400 });
  }

  // Keyed by slug + size, so the same hoodie in M sent twice becomes one line
  // while M and L stay separate.
  const merged = new Map<string, { product: ShopProduct; size: string; qty: number }>();

  for (const { slug, qty, size } of items) {
    const product = SHOP_PRODUCTS.find((p) => p.slug === slug);
    if (!product) continue; // silently drop unknown slugs
    if (isComingSoon(product)) {
      return NextResponse.json({ ok: false, error: `${product.name} is not on sale yet.` }, { status: 400 });
    }

    // Sized products must name a size we sell; everything else is ONE.
    let lineSize = ONE_SIZE;
    if (needsSize(product)) {
      const picked = typeof size === 'string' ? size.trim().toUpperCase() : '';
      if (!isValidSize(product, picked)) {
        return NextResponse.json({ ok: false, error: `Choose a size for ${product.name}.` }, { status: 400 });
      }
      lineSize = picked;
    }

    const quantity = Math.max(1, Math.min(10, Math.floor(qty || 1))); // clamp 1–10
    const key = `${product.slug}:${lineSize}`;
    const existing = merged.get(key);
    if (existing) {
      existing.qty = Math.min(10, existing.qty + quantity); // merged line keeps the cap
    } else {
      merged.set(key, { product, size: lineSize, qty: quantity });
    }
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const { product, size, qty } of merged.values()) {
    const sized = size !== ONE_SIZE;

    line_items.push({
      quantity: qty,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.priceValue * 100), // cents
        product_data: {
          name: sized ? `${product.name} (${size})` : product.name,
          description: product.sub,
          // Primary channel for the size: the webhook reads line items with
          // ['data.price.product'] expanded and takes {slug, size} from here.
          metadata: { slug: product.slug, size },
        },
      },
    });
  }

  if (!line_items.length) {
    return NextResponse.json({ ok: false, error: 'No valid items in cart.' }, { status: 400 });
  }

  // Compact `slug:size:qty` fallback for the webhook, only when it fits inside
  // Stripe's 500-character metadata value — truncated it would be worse than
  // absent, since the per-line-item metadata above is the primary channel.
  const compactItems = Array.from(merged.values())
    .map((l) => `${l.product.slug}:${l.size}:${l.qty}`)
    .join(',');
  const metadata: Record<string, string> = { giveaway_id: GIVEAWAY.id };
  if (compactItems.length <= METADATA_VALUE_MAX) metadata.items = compactItems;

  const origin = req.headers.get('origin') || 'https://www.getlootix.com';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Entries are computed and granted by the webhook from this session's
      // own subtotal after payment succeeds — nothing about entries is
      // trusted from, or passed through, the client.
      metadata,
      customer_email: body.email || undefined,
      // US only (owner decision Oct 22).
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error('Stripe session failed', e);
    return NextResponse.json({ ok: false, error: 'Could not start checkout. Try again.' }, { status: 502 });
  }
}
