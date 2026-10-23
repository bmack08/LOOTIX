// ─────────────────────────────────────────────────────────────
// Printful SYNC variant ids — PLACEHOLDERS. OWNER MUST FILL IN.
//
// Every value below is `null`. Nothing here is a real id: no number in
// this file was guessed, inferred or copied from anywhere.
//
// WHAT GOES IN HERE
//   The `id` of an entry in the `sync_variants` array of a SYNCED store
//   product, i.e. from `GET https://api.printful.com/store/products/{id}`
//   (or the variant row in the Printful dashboard for that store product).
//
//   NOT the catalog variant id (`variant_id`), and NOT the product id
//   (`sync_product.id`). Orders are placed with `sync_variant_id`, which
//   is why no print files are needed on the order itself — the synced
//   product already carries them.
//
// HOW TO FILL IT
//   One key per purchasable shop line, `${slug}:${size}`. Sized apparel
//   (Hoodies, Tees) uses S / M / L / XL / 2XL; anything unsized uses the
//   literal size `ONE` (ONE_SIZE in src/config/sizes.ts). Replace each
//   `null` with the matching sync variant id as a plain number.
//
// WHAT `null` MEANS
//   "Not mapped yet." An order whose lines hit a `null` is still stored
//   in Supabase, with status `needs_variant`, and NO Printful order is
//   created for it. Filling the id is what unblocks that order.
//
// Coming-soon products (welcome-looter-kit, lootix-x1-shadow) are not
// sold in checkout and are deliberately absent from this map. The PACKS
// in src/lib/site.ts are display-only and never reach checkout either.
//
// This file is plain data + pure lookups: no secrets, no network calls,
// no module-load side effects. It is safe to import anywhere.
// ─────────────────────────────────────────────────────────────

import { SHOP_PRODUCTS } from '@/lib/site';
import { ONE_SIZE, isComingSoon, needsSize, sizesFor } from '@/config/sizes';

/**
 * `${slug}:${size}` → Printful sync variant id, or `null` when the owner
 * has not mapped it yet. Hand-written, one line per sellable combination.
 */
export const PRINTFUL_SYNC_VARIANT_IDS: Record<string, number | null> = {
  // TODO(owner): Guild Hoodie — Black ($85, Hoodies) — 5 sync variant ids
  'guild-hoodie-black:S': null,
  'guild-hoodie-black:M': null,
  'guild-hoodie-black:L': null,
  'guild-hoodie-black:XL': null,
  'guild-hoodie-black:2XL': null,

  // TODO(owner): Summon Hoodie ($85, Hoodies) — 5 sync variant ids
  'summon-hoodie:S': null,
  'summon-hoodie:M': null,
  'summon-hoodie:L': null,
  'summon-hoodie:XL': null,
  'summon-hoodie:2XL': null,

  // TODO(owner): Lord of Flame Tee ($45, Tees) — 5 sync variant ids
  'lord-of-flame-tee:S': null,
  'lord-of-flame-tee:M': null,
  'lord-of-flame-tee:L': null,
  'lord-of-flame-tee:XL': null,
  'lord-of-flame-tee:2XL': null,

  // TODO(owner): Nat 20 Tee ($45, Tees) — 5 sync variant ids
  'nat-20-tee:S': null,
  'nat-20-tee:M': null,
  'nat-20-tee:L': null,
  'nat-20-tee:XL': null,
  'nat-20-tee:2XL': null,

  // TODO(owner): Hoard Dragon Tee ($45, Tees) — 5 sync variant ids
  'hoard-dragon-tee:S': null,
  'hoard-dragon-tee:M': null,
  'hoard-dragon-tee:L': null,
  'hoard-dragon-tee:XL': null,
  'hoard-dragon-tee:2XL': null,

  // TODO(owner): Guild Sticker Pack ($8, Accessories) — unsized, one id
  'guild-sticker-pack:ONE': null,
};

/**
 * The sync variant id for a shop line, or `null` when it cannot be used.
 *
 * `null` for an unknown key, an unmapped (`null`) entry, or anything that
 * is not a positive integer — callers only ever get an id they can send
 * to Printful as `sync_variant_id`.
 */
export function printfulVariantFor(slug: string, size: string): number | null {
  const id = PRINTFUL_SYNC_VARIANT_IDS[`${slug}:${size}`];
  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) return null;
  return id;
}

/**
 * The `slug:size` keys in `items` with no usable sync variant id.
 *
 * Empty means every line can be ordered from Printful. Anything returned
 * is what sends an order to status `needs_variant`. Duplicates are
 * collapsed so the list reads as "these keys need filling in".
 */
export function missingVariantKeys(items: { slug: string; size: string }[]): string[] {
  const missing: string[] = [];
  for (const item of items) {
    if (printfulVariantFor(item.slug, item.size) !== null) continue;
    const key = `${item.slug}:${item.size}`;
    if (!missing.includes(key)) missing.push(key);
  }
  return missing;
}

/**
 * Every purchasable shop combination that still has no usable id here —
 * either no entry at all (a product or size was added to the shop and
 * this map was not updated) or an entry that is still a `null`
 * placeholder.
 *
 * A consistency check for the admin page or a later pre-flight warning.
 * It only reads data and returns a list: it never throws and never runs
 * at module load, so an unfilled map can never break the build.
 */
export function unmappedPurchasableKeys(): string[] {
  const keys: string[] = [];
  for (const product of SHOP_PRODUCTS) {
    if (isComingSoon(product)) continue;
    const sizes: readonly string[] = needsSize(product)
      ? (sizesFor(product) as readonly string[])
      : [ONE_SIZE];
    for (const size of sizes) {
      if (printfulVariantFor(product.slug, size) === null) {
        keys.push(`${product.slug}:${size}`);
      }
    }
  }
  return keys;
}
