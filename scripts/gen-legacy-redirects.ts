// Writes src/config/legacy-product-redirects.json: old /product/:slug URLs
// -> new /shop/:product pages. Old slugs were Printful product ids
// (getPrintfulProductById) or catalog colourway slugs. next.config.js reads
// the JSON; anything unmapped still falls through to /shop.
// Run: npx tsx scripts/gen-legacy-redirects.ts
import { writeFileSync } from 'node:fs';
import { PRODUCT_GROUPS, productHref } from '../src/config/product-groups';

const map: Record<string, string> = {};
for (const g of PRODUCT_GROUPS) {
  map[g.slug] = productHref(g);
  for (const c of g.colourways) {
    map[c.slug] = productHref(g, c.slug);
    map[String(c.printfulProductId)] ??= productHref(g, c.slug);
  }
}
writeFileSync('src/config/legacy-product-redirects.json', JSON.stringify(map, null, 1) + '\n');
console.log(`wrote ${Object.keys(map).length} redirects`);
