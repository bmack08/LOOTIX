// Verifies the checkout surfaces degrade gracefully with NO Stripe env vars:
//   /api/checkout        → 503 (not a crash)
//   /api/stripe/webhook  → 503 (not a crash)
//   /cart, /shop, /order/success → still render
// Run against `npm start` on :3000. No Stripe calls of any kind.
const BASE = process.env.PROBE_BASE || 'http://localhost:3000';

async function waitForServer(ms = 90000) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      await fetch(`${BASE}/shop`);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error('server never came up');
}

const results = [];
function record(name, got, want, extra = '') {
  const ok = got === want;
  results.push(ok);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}: ${got} (expected ${want}) ${extra}`);
}

await waitForServer();

// 1. checkout with no STRIPE_SECRET_KEY → 503, JSON error, no stack trace
{
  const res = await fetch(`${BASE}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ slug: 'guild-hoodie-black', qty: 2 }] }),
  });
  const body = await res.text();
  record('POST /api/checkout (no keys)', res.status, 503, `body=${body}`);
}

// 2. webhook with no secrets → 503 before any signature work
{
  const res = await fetch(`${BASE}/api/stripe/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  const body = await res.text();
  record('POST /api/stripe/webhook (no keys)', res.status, 503, `body=${body}`);
}

// 3. the checkout surfaces still render, and carry the disclosure
for (const path of ['/cart', '/shop', '/order/success']) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  record(`GET ${path}`, res.status, 200);
  const hasNotice = /No purchase necessary/i.test(html);
  const hasRulesLink = /\/official-rules/.test(html);
  record(`  ${path} shows "No purchase necessary"`, hasNotice, true);
  record(`  ${path} links the Official Rules`, hasRulesLink, true);
  // nothing may advertise stacked entries any more
  const stacked = /\d{2,}\s*ENTRIES|entries secured|best odds/i.test(html);
  record(`  ${path} free of stacked-entry claims`, stacked, false);
}

console.log(`\n${results.filter(Boolean).length}/${results.length} checks passed`);
process.exit(results.every(Boolean) ? 0 : 1);
