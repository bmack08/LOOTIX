// Product layer over PRINTFUL_CATALOG. The catalog has one entry per
// Printful product x garment colour (a "colourway"); the store front shows
// one PRODUCT (/products/{handle}) per design x garment, with its colourways and sizes as
// variants. Derived, not hand-kept: add a colourway to the catalog and it
// appears here.
//
// Cart and checkout still key items by the COLOURWAY slug + size (the
// catalog slug), so nothing downstream changes. A product page simply
// picks a colourway and adds that.

import { PRINTFUL_CATALOG, type CatalogEntry } from './printful-catalog';
import GALLERY from './printful-gallery.json';
import BLANKS from './printful-blanks.json';
import MOCKUPS from './printful-mockups.json';

export type GalleryImage = {
  url: string;
  /** 'mockup' = Printful product preview; 'artwork' = flat print file. */
  kind: 'mockup' | 'artwork';
  /** Printful placement: 'front' for the mockup, else the print-file type. */
  placement: string;
};

export type ProductVariant = {
  size: string; // a size from the catalog, or 'ONE'
  /** Printful SYNC variant id. */
  printfulVariantId: number;
  /** False when Printful reports the blank out of stock (read-only snapshot). */
  available: boolean;
};

export type Colourway = {
  /** Catalog slug: the cart / checkout item key. */
  slug: string;
  name: string;
  /** Garment colour, e.g. "Black". */
  colour: string;
  /** Print ink, e.g. "Bone" (null for products without an ink option). */
  ink: string | null;
  /** Swatch label: "Bone on Black" or just "Black". */
  label: string;
  /** Spec label: "Black \u00b7 Bone ink" or just "Black". */
  swatchLabel: string;
  /** URL key for ?color= on the product page, unique within the product. */
  key: string;
  /** Garment hex from Printful's color_code (read-only snapshot). */
  hex: string;
  /** False when every size is out of stock. */
  available: boolean;
  price: string;
  priceValue: number;
  printfulProductId: number;
  sizes: readonly string[] | null;
  variants: readonly ProductVariant[];
  images: readonly GalleryImage[];
};

export type Fit = 'mens' | 'womens' | 'cropped';
export type Design = 'wordmark' | 'mark';

export type ProductGroup = {
  /** URL handle: /products/{handle}, e.g. "lootix-mark-box-tee". */
  handle: string;
  /** Older short slug (no "lootix-" prefix), kept for legacy redirects. */
  slug: string;
  title: string;
  sub: string;
  category: CatalogEntry['category'];
  /** "From" price: the lowest colourway price. */
  price: string;
  priceValue: number;
  /** Union of sizes across colourways, in picker order. */
  sizes: readonly string[] | null;
  colourways: readonly Colourway[];
  /** Key of the colourway shown first. */
  defaultColour: string;
  /** Printful catalog (blank) product id: size chart + details source. */
  blankId: number;
  /** "Men's Box Tee | Cotton Heritage MC1087". */
  blankTitle: string;
  fit: readonly Fit[];
  design: Design | null;
  /** One-line fit note for the Details accordion. */
  fitNote: string;
  /** Fabric / weight bullets from the Printful blank description. */
  fabric: readonly string[];
  printMethod: string;
  /** Handles of products to show under "Style with". */
  styleWith: readonly string[];
};

type BlankVariant = { catalogProductId: number; catalogVariantId: number; availability: string; hex: string | null };
type Blank = { title: string; description: string };
const blankVariants = (BLANKS as unknown as { variants: Record<string, BlankVariant> }).variants;
const blanks = (BLANKS as unknown as { blanks: Record<string, Blank> }).blanks;

/** Hand-kept per blank: fit copy. Everything else is derived. */
const FIT_NOTES: Record<number, string> = {
  206: 'Low profile, unstructured, adjustable strap.',
  317: 'Cropped fit with a raw hem. Size up for a longer body.',
  360: 'Relaxed fit through the body.',
  917: 'Boxy fit with a reinforced neckline.',
  1420: 'Oversized fit in heavyweight fleece.',
};

