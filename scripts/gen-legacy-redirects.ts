// Writes src/config/legacy-product-redirects.json: old /product/:slug and
// /shop/:slug URLs -> /products/:handle(?color=). Old slugs were Printful
// product ids (getPrintfulProductById), catalog colourway slugs, or the
// short product slugs. next.config.js 301s each; anything unmapped is a 404.
// Run: npx tsx scripts/gen-legacy-redirects.ts
import { writeFileSync } from 'node:fs';
import { PRODUCT_GROUPS, productHref } from '../src/config/product-groups';

const map: Record<string, string> = {};
for (const g of PRODUCT_GROUPS) {
  map[g.slug] = productHref(g);
  map[g.handle] = productHref(g);
  for (const c of g.colourways) {
    map[c.slug] = productHref(g, c.key);
    map[String(c.printfulProductId)] ??= productHref(g, c.key);
  }
}
writeFileSync('src/config/legacy-product-redirects.json', JSON.stringify(map, null, 1) + '\n');
console.log(`wrote ${Object.keys(map).length} redirects`);
