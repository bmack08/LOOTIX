import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SHOP_PRODUCTS, GIVEAWAY, type ShopProduct } from '@/lib/site';
import { GIVEAWAY_ENABLED } from '@/config/flags';
import { isComingSoon, isValidSize, needsSize, ONE_SIZE } from '@/config/sizes';
import { makeAgreement } from '@/config/agreement';
import { quoteShipping, SHIPPING_DELIVERY_BUSINESS_DAYS } from '@/config/shipping';

export const runtime = 'nodejs';

/** Stripe's hard cap on a single metadata VALUE. */
const METADATA_VALUE_MAX = 500;

// Per-IP rate limit: 20 checkout attempts / 10 min, in-process (same pattern
// as /api/subscribe). Best effort only - it stops one instance being hammered
// into creating Stripe sessions; it is not a global limit.
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 20;
const rlHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rlHits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  recent.push(now);
  rlHits.set(ip, recent);
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) if (!v.some((t) => now - t < RL_WINDOW_MS)) rlHits.delete(k);
  }
  return recent.length > RL_MAX;
}

function clientIp(req: Request): string {
  const platform = req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-real-ip');
  if (platform) return platform.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const hops = fwd.split(',').map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return 'unknown';
}


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
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
  }
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Checkout is not configured yet.' }, { status: 503 });
  }
  const stripe = new Stripe(secret);

  let body: { items?: { slug: string; qty: number; size?: string }[]; email?: string; agreed?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // The required Terms + Official Rules box (Legal, 2026-10-24). Exactly true,
  // not truthy - the client UI is not trusted to have enforced it.
  if (body.agreed !== true) {
    return NextResponse.json({ ok: false, error: 'Please agree to the Terms of Use and Official Rules.' }, { status: 400 });
  }
  const agreement = makeAgreement('checkout');

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
  // giveaway_id is tagged only while the giveaway is on; off, this is a plain store order.
  const metadata: Record<string, string> = { ...(GIVEAWAY_ENABLED ? { giveaway_id: GIVEAWAY.id } : {}), ...agreement };
  if (compactItems.length <= METADATA_VALUE_MAX) metadata.items = compactItems;

  // Flat shipping per order (option B), computed here from the server-side
  // catalog prices - never from the client. No discounts exist at checkout
  // today, so the subtotal it is judged on is the plain merchandise total.
  // Inline shipping_rate_data: no Stripe dashboard rate is needed.
  const shipping = quoteShipping(
    Array.from(merged.values()).map((l) => ({ category: l.product.category, unitPrice: l.product.priceValue, qty: l.qty })),
  );
  const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: shipping.amountCents, currency: 'usd' },
        display_name: shipping.label,
        delivery_estimate: {
          minimum: { unit: 'business_day', value: SHIPPING_DELIVERY_BUSINESS_DAYS.min },
          maximum: { unit: 'business_day', value: SHIPPING_DELIVERY_BUSINESS_DAYS.max },
        },
        metadata: { rule: shipping.rule },
      },
    },
  ];
  metadata.shipping_rule = shipping.rule;

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
      shipping_options,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error('Stripe session failed', e);
    return NextResponse.json({ ok: false, error: 'Could not start checkout. Try again.' }, { status: 502 });
  }
}