/** Hand-kept "Style with" picks, by handle. Empty or missing hides the row. */
const STYLE_WITH: Record<string, string[]> = {
  'lootix-mark-oversized-hoodie': ['lootix-mark-box-tee', 'lootix-dad-hat'],
  'lootix-wordmark-oversized-hoodie': ['lootix-wordmark-box-tee', 'lootix-dad-hat'],
  'lootix-mark-box-tee': ['lootix-mark-oversized-hoodie', 'lootix-dad-hat'],
  'lootix-wordmark-box-tee': ['lootix-wordmark-oversized-hoodie', 'lootix-dad-hat'],
  'lootix-mark-womens-cropped-hoodie': ['lootix-mark-womens-relaxed-tee', 'lootix-dad-hat'],
  'lootix-wordmark-womens-cropped-hoodie': ['lootix-wordmark-womens-relaxed-tee', 'lootix-dad-hat'],
  'lootix-mark-womens-relaxed-tee': ['lootix-mark-womens-cropped-hoodie', 'lootix-dad-hat'],
  'lootix-wordmark-womens-relaxed-tee': ['lootix-wordmark-womens-cropped-hoodie', 'lootix-dad-hat'],
  'lootix-dad-hat': ['lootix-wordmark-box-tee', 'lootix-wordmark-oversized-hoodie'],
};

/** Preferred first colour per product (falls back to the first in stock). */
const DEFAULT_COLOUR: Record<string, string> = {};

const gallery = GALLERY as Record<string, GalleryImage[]>;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** "Lootix Wordmark Oversized Hoodie — Bone ink on Black" → title + ink. */
function split(e: CatalogEntry): { title: string; ink: string | null } {
  const [title, rest = ''] = e.name.split(' \u2014 ');
  const m = /^(.+?) ink on /.exec(rest);
  return { title: title.trim(), ink: m ? m[1] : null };
}

function groupSlug(title: string): string {
  // Drop the brand prefix, except for products whose name IS brand + type.
  const s = slugify(title);
  return s.startsWith('lootix-') && s.split('-').length > 3 && !s.includes('dad-hat') ? s.slice(7) : s;
}

// Extra Printful mockup-generator renders (back, detail, worn), saved as webp
// under /public/products/mockups by scripts/printful-mockups.mjs.
const mockups = MOCKUPS as Record<string, GalleryImage[]>;

function imagesFor(e: CatalogEntry): GalleryImage[] {
  return [...baseImages(e), ...(mockups[e.slug] ?? [])];
}

function baseImages(e: CatalogEntry): GalleryImage[] {
  const ids = Object.values(e.variants);
  for (const id of ids) {
    const imgs = gallery[String(id)];
    if (imgs && imgs.length) return imgs;
  }
  return [{ url: e.img, kind: 'mockup', placement: 'front' }];
}

function build(): ProductGroup[] {
  const groups = new Map<string, ProductGroup & { colourways: Colourway[] }>();
  for (const e of PRINTFUL_CATALOG) {
    const { title, ink } = split(e);
    const slug = groupSlug(title);
    let g = groups.get(slug);
    if (!g) {
      g = {
        slug,
        title,
        sub: ink ? e.sub.replace(/ \u00b7 .+ ink$/, '') : e.sub,
        category: e.category,
        price: e.price,
        priceValue: e.priceValue,
        sizes: e.sizes,
        colourways: [],
        handle: slugify(title),
        defaultColour: '',
        blankId: 0,
        blankTitle: '',
        fit: [],
        design: /wordmark/i.test(title + e.sub) ? 'wordmark' : /\bmark\b/i.test(title + e.sub) ? 'mark' : null,
        fitNote: '',
        fabric: [],
        printMethod: '',
        styleWith: [],
      };
      groups.set(slug, g);
    }
    if (e.priceValue < g.priceValue) {
      g.priceValue = e.priceValue;
      g.price = e.price;
    }
    if (e.sizes) {
      const have = new Set(g.sizes ?? []);
      for (const s of e.sizes) have.add(s);
      const order = [...(g.sizes ?? []), ...e.sizes];
      g.sizes = order.filter((s, i) => have.has(s) && order.indexOf(s) === i);
    }
    const variants = Object.entries(e.variants).map(([size, id]) => ({
      size,
      printfulVariantId: id,
      available: (blankVariants[String(id)]?.availability ?? 'active') === 'active',
    }));
    const firstBlank = blankVariants[String(Object.values(e.variants)[0])];
    if (firstBlank && !g.blankId) g.blankId = firstBlank.catalogProductId;
    g.colourways.push({
      slug: e.slug,
      swatchLabel: ink ? `${e.colour} \u00b7 ${ink} ink` : e.colour,
      key: '',
      hex: firstBlank?.hex ?? '#3a3328',
      available: variants.some((v) => v.available),
      name: e.name,
      colour: e.colour,
      ink,
      label: ink ? `${ink} on ${e.colour}` : e.colour,
      price: e.price,
      priceValue: e.priceValue,
      printfulProductId: e.printfulProductId,
      sizes: e.sizes,
      variants,
      images: imagesFor(e),
    });
  }
  for (const g of groups.values()) finish(g);
  return [...groups.values()];
}

