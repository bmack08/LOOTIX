// Product search over name, colour, design and category. No giveaway pages.

import { PRODUCT_GROUPS } from '@/config/product-groups';
import { toCard, type Card } from '@/config/collections';

type Row = { card: Card; hay: string };
const INDEX: Row[] = PRODUCT_GROUPS.map((g) => ({
  card: toCard(g),
  hay: [g.title, g.category, g.design, `lootix ${g.design}`, ...g.fit, ...g.colourways.map((c) => c.swatchLabel)]
    .join(' ')
    .toLowerCase(),
}));

const singular = (w: string) => w.replace(/(ies)$/, 'y').replace(/s$/, '');

export function searchProducts(q: string): Card[] {
  const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean).map(singular);
  if (!words.length) return [];
  return INDEX.filter((r) => words.every((w) => r.hay.includes(w))).map((r) => r.card);
}
