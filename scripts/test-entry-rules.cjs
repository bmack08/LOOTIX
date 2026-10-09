/**
 * Unit tests for the sweepstakes entry rules — NO Stripe calls, no network,
 * no database. Exercises the real compiled source of src/lib/sweepstakes.ts
 * and src/lib/stripe-entries.ts against hand-built session fixtures.
 *
 * Run with:  npm run test:entries
 * (compiles the two pure modules to .tmp-test/ with the local tsc first)
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const { ENTRIES_PER_ORDER, ENTRIES_PER_MAIL_IN, isEntryEligibleCountry, entryLabel, SITE_ORIGIN } =
  require('../.tmp-test/sweepstakes.js');
const { decideOrderEntry, resolveCountry, isDuplicateOrderEntry } =
  require('../.tmp-test/stripe-entries.js');

/** A paid US order, the happy path. */
const paidUs = (over = {}) => ({
  id: 'cs_test_happy',
  payment_status: 'paid',
  customer_details: { email: 'Buyer@Example.com', address: { country: 'US' } },
  ...over,
});

// ── the owner's entry rules ──────────────────────────────────────────────
test('one completed order earns exactly one entry', () => {
  assert.equal(ENTRIES_PER_ORDER, 1);
});

test('one mail-in card earns exactly one entry', () => {
  assert.equal(ENTRIES_PER_MAIL_IN, 1);
});

test('purchase and mail-in entries are equal — the legal equal-odds invariant', () => {
  assert.equal(ENTRIES_PER_ORDER, ENTRIES_PER_MAIL_IN);
});

test('absolute URLs use getlootix.com, not lootix.com', () => {
  assert.equal(SITE_ORIGIN, 'https://getlootix.com');
  assert.ok(!/\/\/(www\.)?lootix\.com/.test(SITE_ORIGIN));
});

// ── eligibility ─────────────────────────────────────────────────────────
test('US is entry-eligible, case-insensitively', () => {
  assert.equal(isEntryEligibleCountry('US'), true);
  assert.equal(isEntryEligibleCountry('us'), true);
});

test('non-US countries are not entry-eligible', () => {
  for (const c of ['CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'IE', 'NZ']) {
    assert.equal(isEntryEligibleCountry(c), false, `${c} must not be entry-eligible`);
  }
});

test('missing country is not entry-eligible', () => {
  assert.equal(isEntryEligibleCountry(null), false);
  assert.equal(isEntryEligibleCountry(undefined), false);
  assert.equal(isEntryEligibleCountry(''), false);
});

// ── the grant decision ──────────────────────────────────────────────────
test('paid US order earns an entry, with the email normalised', () => {
  const d = decideOrderEntry(paidUs());
  assert.equal(d.grant, true);
  assert.equal(d.email, 'buyer@example.com');
  assert.equal(d.country, 'US');
});

test('unpaid order earns nothing', () => {
  for (const status of ['unpaid', 'no_payment_required', null, undefined]) {
    const d = decideOrderEntry(paidUs({ payment_status: status }));
    assert.equal(d.grant, false, `payment_status=${status} must not grant`);
  }
});

test('non-US order sells merch but earns no entry', () => {
  const d = decideOrderEntry(
    paidUs({ customer_details: { email: 'b@example.com', address: { country: 'CA' } } }),
  );
  assert.equal(d.grant, false);
  assert.match(d.reason, /not entry-eligible/);
});

test('order with no email earns nothing', () => {
  const d = decideOrderEntry(paidUs({ customer_details: { address: { country: 'US' } } }));
  assert.equal(d.grant, false);
  assert.match(d.reason, /no email/);
});

test('order with no country at all earns nothing', () => {
  const d = decideOrderEntry(paidUs({ customer_details: { email: 'b@example.com' } }));
  assert.equal(d.grant, false);
});

test('falls back to customer_email when customer_details has none', () => {
  const d = decideOrderEntry({
    id: 'cs_1',
    payment_status: 'paid',
    customer_email: 'fallback@example.com',
    customer_details: { address: { country: 'US' } },
  });
  assert.equal(d.grant, true);
  assert.equal(d.email, 'fallback@example.com');
});

// ── which address decides eligibility ───────────────────────────────────
test('shipping country wins over billing country', () => {
  // Billed from the US but shipped to Canada → not entry-eligible.
  const session = paidUs({
    shipping_details: { address: { country: 'CA' } },
  });
  assert.equal(resolveCountry(session), 'CA');
  assert.equal(decideOrderEntry(session).grant, false);
});

test('collected_information shipping address is read (current Stripe shape)', () => {
  const session = paidUs({
    customer_details: { email: 'b@example.com', address: { country: 'CA' } },
    collected_information: { shipping_details: { address: { country: 'US' } } },
  });
  assert.equal(resolveCountry(session), 'US');
  assert.equal(decideOrderEntry(session).grant, true);
});

test('billing country is used when no shipping address was collected', () => {
  assert.equal(resolveCountry(paidUs()), 'US');
});

// ── idempotency: a webhook replay must not double-grant ─────────────────
test('a session already in the ledger is detected as a duplicate', () => {
  const rows = [{ source: 'order', meta: { session_id: 'cs_test_happy' } }];
  assert.equal(isDuplicateOrderEntry(rows, 'cs_test_happy'), true);
});

test('a different session is not a duplicate', () => {
  const rows = [{ source: 'order', meta: { session_id: 'cs_other' } }];
  assert.equal(isDuplicateOrderEntry(rows, 'cs_test_happy'), false);
});

test('an empty ledger has no duplicates', () => {
  assert.equal(isDuplicateOrderEntry([], 'cs_test_happy'), false);
});

test('a mail-in row with the same id does not block an order entry', () => {
  const rows = [{ source: 'mail-in', meta: { session_id: 'cs_test_happy' } }];
  assert.equal(isDuplicateOrderEntry(rows, 'cs_test_happy'), false);
});

test('rows without meta do not crash duplicate detection', () => {
  const rows = [{ source: 'order' }, { source: 'order', meta: null }, {}];
  assert.equal(isDuplicateOrderEntry(rows, 'cs_test_happy'), false);
});

// ── copy helpers ────────────────────────────────────────────────────────
test('entry label is plural-safe', () => {
  assert.equal(entryLabel(1), '1 entry');
  assert.equal(entryLabel(2), '2 entries');
  assert.equal(entryLabel(0), '0 entries');
});
