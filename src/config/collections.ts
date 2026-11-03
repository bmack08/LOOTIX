// Collection routes (/collections/[handle]) and the lean card data the grid,
// search and wishlist use. Server-side: pass Card[] to client components
// rather than importing PRODUCT_GROUPS (and its JSON) into the browser.

import { PRODUCT_GROUPS, type ProductGroup } from './product-groups';

export type Collection = { handle: string; title: string; crumb?: string; match: (g: ProductGroup) => boolean };

export const COLLECTIONS: readonly Collection[] = [
  { handle: 'all', title: 'All products', match: () => true },
  { handle: 'new', title: 'New', match: () => true },
  { handle: 'hoodies', title: 'Hoodies', match: (g) => g.category === 'Hoodies' },
  { handle: 'tees', title: 'Tees', match: (g) => g.category === 'Tees' },
  { handle: 'hats', title: 'Hats', match: (g) => g.category === 'Hats' },
  { handle: 'mens', title: "Men's", match: (g) => g.fit.includes('mens') || g.category === 'Hats' },
  { handle: 'womens', title: "Women's", match: (g) => g.fit.includes('womens') || g.category === 'Hats' },
  { handle: 'cropped', title: 'Cropped', match: (g) => g.fit.includes('cropped') },
  { handle: 'launch', title: 'Launch collection', match: () => true },
  { handle: 'wordmark', title: 'Lootix Wordmark', match: (g) => g.design === 'wordmark' },
  { handle: 'mark', title: 'Lootix Mark', match: (g) => g.design === 'mark' },
];

/** Chips shown above every grid. */
export const CHIP_HANDLES = ['all', 'hoodies', 'tees', 'hats', 'womens', 'cropped'] as const;

export function getCollection(handle: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export type Card = {
  handle: string;
  title: string;
  category: string;
  priceValue: number;
  price: string;
  img: string;
  imgAlt: string;
  defaultColour: string;
  /** Every colourway: key, label, garment colour, hex, sizes in stock. */
  colours: { key: string; label: string; colour: string; hex: string; img: string; inStock: string[] }[];
  sizes: readonly string[];
};

export function toCard(g: ProductGroup): Card {
  const lead = g.colourways.find((c) => c.key === g.defaultColour) ?? g.colourways[0];
  return {
    handle: g.handle,
    title: g.title,
    category: g.category,
    priceValue: g.priceValue,
    price: g.price,
    img: lead.images[0]?.url ?? '',
    imgAlt: `${g.title}, ${lead.swatchLabel}, front`,
    defaultColour: g.defaultColour,
    colours: g.colourways.map((c) => ({
      key: c.key,
      label: c.swatchLabel,
      colour: c.colour,
      hex: c.hex,
      img: c.images[0]?.url ?? '',
      inStock: c.variants.filter((v) => v.available).map((v) => v.size),
    })),
    sizes: g.sizes ?? [],
  };
}

export function cardsFor(handle: string): Card[] {
  const c = getCollection(handle);
  return c ? PRODUCT_GROUPS.filter(c.match).map(toCard) : [];
}

export const ALL_CARDS: readonly Card[] = PRODUCT_GROUPS.map(toCard);
