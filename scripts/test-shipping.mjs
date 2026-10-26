// Unit test for src/config/shipping.ts (no deps; Node 24 strips TS types).
// Run: npm run test:shipping
import assert from 'node:assert/strict';
import { quoteShipping } from '../src/config/shipping.ts';

const tee = (qty = 1) => ({ category: 'Tees', unitPrice: 45, qty });
const hoodie = (qty = 1) => ({ category: 'Hoodies', unitPrice: 85, qty });
// No hat/beanie in SHOP_PRODUCTS yet; prices are illustrative.
const hat = (qty = 1) => ({ category: 'Hats', unitPrice: 30, qty });
const beanie = (qty = 1) => ({ category: 'Beanies', unitPrice: 28, qty });
const cases = [
  ['tee only $45', [tee()], 595, 'tees'],
  ['two tees $90', [tee(2)], 595, 'tees'],
  ['hoodie $85', [hoodie()], 895, 'hoodie'],
  ['hoodie+tee $130', [hoodie(), tee()], 0, 'free'],
  ['3 tees $135', [tee(3)], 0, 'free'],
  ['exactly $100 is free', [{ category: 'Tees', unitPrice: 50, qty: 2 }], 0, 'free'],
  ['$99.99 is not free', [{ category: 'Tees', unitPrice: 99.99, qty: 1 }], 595, 'tees'],
  ['sticker pack $8 (no hoodie)', [{ category: 'Accessories', unitPrice: 8, qty: 1 }], 595, 'other'],
  ['tee + sticker $53 (no hoodie)', [tee(), { category: 'Accessories', unitPrice: 8, qty: 1 }], 595, 'other'],
  ['hat only $30', [hat()], 595, 'other'],
  ['beanie only $28', [beanie()], 595, 'other'],
  ['hat + tee $75', [hat(), tee()], 595, 'other'],
  ['hat + hoodie $115 -> free', [hat(), hoodie()], 0, 'free'],
  ['hat + hoodie under $100 -> $8.95', [{ category: 'Hats', unitPrice: 10, qty: 1 }, hoodie()], 895, 'hoodie'],
  ['hat + hoodie exactly $100 -> free', [{ category: 'Hats', unitPrice: 15, qty: 1 }, hoodie()], 0, 'free'],
  ['hoodie + sticker $93 -> hoodie', [hoodie(), { category: 'Accessories', unitPrice: 8, qty: 1 }], 895, 'hoodie'],
  ['discount below threshold: 3 tees $135 - $40 = $95', [tee(3)], 595, 'tees', 4000],
];
let failed = 0;
for (const [name, lines, cents, rule, disc] of cases) {
  const q = quoteShipping(lines, disc ?? 0);
  try { assert.equal(q.amountCents, cents); assert.equal(q.rule, rule); console.log(`ok   ${name}: $${(q.amountCents / 100).toFixed(2)} ${q.label}`); }
  catch { failed++; console.log(`FAIL ${name}: got ${q.amountCents} ${q.rule}, want ${cents} ${rule}`); }
}
console.log(failed ? `${failed} failed` : `all ${cases.length} passed`);
process.exit(failed ? 1 : 0);