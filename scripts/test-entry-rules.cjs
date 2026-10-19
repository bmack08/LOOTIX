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

const {
  ENTRIES_PER_ORDER,
  ENTRIES_PER_MAIL_IN,
  ENTRIES_PER_SIGNUP,
  isEntryEligibleCountry,
  entryLabel,
  SITE_ORIGIN,
  SWEEPSTAKES_START_ET,
  SWEEPSTAKES_CLOSE_ET,
  etWallClockToInstant,
  entryWindowState,
  isWithinEntryWindow,
  sweepstakesPeriod,
} = require('../.tmp-test/sweepstakes.js');
const { decideOrderEntry, resolveCountry, isDuplicateOrderEntry } =
  require('../.tmp-test/stripe-entries.js');

/**
 * A moment inside the configured Sweepstakes Period, used wherever a test
 * needs the window to be open. Derived from the config rather than hardcoded
 * so these tests keep working when the owner sets the real dates.
 */
const PERIOD = sweepstakesPeriod();
const IN_WINDOW = new Date((PERIOD.start.getTime() + PERIOD.close.getTime()) / 2);

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

test('one email sign-up earns exactly one entry — the 25-entry bonus is gone', () => {
  assert.equal(ENTRIES_PER_SIGNUP, 1);
  assert.notEqual(ENTRIES_PER_SIGNUP, 25);
});

test('purchase, mail-in and sign-up entries are all equal — the legal equal-odds invariant', () => {
  assert.equal(ENTRIES_PER_ORDER, ENTRIES_PER_MAIL_IN);
  assert.equal(ENTRIES_PER_ORDER, ENTRIES_PER_SIGNUP);
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
test('paid US order inside the period earns an entry, with the email normalised', () => {
  const d = decideOrderEntry(paidUs(), IN_WINDOW);
  assert.equal(d.grant, true);
  assert.equal(d.email, 'buyer@example.com');
  assert.equal(d.country, 'US');
});

test('unpaid order earns nothing', () => {
  for (const status of ['unpaid', 'no_payment_required', null, undefined]) {
    const d = decideOrderEntry(paidUs({ payment_status: status }), IN_WINDOW);
    assert.equal(d.grant, false, `payment_status=${status} must not grant`);
  }
});

test('non-US order sells merch but earns no entry', () => {
  const d = decideOrderEntry(
    paidUs({ customer_details: { email: 'b@example.com', address: { country: 'CA' } } }),
    IN_WINDOW,
  );
  assert.equal(d.grant, false);
  assert.match(d.reason, /not entry-eligible/);
});

test('order with no email earns nothing', () => {
  const d = decideOrderEntry(
    paidUs({ customer_details: { address: { country: 'US' } } }),
    IN_WINDOW,
  );
  assert.equal(d.grant, false);
  assert.match(d.reason, /no email/);
});

test('order with no country at all earns nothing', () => {
  const d = decideOrderEntry(paidUs({ customer_details: { email: 'b@example.com' } }), IN_WINDOW);
  assert.equal(d.grant, false);
});

test('falls back to customer_email when customer_details has none', () => {
  const d = decideOrderEntry(
    {
      id: 'cs_1',
      payment_status: 'paid',
      customer_email: 'fallback@example.com',
      customer_details: { address: { country: 'US' } },
    },
    IN_WINDOW,
  );
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
  assert.equal(decideOrderEntry(session, IN_WINDOW).grant, false);
});

test('collected_information shipping address is read (current Stripe shape)', () => {
  const session = paidUs({
    customer_details: { email: 'b@example.com', address: { country: 'CA' } },
    collected_information: { shipping_details: { address: { country: 'US' } } },
  });
  assert.equal(resolveCountry(session), 'US');
  assert.equal(decideOrderEntry(session, IN_WINDOW).grant, true);
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

// ── the entry window: start → 8 PM ET close ─────────────────────────────
test('the configured period is valid and closes after it starts', () => {
  assert.ok(PERIOD, 'sweepstakesPeriod() must resolve');
  assert.ok(PERIOD.close.getTime() > PERIOD.start.getTime());
});

test('the close time is 8 PM ET, as the Official Rules state', () => {
  assert.match(SWEEPSTAKES_CLOSE_ET, /T20:00:00$/);
  const et = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    hour12: true,
  }).format(PERIOD.close);
  assert.equal(et, '8 PM');
});

test('an ET wall clock is converted using the real DST offset, not a fixed one', () => {
  // EDT (UTC-4) in August, EST (UTC-5) in January. A hardcoded offset gets one
  // of these wrong, which would silently move "8 PM ET" by an hour.
  assert.equal(etWallClockToInstant('2026-08-01T20:00:00').toISOString(), '2026-08-02T00:00:00.000Z');
  assert.equal(etWallClockToInstant('2026-01-15T20:00:00').toISOString(), '2026-01-16T01:00:00.000Z');
});

test('a malformed wall clock resolves to null rather than an Invalid Date', () => {
  assert.equal(etWallClockToInstant('not-a-date'), null);
});

test('entries count inside the window', () => {
  assert.equal(entryWindowState(IN_WINDOW), 'open');
  assert.equal(isWithinEntryWindow(IN_WINDOW), true);
});

test('the start instant itself counts — the period is inclusive at the open', () => {
  assert.equal(entryWindowState(PERIOD.start), 'open');
});

test('entries before the start do not count', () => {
  const before = new Date(PERIOD.start.getTime() - 1000);
  assert.equal(entryWindowState(before), 'before');
  assert.equal(isWithinEntryWindow(before), false);
});

test('the close instant does NOT count — "ends at 8:00 PM" excludes 8:00:00', () => {
  assert.equal(entryWindowState(PERIOD.close), 'closed');
  assert.equal(isWithinEntryWindow(PERIOD.close), false);
});

test('one millisecond before the close still counts', () => {
  assert.equal(entryWindowState(new Date(PERIOD.close.getTime() - 1)), 'open');
});

test('entries after the close do not count', () => {
  const after = new Date(PERIOD.close.getTime() + 60_000);
  assert.equal(entryWindowState(after), 'closed');
  assert.equal(isWithinEntryWindow(after), false);
});

test('an order placed after the close sells merch but earns no entry', () => {
  const d = decideOrderEntry(paidUs(), new Date(PERIOD.close.getTime() + 1));
  assert.equal(d.grant, false);
  assert.match(d.reason, /closed/);
});

test('an order placed before the start earns no entry', () => {
  const d = decideOrderEntry(paidUs(), new Date(PERIOD.start.getTime() - 1));
  assert.equal(d.grant, false);
  assert.match(d.reason, /not opened/);
});

test('a non-US order outside the window reports the eligibility reason first', () => {
  // The most specific reason is the more useful one in a log.
  const d = decideOrderEntry(
    paidUs({ customer_details: { email: 'b@example.com', address: { country: 'CA' } } }),
    new Date(PERIOD.close.getTime() + 1),
  );
  assert.equal(d.grant, false);
  assert.match(d.reason, /not entry-eligible/);
});

// ── copy helpers ────────────────────────────────────────────────────────
test('entry label is plural-safe', () => {
  assert.equal(entryLabel(1), '1 entry');
  assert.equal(entryLabel(2), '2 entries');
  assert.equal(entryLabel(0), '0 entries');
});
