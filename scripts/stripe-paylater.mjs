#!/usr/bin/env node
// READ-ONLY: GET /v1/payment_method_configurations and report whether
// Klarna / Afterpay are on. Prints only the key MODE (live/test), never the key.
// Writes src/config/pay-later.json { klarna, afterpay, mode, checkedAt }.
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
const KEY = envFromFile('STRIPE_SECRET_KEY');
const mode = !KEY ? 'none' : /^(sk|rk)_live_/.test(KEY) ? 'live' : /^(sk|rk)_test_/.test(KEY) ? 'test' : 'unknown';
let klarna = 'unknown', afterpay = 'unknown', note = '';
if (KEY) {
  const res = await fetch('https://api.stripe.com/v1/payment_method_configurations?limit=100', { method: 'GET', headers: { Authorization: `Bearer ${KEY}` } });
  if (!res.ok) note = `HTTP ${res.status}`;
  else {
    const { data } = await res.json();
    const cfg = data.find((c) => c.is_default && c.active) || data.find((c) => c.active);
    note = `${data.length} configs; using ${cfg ? (cfg.is_default ? 'default' : 'first active') : 'none'}`;
    const st = (pm) => (!cfg || !cfg[pm] ? 'unknown' : cfg[pm].available && cfg[pm].display_preference?.value === 'on' ? 'on' : 'off');
    if (cfg) { klarna = st('klarna'); afterpay = st('afterpay_clearpay'); }
    for (const c of data) console.log(`config ${c.is_default ? 'default' : '-'} active=${c.active} klarna=${c.klarna?.available}/${c.klarna?.display_preference?.value} afterpay=${c.afterpay_clearpay?.available}/${c.afterpay_clearpay?.display_preference?.value}`);
  }
}
const out = { mode, klarna, afterpay, note, checkedAt: new Date().toISOString() };
fs.writeFileSync('src/config/pay-later.json', JSON.stringify(out, null, 1) + '\n');
console.log(JSON.stringify(out));
