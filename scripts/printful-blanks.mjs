#!/usr/bin/env node
// READ-ONLY Printful metadata for the product pages. GETs only:
//   /store/products/{id}            -> catalog product + variant per sync variant, availability
//   /products/{catalogId}           -> garment colour hex (color_code), title, description
//   /products/{catalogId}/sizes     -> size guide (product measurements, inches + cm)
// Writes src/config/printful-blanks.json. Key: env PRINTFUL_API or
// .env.local; never printed or logged. No POST/PUT/DELETE, ever.
import fs from 'node:fs';

function envFromFile(name) {
  if (process.env[name]) return process.env[name];
  for (const f of ['.env.local', '.env']) {
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, 'utf8').match(new RegExp('^\\s*' + name + '\\s*=\\s*(.*)$', 'm'));
    if (m) return m[1].trim().replace(/^['"]|['"]$/g, '');
  }
  return undefined;
}
const KEY = envFromFile('PRINTFUL_API') || envFromFile('PRINTFUL_API_KEY');
if (!KEY) { console.error('No PRINTFUL_API in env or .env.local'); process.exit(1); }
const STORE = envFromFile('PRINTFUL_STORE_ID') || '15871910';
// Washed blanks under consideration (printful-washed-blanks-2026-10-30.md): size guides only.
const EXTRA_BLANKS = [892, 1659, 713, 880];

async function get(path) {
  const res = await fetch(`https://api.printful.com${path}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${KEY}`, 'X-PF-Store-Id': STORE },
  });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return (await res.json()).result;
}

const src = fs.readFileSync('src/config/printful-catalog.ts', 'utf8');
const ids = [...new Set([...src.matchAll(/printfulProductId: (\d+)/g)].map((m) => m[1]))];

const variants = {}; // sync variant id -> { catalogProductId, catalogVariantId, availability }
const catalogIds = new Set(EXTRA_BLANKS);
for (const id of ids) {
  const r = await get(`/store/products/${id}`);
  for (const v of r.sync_variants || []) {
    variants[v.id] = {
      catalogProductId: v.product?.product_id ?? null,
      catalogVariantId: v.product?.variant_id ?? null,
      availability: v.availability_status ?? null,
    };
    if (v.product?.product_id) catalogIds.add(v.product.product_id);
  }
}

function tables(sz) {
  return (sz?.size_tables || [])
    .filter((t) => t.type === 'product_measure')
    .map((t) => ({
      unit: t.unit,
      measurements: (t.measurements || []).map((m) => ({
        label: m.type_label,
        values: Object.fromEntries((m.values || []).map((x) => [x.size, x.value ?? (x.min_value && x.max_value ? `${x.min_value}\u2013${x.max_value}` : null)])),
      })),
    }));
}

const blanks = {}; // catalog product id -> blank info
const colours = {}; // catalog variant id -> hex
for (const cid of catalogIds) {
  const r = await get(`/products/${cid}`);
  for (const v of r.variants || []) colours[v.id] = { color: v.color, hex: v.color_code || null, size: v.size };
  let inches = [], cm = [];
  try { inches = tables(await get(`/products/${cid}/sizes?unit=inches`)); } catch {}
  try { cm = tables(await get(`/products/${cid}/sizes?unit=cm`)); } catch {}
  blanks[cid] = {
    title: r.product?.title ?? null,
    model: r.product?.model ?? null,
    brand: r.product?.brand ?? null,
    type: r.product?.type ?? null,
    description: r.product?.description ?? null,
    live: !EXTRA_BLANKS.includes(Number(cid)),
    sizeChart: { inches, cm },
  };
}

for (const v of Object.values(variants)) v.hex = colours[v.catalogVariantId]?.hex ?? null;
fs.writeFileSync('src/config/printful-blanks.json', JSON.stringify({ variants, blanks }, null, 1) + '\n');
const charts = Object.entries(blanks).map(([k, b]) => `${k}:${b.live ? 'live' : 'extra'}:${b.sizeChart.inches.length ? 'chart' : 'none'}`);
console.log(`variants ${Object.keys(variants).length}, blanks ${charts.join(' ')}`);
