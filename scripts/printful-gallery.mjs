#!/usr/bin/env node
// READ-ONLY: GET /store/products/{id} for every Printful product in
// src/config/printful-catalog.ts and write the per-variant image gallery
// (Printful mockup preview plus the flat print file per placement) to
// src/config/printful-gallery.json. No POST/PUT/DELETE, ever.
// Key: env PRINTFUL_API (or .env.local). Never printed or logged.
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

const src = fs.readFileSync('src/config/printful-catalog.ts', 'utf8');
const ids = [...new Set([...src.matchAll(/printfulProductId: (\d+)/g)].map((m) => m[1]))];

const out = {};
for (const id of ids) {
  const res = await fetch(`https://api.printful.com/store/products/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${KEY}`, 'X-PF-Store-Id': STORE },
  });
  if (!res.ok) { console.error(`product ${id}: HTTP ${res.status}`); continue; }
  const { result } = await res.json();
  for (const v of result.sync_variants || []) {
    const seen = new Set();
    const imgs = [];
    // Printful mockup ('preview') first, then the flat print artwork per
    // placement (front, back, sleeve, embroidery...) as detail shots.
    const files = [...(v.files || [])].sort((a, b) => (a.type === 'preview' ? -1 : 0) - (b.type === 'preview' ? -1 : 0));
    for (const f of files) {
      const url = f.preview_url || f.thumbnail_url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      imgs.push({ url, kind: f.type === 'preview' ? 'mockup' : 'artwork', placement: f.type === 'preview' ? 'front' : f.type });
    }
    out[v.id] = imgs;
  }
  console.log(`product ${id}: ${(result.sync_variants || []).length} variants`);
}
fs.writeFileSync('src/config/printful-gallery.json', JSON.stringify(out, null, 0) + '\n');
console.log(`wrote ${Object.keys(out).length} variants`);
