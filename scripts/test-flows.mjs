// No-key, no-network flow tests. Run: npm run test:flows
// Every env value below is a FAKE placeholder; global fetch is mocked and
// throws on any host it does not expect, so nothing can reach a live service.
import { readFileSync } from 'node:fs';
import Real from 'stripe';

const FAKE = {
  STRIPE_SECRET_KEY: 'sk_test_FAKE_not_a_real_key',
  STRIPE_WEBHOOK_SECRET: 'whsec_FAKE_not_a_real_secret',
  SUPABASE_URL: 'https://supabase.test.invalid',
  SUPABASE_SERVICE_ROLE_KEY: 'FAKE-service-role',
  PRINTFUL_API: 'FAKE-printful-token',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
};
for (const k of ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'PRINTFUL_API', 'PRINTFUL_STORE_ID', 'RESEND_API_KEY']) delete process.env[k];

const results = [];
async function test(name, fn) {
  try { await fn(); results.push([name, true]); console.log(`PASS  ${name}`); }
  catch (e) { results.push([name, false]); console.log(`FAIL  ${name}\n      ${e?.message || e}`); }
}
function assert(c, msg) { if (!c) throw new Error(msg); }
function eq(a, b, msg) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${msg}: got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`); }

// ---- mocked fetch ----
const calls = [];
let orderRow = null;
let printfulCreated = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const lineItems = {
  object: 'list', has_more: false, url: '/v1/checkout/sessions/cs_test_flow/line_items',
  data: [
    { id: 'li_1', object: 'item', description: 'Summon Hoodie', quantity: 1, price: { id: 'price_1', object: 'price', product: { id: 'prod_1', object: 'product', name: 'Summon Hoodie', metadata: { slug: 'summon-hoodie', size: 'L' } } } },
    { id: 'li_2', object: 'item', description: 'Nat 20 Tee', quantity: 2, price: { id: 'price_2', object: 'price', product: { id: 'prod_2', object: 'product', name: 'Nat 20 Tee', metadata: { slug: 'nat-20-tee', size: 'M' } } } },
  ],
};
globalThis.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  const method = (init.method || 'GET').toUpperCase();
  const body = init.body == null ? null : String(init.body);
  calls.push({ url, method, body });
  const u = new URL(url);
  if (u.host === 'supabase.test.invalid') {
    if (u.pathname === '/rest/v1/orders' && method === 'POST') { const r = JSON.parse(body); if (orderRow && orderRow.stripe_session_id === r.stripe_session_id) return json([], 201); /* ignore-duplicates, like PostgREST */ orderRow = { id: 1, ...r }; return json([orderRow], 201); }
    if (u.pathname === '/rest/v1/orders' && method === 'PATCH') { orderRow = { ...orderRow, ...JSON.parse(body) }; return json([orderRow]); }
    if (u.pathname === '/rest/v1/orders') return json(orderRow ? [orderRow] : []);
    return json([], 201);
  }
  if (u.host === 'api.stripe.com') {
    if (/\/line_items$/.test(u.pathname)) return json(lineItems);
    if (u.pathname === '/v1/checkout/sessions' && method === 'POST') return json({ id: 'cs_test_new', object: 'checkout.session', url: 'https://checkout.stripe.test/cs_test_new' });
  }
  if (u.host === 'api.printful.com') {
    if (method === 'GET' && u.pathname.startsWith('/orders/@')) return json({ code: 404, error: { message: 'Not found' } }, 404);
    if (method === 'POST' && u.pathname === '/orders' && !u.search) { printfulCreated = true; return json({ code: 200, result: { id: 90001, status: 'draft' } }); }
  }
  throw new Error(`UNEXPECTED fetch ${method} ${u.host}${u.pathname}${u.search}`);
};
const quiet = { log: console.log, warn: console.warn, error: console.error };
function mute() { console.log = console.warn = console.error = () => {}; }
function unmute() { Object.assign(console, quiet); }
const unexpected = () => calls.filter((c) => !/supabase\.test\.invalid|api\.stripe\.com|api\.printful\.com/.test(c.url));

// ---- shipping (pure) ----
const { quoteShipping } = await import('../src/config/shipping.ts');
const tee = { category: 'Tees', unitPrice: 45 }, hoodie = { category: 'Hoodies', unitPrice: 85 };
for (const [name, lines, cents, rule] of [
  ['tee $45 -> $5.95', [{ ...tee, qty: 1 }], 595, 'tees'],
  ['2 tees $90 -> $5.95', [{ ...tee, qty: 2 }], 595, 'tees'],
  ['hoodie $85 -> $8.95', [{ ...hoodie, qty: 1 }], 895, 'hoodie'],
  ['hoodie+tee $130 -> free', [{ ...hoodie, qty: 1 }, { ...tee, qty: 1 }], 0, 'free'],
  ['3 tees $135 -> free', [{ ...tee, qty: 3 }], 0, 'free'],
  ['hat-only $30 (no hat in catalog yet) -> $5.95', [{ category: 'Hats', unitPrice: 30, qty: 1 }], 595, 'other'],
]) {
  await test(`shipping: ${name}`, () => { const q = quoteShipping(lines); eq([q.amountCents, q.rule], [cents, rule], name); });
}

// ---- agreement: client ----
await test('agreement: cart checkout blocks submit until box ticked', () => {
  const s = readFileSync('src/app/cart/page.tsx', 'utf8');
  assert(/if \([^)]*!agreed\) return;/.test(s), 'no early return on !agreed');
  assert(/disabled=\{[^}]*!agreed\}/.test(s), 'button not disabled on !agreed');
  assert(/JSON\.stringify\(\{ items:.*, agreed \}\)/.test(s), 'agreed not sent');
});
await test('agreement: sign-up form (EmailCapture) blocks submit until box ticked', () => {
  const s = readFileSync('src/components/lootix/v2/EmailCapture.tsx', 'utf8');
  assert(/if \([^)]*!agreed\) return;/.test(s), 'no early return on !agreed');
  assert(/disabled=\{[^}]*!agreed\}/.test(s), 'button not disabled on !agreed');
  assert(/agreed \}\)/.test(s), 'agreed not sent');
});

// ---- agreement: /api/subscribe ----
const subscribe = await import('../src/app/api/subscribe/route.ts');
const post = (body, ip) => new Request('http://localhost/api/subscribe', { method: 'POST', headers: { 'content-type': 'application/json', 'x-real-ip': ip }, body: JSON.stringify(body) });
for (const [label, agreed, ip] of [['missing', undefined, '10.0.0.1'], ['false', false, '10.0.0.2'], ['"true" string', 'true', '10.0.0.3'], ['1', 1, '10.0.0.4']]) {
  await test(`agreement: /api/subscribe rejects agreed=${label} with 400, stores nothing`, async () => {
    const before = calls.length;
    const res = await subscribe.POST(post({ email: 'a@example.test', source: 'newsletter', ...(agreed === undefined ? {} : { agreed }) }, ip));
    eq(res.status, 400, 'status');
    eq(calls.length, before, 'no fetch calls');
  });
}

// ---- agreement: /api/checkout ----
const checkout = await import('../src/app/api/checkout/route.ts');
const cpost = (body, ip) => new Request('http://localhost/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json', 'x-real-ip': ip, origin: 'http://localhost:3000' }, body: JSON.stringify(body) });
const teeLine = [{ slug: 'nat-20-tee', qty: 1, size: 'M' }];
await test('checkout: no STRIPE_SECRET_KEY -> 503, no Stripe call', async () => {
  const res = await checkout.POST(cpost({ items: teeLine, agreed: true }, '10.1.0.1'));
  eq(res.status, 503, 'status');
});
process.env.STRIPE_SECRET_KEY = FAKE.STRIPE_SECRET_KEY; // stub key passes the key check; fetch is mocked
for (const [label, agreed, ip] of [['missing', undefined, '10.1.0.2'], ['false', false, '10.1.0.3'], ['"true" string', 'true', '10.1.0.4']]) {
  await test(`agreement: /api/checkout (fake key) rejects agreed=${label} with 400, no Stripe call`, async () => {
    const before = calls.length;
    const res = await checkout.POST(cpost({ items: teeLine, ...(agreed === undefined ? {} : { agreed }) }, ip));
    eq(res.status, 400, 'status');
    eq(calls.length, before, 'no fetch calls');
  });
}
async function checkoutShipping(items, ip) {
  const before = calls.length;
  const res = await checkout.POST(cpost({ items, agreed: true }, ip));
  const c = calls.slice(before).find((x) => x.url.endsWith('/v1/checkout/sessions'));
  assert(res.status === 200 && c, `checkout status ${res.status}`);
  const p = new URLSearchParams(c.body);
  return { p, amount: Number(p.get('shipping_options[0][shipping_rate_data][fixed_amount][amount]')) };
}
await test('checkout (fake key, mocked Stripe): tee -> shipping_options $5.95, US only, agreement in metadata', async () => {
  const { p, amount } = await checkoutShipping(teeLine, '10.1.0.5');
  eq(amount, 595, 'amount');
  eq(p.get('shipping_address_collection[allowed_countries][0]'), 'US', 'country');
  eq(p.get('metadata[agreement_box]'), 'checkout', 'agreement_box');
  assert(p.get('metadata[agreed_at]'), 'agreed_at missing');
});
await test('checkout (fake key, mocked Stripe): hoodie+tee $130 -> free shipping option', async () => {
  const { amount } = await checkoutShipping([{ slug: 'summon-hoodie', qty: 1, size: 'L' }, ...teeLine], '10.1.0.6');
  eq(amount, 0, 'amount');
});
await test('checkout (fake key, mocked Stripe): hoodie $85 -> $8.95', async () => {
  const { amount } = await checkoutShipping([{ slug: 'summon-hoodie', qty: 1, size: 'L' }], '10.1.0.7');
  eq(amount, 895, 'amount');
});

// ---- Printful order flow: webhook -> recordPaidOrder -> createDraftOrder ----
process.env.STRIPE_WEBHOOK_SECRET = FAKE.STRIPE_WEBHOOK_SECRET;
process.env.SUPABASE_URL = FAKE.SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY = FAKE.SUPABASE_SERVICE_ROLE_KEY;
process.env.PRINTFUL_API = FAKE.PRINTFUL_API;
const variants = await import('../src/config/printful-variants.ts');
const { recordPaidOrder } = await import('../src/lib/record-order.ts');
const webhook = await import('../src/app/api/stripe/webhook/route.ts');

await test('variants: every key is still null (owner TODO), lookup returns null', () => {
  assert(Object.values(variants.PRINTFUL_SYNC_VARIANT_IDS).every((v) => v === null), 'a real id is filled in');
  eq(variants.printfulVariantFor('summon-hoodie', 'L'), null, 'unmapped');
  eq(variants.printfulVariantFor('nope', 'L'), null, 'unknown');
});
// fake ids for this test run only (in memory)
variants.PRINTFUL_SYNC_VARIANT_IDS['summon-hoodie:L'] = 111;
variants.PRINTFUL_SYNC_VARIANT_IDS['nat-20-tee:M'] = 222;
await test('variants: slug:size mapping (fake ids), wrong size and bad ids rejected', () => {
  eq(variants.printfulVariantFor('summon-hoodie', 'L'), 111, 'L');
  eq(variants.printfulVariantFor('summon-hoodie', 'l'), null, 'lowercase key');
  eq(variants.printfulVariantFor('summon-hoodie', 'XL'), null, 'XL unmapped');
  eq(variants.missingVariantKeys([{ slug: 'summon-hoodie', size: 'L' }, { slug: 'summon-hoodie', size: 'XL' }, { slug: 'summon-hoodie', size: 'XL' }]), ['summon-hoodie:XL'], 'missing');
});

const session = {
  id: 'cs_test_flow', object: 'checkout.session', payment_status: 'paid', status: 'complete',
  amount_subtotal: 17500, amount_total: 17500, currency: 'usd', payment_intent: 'pi_test_flow',
  customer_details: { email: 'buyer@example.test', name: 'Test Buyer', phone: null },
  collected_information: { shipping_details: { name: 'Test Buyer', address: { line1: '1 Test St', line2: null, city: 'Testville', state: 'NY', postal_code: '10001', country: 'US' } } },
  metadata: { items: 'summon-hoodie:L:1,nat-20-tee:M:2', agreed_at: '2026-10-25T21:00:00.000Z', agreement_version: 'terms-2026-10-24+rules-2026-10-24', agreement_box: 'checkout', shipping_rule: 'free' },
};
const signer = new Real('sk_test_FAKE_signer_only');
function signed(payload) {
  return new Request('http://localhost/api/stripe/webhook', { method: 'POST', headers: { 'stripe-signature': signer.webhooks.generateTestHeaderString({ payload, secret: FAKE.STRIPE_WEBHOOK_SECRET }) }, body: payload });
}

await test('webhook: bad signature -> 400, nothing stored', async () => {
  const before = calls.length;
  const res = await webhook.POST(new Request('http://localhost/api/stripe/webhook', { method: 'POST', headers: { 'stripe-signature': 't=1,v1=deadbeef' }, body: '{}' }));
  eq(res.status, 400, 'status'); eq(calls.length, before, 'calls');
});
await test('webhook: unpaid session -> no order, no Printful', async () => {
  const before = calls.length;
  const payload = JSON.stringify({ id: 'evt_test_0', object: 'event', type: 'checkout.session.completed', data: { object: { ...session, payment_status: 'unpaid' } } });
  mute(); const res = await webhook.POST(signed(payload)); unmute();
  eq(res.status, 200, 'status'); eq(calls.length, before, 'calls');
});

let flowCalls = [];
await test('webhook (paid): 200, order row stored with items, address, agreement fields', async () => {
  const before = calls.length;
  const payload = JSON.stringify({ id: 'evt_test_1', object: 'event', type: 'checkout.session.completed', data: { object: session } });
  mute(); const res = await webhook.POST(signed(payload)); unmute();
  flowCalls = calls.slice(before);
  eq(res.status, 200, 'status');
  const insert = flowCalls.find((c) => c.method === 'POST' && c.url.includes('/rest/v1/orders'));
  assert(insert, 'no order insert');
  const row = JSON.parse(insert.body);
  eq(row.items.map((i) => [i.slug, i.size, i.qty, i.variant_id]), [['summon-hoodie', 'L', 1, 111], ['nat-20-tee', 'M', 2, 222]], 'items');
  eq([row.agreed_at, row.agreement_version, row.agreement_box], [session.metadata.agreed_at, session.metadata.agreement_version, 'checkout'], 'agreement');
  eq([row.ship_state, row.ship_country, row.status, row.amount_subtotal], ['NY', 'US', 'new', 17500], 'row');
});
await test('webhook (paid): Printful DRAFT payload - POST /orders, no confirm anywhere', async () => {
  const pf = flowCalls.filter((c) => c.url.includes('api.printful.com'));
  const create = pf.find((c) => c.method === 'POST');
  assert(printfulCreated && create, 'no draft create');
  eq(new URL(create.url).pathname + new URL(create.url).search, '/orders', 'url');
  const body = JSON.parse(create.body);
  assert(!('confirm' in body), 'confirm field present');
  assert(pf.every((c) => !/confirm/i.test(c.url)), 'confirm URL called');
  eq(body.items, [{ sync_variant_id: 111, quantity: 1 }, { sync_variant_id: 222, quantity: 2 }], 'items');
  eq(body.recipient.country_code, 'US', 'country');
  assert(/^[A-Z0-9-]+$/i.test(body.external_id), 'external_id');
  eq(Object.keys(body).sort(), ['external_id', 'items', 'recipient'], 'body keys');
});
await test('webhook (paid): row updated to draft_created with Printful id', async () => {
  eq([orderRow.status, orderRow.printful_order_id], ['draft_created', '90001'], 'row');
});
await test('webhook (replay of same event): no second Printful draft', async () => {
  const before = calls.length;
  const payload = JSON.stringify({ id: 'evt_test_1', object: 'event', type: 'checkout.session.completed', data: { object: session } });
  mute(); await webhook.POST(signed(payload)); unmute();
  assert(!calls.slice(before).some((c) => c.url.includes('api.printful.com')), 'Printful called again');
});

await test('record order: unmapped size -> needs_variant, no Printful call', async () => {
  orderRow = null;
  const before = calls.length;
  const fakeStripe = { checkout: { sessions: { listLineItems: async () => ({ data: [{ ...lineItems.data[0], price: { product: { id: 'p', object: 'product', name: 'Summon Hoodie', metadata: { slug: 'summon-hoodie', size: 'XL' } } } }] }) } } };
  mute(); await recordPaidOrder(fakeStripe, { ...session, id: 'cs_test_xl' }); unmute();
  assert(!calls.slice(before).some((c) => c.url.includes('api.printful.com')), 'Printful called');
  eq(orderRow.status, 'needs_variant', 'status');
  assert(String(orderRow.status_detail).includes('summon-hoodie:XL'), 'detail');
});
await test('record order: compact fallback uppercases size, unknown line kept as needs_variant', async () => {
  orderRow = null;
  const fakeStripe = { checkout: { sessions: { listLineItems: async () => ({ data: [] }) } } };
  mute(); await recordPaidOrder(fakeStripe, { ...session, id: 'cs_test_compact', metadata: { ...session.metadata, items: 'nat-20-tee:m:2,mystery::1' } }); unmute();
  eq(orderRow.items.map((i) => [i.slug, i.size, i.qty]), [['nat-20-tee', 'M', 2], ['mystery', 'ONE', 1]], 'items');
  eq(orderRow.status, 'needs_variant', 'status');
});
await test('record order: no agreement metadata -> no agreement fields written', async () => {
  orderRow = null;
  const md = { items: 'nat-20-tee:M:1' };
  const fakeStripe = { checkout: { sessions: { listLineItems: async () => ({ data: [] }) } } };
  const before = calls.length;
  mute(); await recordPaidOrder(fakeStripe, { ...session, id: 'cs_test_noagree', metadata: md }); unmute();
  const insert = calls.slice(before).find((c) => c.method === 'POST' && c.url.includes('/rest/v1/orders'));
  assert(!('agreed_at' in JSON.parse(insert.body)), 'agreed_at present');
});
await test('source: no confirm call anywhere in Printful order code', () => {
  const s = readFileSync('src/utils/printful.ts', 'utf8').split('export async function createDraftOrder')[1];
  assert(!/confirm\s*[:=]\s*(true|1)|\/confirm|[?&]confirm/.test(s), 'confirm found');
});
await test('no unexpected network hosts were contacted', () => eq(unexpected().length, 0, 'unexpected'));

const failed = results.filter((r) => !r[1]).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);