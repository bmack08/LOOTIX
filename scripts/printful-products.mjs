#!/usr/bin/env node
// Printful product pipeline (first set).
//   npm run printful:products               -> dry run (default): validate + print payloads, NO network
//   npm run printful:products -- --live     -> create store products (never orders, never publish)
// Options: --manifest <path>  (default scripts/printful/manifest.json)
// Key: read ONLY from env PRINTFUL_API (repo name) or PRINTFUL_API_KEY. Never printed or logged.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const mi = args.indexOf('--manifest');
const manifestPath = path.resolve(mi >= 0 ? args[mi + 1] : 'scripts/printful/manifest.json');
const snapPath = path.resolve('scripts/printful/catalog-snapshot.json');
const API = 'https://api.printful.com';

const problems = [];
const todo = [];
const isTodo = (v) => v == null || (typeof v === 'string' && /TODO/.test(v)) || (Array.isArray(v) ? v.some(isTodo) : typeof v === 'object' && Object.values(v).some(isTodo));

function pngInfo(file) {
  const b = fs.readFileSync(file);
  if (b.length < 33 || b.toString('ascii', 1, 4) !== 'PNG') return { ok: false, why: 'not a PNG' };
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20), colorType = b[25];
  let dpi = null;
  const i = b.indexOf('pHYs');
  if (i > 0) { const ppm = b.readUInt32BE(i + 4); if (b[i + 12] === 1) dpi = Math.round(ppm * 0.0254); }
  return { ok: true, w, h, alpha: colorType === 6 || colorType === 4, dpi, bytes: b.length };
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
const designDir = path.resolve(manifest.designDir);
if (isTodo(manifest.fileBaseUrl)) todo.push('manifest.fileBaseUrl (Printful needs a public HTTPS URL per design file)');

const plan = [];
const checkedFiles = new Map();
for (const p of manifest.products) {
  const cat = snap.products[String(p.catalogProductId)];
  if (!cat) { problems.push(`${p.key}: catalog product ${p.catalogProductId} not in snapshot`); continue; }
  if (/TODO/.test(p.status || '')) todo.push(`${p.key}: catalog product choice (${p.status})`);
  if (isTodo(p.retailPrice)) todo.push(`${p.key}: retailPrice`);
  if (p.options && isTodo(p.options)) todo.push(`${p.key}: options ${JSON.stringify(p.options)}`);
  for (const f of p.files) {
    if (!cat.file_types.includes(f.type)) problems.push(`${p.key}: file type "${f.type}" not offered by ${p.catalogProductId}`);
    const fp = path.join(designDir, f.file);
    if (!checkedFiles.has(fp)) {
      if (!fs.existsSync(fp)) { checkedFiles.set(fp, null); problems.push(`missing design file: ${path.relative(process.cwd(), fp)}`); }
      else {
        const info = pngInfo(fp); checkedFiles.set(fp, info);
        if (!info.ok) problems.push(`${f.file}: ${info.why}`);
        else { if (!info.alpha) problems.push(`${f.file}: no alpha channel (house rule: transparent PNG)`);
               if (info.dpi && info.dpi < 150) problems.push(`${f.file}: ${info.dpi} DPI < 150 minimum`); }
      }
    }
  }
  const variants = [];
  for (const color of p.colors) for (const size of p.sizes) {
    const v = cat.variants.find((x) => x.color === color && x.size === size);
    if (!v) { problems.push(`${p.key}: no catalog variant for ${color} / ${size}`); continue; }
    variants.push({
      variant_id: v.id,
      retail_price: isTodo(p.retailPrice) ? 'TODO' : String(p.retailPrice),
      files: p.files.map((f) => ({ type: f.type, url: `${manifest.fileBaseUrl}/${f.file}` })),
      ...(p.options ? { options: p.options } : {}),
    });
  }
  plan.push({ key: p.key, placement: p.files.map((f) => f.placement).join(', '), catalog: `${p.catalogProductId} ${cat.title}`,
    body: { sync_product: { name: p.name }, sync_variants: variants } });
}

console.log(`Mode: ${LIVE ? 'LIVE' : 'DRY RUN (no network calls)'}`);
console.log(`Manifest: ${path.relative(process.cwd(), manifestPath)}  Designs: ${path.relative(process.cwd(), designDir)}`);
for (const [fp, info] of checkedFiles) console.log(`  file ${path.relative(process.cwd(), fp)}: ${info ? (info.ok ? `${info.w}x${info.h}px alpha=${info.alpha} dpi=${info.dpi ?? '?'}` : info.why) : 'MISSING'}`);
for (const p of plan) {
  console.log(`\n== ${p.key}  [${p.catalog}]  ${p.placement}  variants=${p.body.sync_variants.length}`);
  console.log(`POST ${API}/store/products`);
  console.log(JSON.stringify(p.body, null, 2));
}
if (todo.length) { console.log('\nTODO before --live:'); for (const t of todo) console.log('  - ' + t); }
if (problems.length) { console.log('\nProblems:'); for (const t of problems) console.log('  - ' + t); }

if (!LIVE) {
  console.log(`\nDry run done: ${plan.length} products, ${plan.reduce((n, p) => n + p.body.sync_variants.length, 0)} variants planned. Nothing was sent.`);
  process.exit(problems.length ? 2 : 0);
}

// ---- LIVE ----
if (problems.length || todo.length) { console.error('\nRefusing --live: fix the problems/TODOs above first.'); process.exit(1); }
const key = process.env.PRINTFUL_API || process.env.PRINTFUL_API_KEY;
if (!key) { console.error('Refusing --live: set PRINTFUL_API (or PRINTFUL_API_KEY) in the environment.'); process.exit(1); }
const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
if (process.env.PRINTFUL_STORE_ID) headers['X-PF-Store-Id'] = process.env.PRINTFUL_STORE_ID;
for (const p of plan) {
  // Only endpoint ever called: create store product. No /orders, no publishing.
  const res = await fetch(`${API}/store/products`, { method: 'POST', headers, body: JSON.stringify(p.body) });
  const text = await res.text();
  let out; try { out = JSON.parse(text); } catch { out = { raw: text.slice(0, 300) }; }
  if (!res.ok) { console.error(`${p.key}: HTTP ${res.status} ${out?.error?.message ?? out?.result ?? ''}`); process.exit(1); }
  console.log(`${p.key}: created store product id ${out?.result?.id}`);
}
