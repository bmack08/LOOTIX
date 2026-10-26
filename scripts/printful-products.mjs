#!/usr/bin/env node
// Printful product pipeline (first set): one store product per product x design x ink.
//   npm run printful:products                    -> dry run (default): validate + plan, NO network
//   npm run printful:products -- --verbose       -> dry run, also print every POST payload
//   npm run printful:products -- --live          -> create store products (never orders, never publish)
// Options: --manifest <path> (default scripts/printful/manifest.json), --only <productKey>
// Key: read ONLY from env PRINTFUL_API (repo name) or PRINTFUL_API_KEY. Never printed or logged.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const VERBOSE = args.includes('--verbose');
const argVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const manifestPath = path.resolve(argVal('--manifest') || 'scripts/printful/manifest.json');
const ONLY = argVal('--only');
const snapPath = path.resolve('scripts/printful/catalog-snapshot.json');
const API = 'https://api.printful.com';

const problems = [];
const todo = new Set();
const warnings = new Set();
const isTodo = (v) => v == null || (typeof v === 'string' && /TODO/.test(v)) ||
  (Array.isArray(v) ? v.some(isTodo) : typeof v === 'object' && Object.values(v).some(isTodo));

function pngInfo(file) {
  const b = fs.readFileSync(file);
  if (b.length < 33 || b.toString('ascii', 1, 4) !== 'PNG') return { ok: false, why: 'not a PNG' };
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20), colorType = b[25];
  let dpi = null;
  const i = b.indexOf('pHYs');
  if (i > 0 && b[i + 12] === 1) dpi = Math.round(b.readUInt32BE(i + 4) * 0.0254);
  return { ok: true, w, h, alpha: colorType === 6 || colorType === 4, dpi, bytes: b.length };
}

const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
const designDir = path.resolve(m.designDir);
const palette = snap.thread_palette || {};
if (isTodo(m.fileBaseUrl)) todo.add('manifest.fileBaseUrl (Printful needs a public HTTPS URL per design file)');
for (const [k, pl] of Object.entries(m.placements)) if (pl.position && isTodo(pl.position)) todo.add(`placement ${k}: ${pl.position}`);

// ---- file validation (once per file) ----
const files = new Map();
function checkFile(rel, placementKey) {
  if (files.has(rel)) return files.get(rel);
  const fp = path.join(designDir, rel);
  let res;
  if (!fs.existsSync(fp)) { res = { missing: true }; problems.push(`missing design file: ${rel}`); }
  else {
    res = pngInfo(fp);
    const pl = m.placements[placementKey];
    if (!res.ok) problems.push(`${rel}: ${res.why}`);
    else {
      if (!res.alpha) problems.push(`${rel}: no alpha channel (house rule: transparent PNG)`);
      if (!res.dpi) warnings.add(`${rel}: no DPI metadata`);
      else if (res.dpi < (m.minDpi || 150)) problems.push(`${rel}: ${res.dpi} DPI < ${m.minDpi || 150}`);
      if (pl && res.dpi) {
        const wIn = res.w / res.dpi, hIn = res.h / res.dpi;
        if (Math.abs(wIn - pl.widthIn) > 0.05 || Math.abs(hIn - pl.heightIn) > 0.05)
          problems.push(`${rel}: ${wIn.toFixed(2)}x${hIn.toFixed(2)} in, expected ${pl.widthIn}x${pl.heightIn} in for ${placementKey}`);
      }
    }
  }
  files.set(rel, res);
  return res;
}

// ---- plan ----
const plan = [];
const skipped = [];
for (const p of m.products) {
  if (ONLY && p.key !== ONLY) continue;
  const cat = snap.products[String(p.catalogProductId)];
  if (!cat) { problems.push(`${p.key}: catalog product ${p.catalogProductId} not in snapshot`); continue; }
  if (/TODO/.test(p.status || '')) todo.add(`${p.key}: catalog product choice (${p.status})`);
  if (isTodo(p.retailPrice)) todo.add(`${p.key}: retailPrice (${p.retailPrice})`);
  if (p.embroidery && cat.option_ids && !cat.option_ids.includes(p.embroidery.threadOption))
    warnings.add(`${p.key}: option "${p.embroidery.threadOption}" not listed by public catalog for ${p.catalogProductId} (listed: ${cat.option_ids.filter((o) => o.startsWith('thread')).join(', ')}); verify before --live`);
  for (const [garment, c] of Object.entries(p.colorMap))
    if (c.startsWith('~')) warnings.add(`${p.key}: approx color map ${garment} -> ${c.slice(1)}`);
  for (const [design, d] of Object.entries(p.designs)) {
    if (!cat.file_types.includes(d.fileType)) problems.push(`${p.key}: file type "${d.fileType}" not offered by ${p.catalogProductId}`);
    if (d.warn) warnings.add(`${p.key}/${design}: ${d.warn}`);
    for (const [ink, inkDef] of Object.entries(m.inks)) {
      const rel = m.filePattern.replace(/\{placement\}/g, d.placement).replace('{design}', design).replace('{ink}', ink);
      checkFile(rel, d.placement);
      const garments = m.colorways[ink] || [];
      const colors = [...new Set(garments.map((g) => p.colorMap[g]).filter(Boolean).map((c) => c.replace(/^~/, '')))];
      const unmapped = garments.filter((g) => !p.colorMap[g]);
      if (!colors.length) { skipped.push(`${p.key} ${design} ${ink}-ink: no catalog color for ${garments.join('/')}`); continue; }
      let options;
      if (p.embroidery) {
        if (isTodo(inkDef.thread)) todo.add(`ink ${ink}: thread color ${inkDef.thread} (blocks ${p.key} ${ink}-ink)`);
        else if (!palette[inkDef.thread]) problems.push(`ink ${ink}: thread ${inkDef.thread} not in Printful thread palette`);
        options = [{ id: p.embroidery.threadOption, value: [inkDef.thread] }];
      }
      const pl = m.placements[d.placement];
      const file = { type: d.fileType, url: `${m.fileBaseUrl}/${rel}` };
      if (pl.position) file.position = pl.position;
      const variants = [];
      for (const color of colors) for (const size of p.sizes) {
        const v = cat.variants.find((x) => x.color === color && x.size === size);
        if (!v) { problems.push(`${p.key}: no catalog variant for ${color} / ${size}`); continue; }
        variants.push({ variant_id: v.id, retail_price: isTodo(p.retailPrice) ? 'TODO' : String(p.retailPrice),
          files: [file], ...(options ? { options } : {}) });
      }
      plan.push({ key: `${p.key}/${design}/${ink}`, product: p.key, design, ink, placement: d.placement, colors, unmapped,
        body: { sync_product: { name: `Lootix ${design[0].toUpperCase() + design.slice(1)} ${p.label} - ${inkDef.name} ink` }, sync_variants: variants } });
    }
  }
}