function finish(g: ProductGroup & { colourways: Colourway[] }): void {
  // ?color= key: the garment colour alone when unique, else colour + ink.
  const count = new Map<string, number>();
  for (const c of g.colourways) count.set(c.colour, (count.get(c.colour) ?? 0) + 1);
  for (const c of g.colourways) {
    c.key = count.get(c.colour)! > 1 && c.ink ? `${slugify(c.colour)}-${slugify(c.ink)}` : slugify(c.colour);
  }
  const pref = DEFAULT_COLOUR[g.handle];
  g.defaultColour = (pref && g.colourways.find((c) => c.key === pref && c.available)?.key) ||
    (g.colourways.find((c) => c.available) ?? g.colourways[0]).key;
  const blank = blanks[String(g.blankId)];
  g.blankTitle = blank?.title ?? '';
  g.fabric = (blank?.description ?? '')
    .split('\n')
    .map((l) => l.replace(/^\u2022\s*/, '').trim())
    .filter((l) => /^[0-9]+% |^fabric weight/i.test(l))
    .slice(0, 3);
  g.fitNote = FIT_NOTES[g.blankId] ?? '';
  g.printMethod = g.category === 'Hats' || /embroider/i.test(g.sub) ? 'Embroidered.' : 'Direct-to-garment print.';
  const t = g.title.toLowerCase();
  g.fit = t.includes('women') ? (t.includes('cropped') ? ['womens', 'cropped'] : ['womens']) : g.category === 'Hats' ? [] : ['mens'];
  g.styleWith = STYLE_WITH[g.handle] ?? [];
}

export const PRODUCT_GROUPS: readonly ProductGroup[] = build();

export function getProductGroup(handle: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((g) => g.handle === handle);
}

/** The colourway for a ?color= key, else the product default. */
export function colourwayFor(g: ProductGroup, key: string | null | undefined): Colourway {
  return g.colourways.find((c) => c.key === key) ?? g.colourways.find((c) => c.key === g.defaultColour)!;
}

/** The product a colourway (catalog / cart slug) belongs to. */
export function groupForColourway(colourwaySlug: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((g) => g.colourways.some((c) => c.slug === colourwaySlug));
}

/** Product-page URL, optionally preselecting a colourway. */
export function productHref(g: ProductGroup, colourKey?: string): string {
  return colourKey && colourKey !== g.defaultColour ? `/products/${g.handle}?color=${colourKey}` : `/products/${g.handle}`;
}

/** Other products, same category first. Excludes the product and its Style-with picks. */
export function relatedProducts(handle: string, limit = 4, skipHandles: readonly string[] = []): ProductGroup[] {
  const g = getProductGroup(handle);
  if (!g) return [];
  const skip = new Set([handle, ...g.styleWith, ...skipHandles]);
  const rest = PRODUCT_GROUPS.filter((p) => !skip.has(p.handle) && p.colourways.some((c) => c.available));
  const same = rest.filter((p) => p.category === g.category);
  return [
    ...same.filter((p) => p.design !== g.design),
    ...same.filter((p) => p.design === g.design),
    ...rest.filter((p) => p.category !== g.category),
  ].slice(0, limit);
}
