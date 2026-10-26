// Shipping (option B, owner decision Oct 25 2026): one flat rate per order,
// computed server-side in /api/checkout and shown as an estimate on /cart.
// Pure and dependency-free so it can be unit tested with plain node
// (scripts/test-shipping.mjs) and shared by server and client.

/** Free US shipping threshold, in dollars (merchandise subtotal after discounts, before tax). */
export const FREE_SHIPPING_THRESHOLD = 100;

/** Flat rate, in cents, for any order that includes a hoodie. */
export const SHIPPING_HOODIE_CENTS = 895;
/** Flat rate, in cents, for orders of tees only. */
export const SHIPPING_TEES_CENTS = 595;
/**
 * Flat rate, in cents, for an order without a hoodie that includes a hat,
 * beanie, accessory or other non-tee item (owner decision Oct 25 2026: same
 * $5.95 as tees - every order without a hoodie ships for $5.95).
 */
export const SHIPPING_OTHER_CENTS = 595;

/** Delivery estimate shown in Stripe Checkout: 2-7 production + 3-7 transit (see /shipping). */
export const SHIPPING_DELIVERY_BUSINESS_DAYS = { min: 5, max: 14 } as const;

export const SHIPPING_LABEL_FREE = 'Free shipping';
export const SHIPPING_LABEL_HOODIE = 'Flat-rate shipping (order with a hoodie)';
export const SHIPPING_LABEL_STANDARD = 'Flat-rate shipping';

/** Shop categories that count as a hoodie / a tee for shipping. */
export const HOODIE_CATEGORIES = ['Hoodies'];
export const TEE_CATEGORIES = ['Tees'];

export type ShippingLine = { category: string; unitPrice: number; qty: number };
export type ShippingQuote = {
  amountCents: number;
  label: string;
  rule: 'free' | 'hoodie' | 'tees' | 'other';
  /** Merchandise subtotal in cents that the rule was judged on. */
  subtotalCents: number;
};

/**
 * Flat shipping for one order.
 * subtotal (after discounts, before tax) >= $100 -> $0; else any hoodie -> $8.95;
 * else tees only -> $5.95; else (no hoodie, has a hat/beanie/accessory) -> $5.95.
 * `discountCents` is 0 today: checkout offers no discounts or promo codes.
 */
export function quoteShipping(lines: ShippingLine[], discountCents = 0): ShippingQuote {
  const gross = lines.reduce((n, l) => n + Math.round(l.unitPrice * 100) * Math.max(0, Math.floor(l.qty)), 0);
  const subtotalCents = Math.max(0, gross - Math.max(0, Math.round(discountCents)));
  const items = lines.filter((l) => l.qty > 0);
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD * 100) {
    return { amountCents: 0, label: SHIPPING_LABEL_FREE, rule: 'free', subtotalCents };
  }
  if (items.some((l) => HOODIE_CATEGORIES.includes(l.category))) {
    return { amountCents: SHIPPING_HOODIE_CENTS, label: SHIPPING_LABEL_HOODIE, rule: 'hoodie', subtotalCents };
  }
  if (items.every((l) => TEE_CATEGORIES.includes(l.category))) {
    return { amountCents: SHIPPING_TEES_CENTS, label: SHIPPING_LABEL_STANDARD, rule: 'tees', subtotalCents };
  }
  return { amountCents: SHIPPING_OTHER_CENTS, label: SHIPPING_LABEL_STANDARD, rule: 'other', subtotalCents };
}