// ---- report ----
const nV = plan.reduce((n, x) => n + x.body.sync_variants.length, 0);
console.log(`Mode: ${LIVE ? 'LIVE' : 'DRY RUN (no network calls)'}`);
console.log(`Manifest: ${path.relative(process.cwd(), manifestPath)}  Designs: ${path.relative(process.cwd(), designDir)}`);
const fstat = [...files.values()];
console.log(`Files checked: ${files.size}  missing=${fstat.filter((f) => f.missing).length}  ` +
  `no-alpha=${fstat.filter((f) => f.ok && !f.alpha).length}  dims=${[...new Set(fstat.filter((f) => f.ok).map((f) => `${f.w}x${f.h}@${f.dpi}`))].join(', ')}`);
console.log('\nPlanned products (product/design/ink : placement : colors : variants)');
for (const x of plan) console.log(`  ${x.key.padEnd(28)} ${x.placement.padEnd(13)} ${x.colors.join(', ').padEnd(34)} ${x.body.sync_variants.length}` +
  (x.unmapped.length ? `   (no catalog color: ${x.unmapped.join(', ')})` : ''));
if (skipped.length) { console.log('\nSkipped (no catalog color for any garment in that colorway):'); for (const s of skipped) console.log('  - ' + s); }
console.log('\nPer product:');
for (const p of [...new Set(plan.map((x) => x.product))]) {
  const xs = plan.filter((x) => x.product === p);
  console.log(`  ${p.padEnd(14)} products=${xs.length} variants=${xs.reduce((n, x) => n + x.body.sync_variants.length, 0)}`);
}
if (VERBOSE) for (const x of plan) { console.log(`\n== ${x.key}\nPOST ${API}/store/products`); console.log(JSON.stringify(x.body, null, 2)); }
else if (plan[0]) { console.log(`\nSample payload (${plan[0].key}; --verbose prints all):\nPOST ${API}/store/products`); console.log(JSON.stringify({ ...plan[0].body, sync_variants: plan[0].body.sync_variants.slice(0, 1) }, null, 2)); }
if (warnings.size) { console.log('\nWarnings:'); for (const t of warnings) console.log('  - ' + t); }
if (todo.size) { console.log('\nTODO before --live:'); for (const t of todo) console.log('  - ' + t); }
if (problems.length) { console.log('\nProblems:'); for (const t of problems) console.log('  - ' + t); }

if (!LIVE) {
  console.log(`\nDry run done: ${plan.length} products, ${nV} variants planned. Nothing was sent.`);
  process.exit(problems.length ? 2 : 0);
}

// ---- LIVE ----
if (problems.length || todo.size) { console.error('\nRefusing --live: fix the problems/TODOs above first.'); process.exit(1); }
const key = process.env.PRINTFUL_API || process.env.PRINTFUL_API_KEY;
if (!key) { console.error('Refusing --live: set PRINTFUL_API (or PRINTFUL_API_KEY) in the environment.'); process.exit(1); }
const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
if (process.env.PRINTFUL_STORE_ID) headers['X-PF-Store-Id'] = process.env.PRINTFUL_STORE_ID;
for (const x of plan) {
  // Only endpoint ever called: create store product. No /orders, no publishing.
  const res = await fetch(`${API}/store/products`, { method: 'POST', headers, body: JSON.stringify(x.body) });
  const text = await res.text();
  let out; try { out = JSON.parse(text); } catch { out = { raw: text.slice(0, 300) }; }
  if (!res.ok) { console.error(`${x.key}: HTTP ${res.status} ${out?.error?.message ?? out?.result ?? ''}`); process.exit(1); }
  console.log(`${x.key}: created store product id ${out?.result?.id}`);
}
