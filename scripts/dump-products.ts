// Prints the product model as JSON (no images) to eyeball handles, colours,
// hex, stock and Style-with picks. Run: npx tsx scripts/dump-products.ts
import { PRODUCT_GROUPS } from '../src/config/product-groups';

const out = PRODUCT_GROUPS.map((g) => ({
  handle: g.handle,
  title: g.title,
  category: g.category,
  price: g.price,
  sizes: g.sizes,
  blank: `${g.blankId} ${g.blankTitle}`,
  fit: g.fit,
  design: g.design,
  defaultColour: g.defaultColour,
  fabric: g.fabric,
  printMethod: g.printMethod,
  styleWith: g.styleWith,
  colourways: g.colourways.map((c) => ({
    key: c.key,
    label: c.swatchLabel,
    hex: c.hex,
    images: c.images.length,
    soldOut: c.variants.filter((v) => !v.available).map((v) => v.size),
  })),
}));
console.log(JSON.stringify(out, null, 2));
