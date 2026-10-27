// ─────────────────────────────────────────────────────────────
// Sizes — the ONE place that says which shop items have a size, which
// sizes they come in, and which items are listed but not on sale yet.
//
// Launch-collection apparel (Hoodies, Tees) is sold S–2XL. Every other category
// has no size at all; those lines are recorded as ONE_SIZE server-side
// so an order row always has something to key a Printful variant on.
//
// Read by the shop card picker, the cart and /api/checkout, so the
// browser and the server agree on what a sellable line is. The cart
// itself stores no size for unsized products — ONE_SIZE belongs to the
// server/order side, not to localStorage.
//
// Prices and the rest of SHOP_PRODUCTS live in src/lib/site.ts; this
// file only reads the category and the slug.
// ─────────────────────────────────────────────────────────────

import type { ShopProduct } from '@/lib/site';

/** The apparel size run. Order matters — the picker renders it as-is. */
export const SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;

export type Size = (typeof SIZES)[number];

/** The size recorded for a product that has no size (stickers, etc.). */
export const ONE_SIZE = 'ONE';

/**
 * The SHOP_CATEGORIES (src/lib/site.ts) whose products are sized.
 * The others — Footwear, Accessories — are ONE_SIZE.
 */
const SIZED_CATEGORIES: readonly string[] = ['Hoodies', 'Tees'];

/**
 * Slugs that appear in SHOP_PRODUCTS for display but cannot be bought
 * yet: not addable in the shop, and rejected by /api/checkout.
 */
export const COMING_SOON_SLUGS: ReadonlySet<string> = new Set([
  'welcome-looter-kit',
  'lootix-x1-shadow',
]);

/** Everything these helpers need from a product. */
type Sizeable = Pick<ShopProduct, 'category'>;

/** The sizes a product is sold in, or `null` when it has no size. */
export function sizesFor(product: Sizeable): readonly Size[] | null {
  return SIZED_CATEGORIES.includes(product.category) ? SIZES : null;
}

/** True when a product can only be bought in one of SIZES. */
export function needsSize(product: Sizeable): boolean {
  return sizesFor(product) !== null;
}

/**
 * True when `size` is usable for this product.
 *
 * A product with no size accepts anything, including nothing — its size
 * is ignored and recorded as ONE_SIZE — so a caller that must have a
 * real size has to check `needsSize` first.
 */
export function isValidSize(product: Sizeable, size?: string | null): boolean {
  const allowed = sizesFor(product);
  if (!allowed) return true;
  return typeof size === 'string' && (allowed as readonly string[]).includes(size);
}

/** True when a product is listed but not on sale yet. */
export function isComingSoon(product: Pick<ShopProduct, 'slug'>): boolean {
  return COMING_SOON_SLUGS.has(product.slug);
}
