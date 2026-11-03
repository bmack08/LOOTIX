// Product layer over PRINTFUL_CATALOG. The catalog has one entry per
// Printful product x garment colour (a "colourway"); the store front shows
// one PRODUCT per design x garment, with its colourways and sizes as
// variants. Derived, not hand-kept: add a colourway to the catalog and it
// appears here.
//
// Cart and checkout still key items by the COLOURWAY slug + size (the
// catalog slug), so nothing downstream changes. A product page simply
// picks a colourway and adds that.

import { PRINTFUL_CATALOG, type CatalogEntry } from './printful-catalog';
import GALLERY from './printful-gallery.json';

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
  price: string;
  priceValue: number;
  printfulProductId: number;
  sizes: readonly string[] | null;
  variants: readonly ProductVariant[];
  images: readonly GalleryImage[];
};

export type ProductGroup = {
  /** URL slug: /shop/{slug}. */
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
};

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

function imagesFor(e: CatalogEntry): GalleryImage[] {
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
    g.colourways.push({
      slug: e.slug,
      name: e.name,
      colour: e.colour,
      ink,
      label: ink ? `${ink} on ${e.colour}` : e.colour,
      price: e.price,
      priceValue: e.priceValue,
      printfulProductId: e.printfulProductId,
      sizes: e.sizes,
      variants: Object.entries(e.variants).map(([size, id]) => ({ size, printfulVariantId: id })),
      images: imagesFor(e),
    });
  }
  return [...groups.values()];
}

export const PRODUCT_GROUPS: readonly ProductGroup[] = build();

export function getProductGroup(slug: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((g) => g.slug === slug);
}

/** The product a colourway (catalog / cart slug) belongs to. */
export function groupForColourway(colourwaySlug: string): ProductGroup | undefined {
  return PRODUCT_GROUPS.find((g) => g.colourways.some((c) => c.slug === colourwaySlug));
}

/** Product-page URL, optionally preselecting a colourway. */
export function productHref(g: ProductGroup, colourwaySlug?: string): string {
  return colourwaySlug && colourwaySlug !== g.colourways[0]?.slug ? `/shop/${g.slug}?c=${colourwaySlug}` : `/shop/${g.slug}`;
}

/** Other products, same category first. Data only; the UI waits on design. */
export function relatedProducts(slug: string, limit = 4): ProductGroup[] {
  const g = getProductGroup(slug);
  if (!g) return [];
  const rest = PRODUCT_GROUPS.filter((p) => p.slug !== slug);
  return [...rest.filter((p) => p.category === g.category), ...rest.filter((p) => p.category !== g.category)].slice(0, limit);
}
