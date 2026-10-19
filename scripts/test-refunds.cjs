/**
 * Unit tests for refund / chargeback entry voiding — NO Stripe calls, no
 * network, no database. Exercises the real compiled source of
 * src/lib/refunds.ts against hand-built Stripe fixtures.
 *
 * Run with:  npm run test:refunds
 * (compiles the pure module to .tmp-test/ with the local tsc first)
 */
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  isFullyRefunded,
  decideRefundVoid,
  decideDisputeVoid,
  findVoidableOrderRows,
} = require('../.tmp-test/refunds.js');

/** A fully refunded $42.00 charge. */
const fullRefund = (over = {}) => ({
  id: 'ch_test_1',
  payment_intent: 'pi_test_1',
  amount: 4200,
  amount_refunded: 4200,
  refunded: true,
  ...over,
});

// ── full vs partial ──────────────────────────────────────────────────────
test('a charge flagged refunded is a full refund', () => {
  assert.equal(isFullyRefunded(fullRefund()), true);
});

test('amounts adding up to the total count as a full refund', () => {
  // Several partial refunds that together cover the charge; Stripe may not
  // have flipped `refunded` yet in the payload we receive.
  assert.equal(
    isFullyRefunded({ amount: 4200, amount_refunded: 4200, refunded: false }),
    true,
  );
});

test('a partial refund is not a full refund', () => {
  assert.equal(isFullyRefunded({ amount: 4200, amount_refunded: 1000, refunded: false }), false);
});

test('a zero-amount charge is not treated as fully refunded', () => {
  assert.equal(isFullyRefunded({ amount: 0, amount_refunded: 0, refunded: false }), false);
});

// ── the refund decision ──────────────────────────────────────────────────
test('a full refund voids the entry and carries the ids through', () => {
  const d = decideRefundVoid(fullRefund());
  assert.equal(d.void, true);
  assert.equal(d.reason, 'refund');
  assert.equal(d.chargeId, 'ch_test_1');
  assert.equal(d.paymentIntent, 'pi_test_1');
});

test('a partial refund leaves the entry standing', () => {
  const d = decideRefundVoid({ id: 'ch_2', amount: 4200, amount_refunded: 500, refunded: false });
  assert.equal(d.void, false);
  assert.match(d.reason, /partial refund/);
});

test('an expanded payment_intent object is unwrapped to its id', () => {
  const d = decideRefundVoid(fullRefund({ payment_intent: { id: 'pi_expanded' } }));
  assert.equal(d.void, true);
  assert.equal(d.paymentIntent, 'pi_expanded');
});

test('a missing payment_intent still voids, by charge id', () => {
  const d = decideRefundVoid(fullRefund({ payment_intent: null }));
  assert.equal(d.void, true);
  assert.equal(d.paymentIntent, null);
  assert.equal(d.chargeId, 'ch_test_1');
});

test('a charge with no id cannot be acted on', () => {
  const d = decideRefundVoid(fullRefund({ id: null }));
  assert.equal(d.void, false);
});

// ── the chargeback decision ──────────────────────────────────────────────
test('an opened dispute voids the entry immediately', () => {
  const d = decideDisputeVoid({
    id: 'dp_1',
    charge: 'ch_test_1',
    payment_intent: 'pi_test_1',
    status: 'needs_response',
  });
  assert.equal(d.void, true);
  assert.equal(d.reason, 'chargeback');
  assert.equal(d.chargeId, 'ch_test_1');
});

test('an expanded charge object on a dispute is unwrapped', () => {
  const d = decideDisputeVoid({ id: 'dp_2', charge: { id: 'ch_expanded' } });
  assert.equal(d.void, true);
  assert.equal(d.chargeId, 'ch_expanded');
});

test('a dispute with no charge cannot be acted on', () => {
  assert.equal(decideDisputeVoid({ id: 'dp_3', charge: null }).void, false);
});

// ── matching the ledger row to void ──────────────────────────────────────
const orderRow = (over = {}) => ({
  source: 'order',
  voided_at: null,
  meta: { session_id: 'cs_1', payment_intent: 'pi_test_1' },
  ...over,
});

test('matches an order row on payment_intent', () => {
  const found = findVoidableOrderRows([orderRow()], { paymentIntent: 'pi_test_1' });
  assert.equal(found.length, 1);
});

test('matches an order row on session id, for entries granted before payment_intent was stored', () => {
  const legacy = orderRow({ meta: { session_id: 'cs_legacy' } });
  assert.equal(findVoidableOrderRows([legacy], { sessionId: 'cs_legacy' }).length, 1);
  assert.equal(findVoidableOrderRows([legacy], { paymentIntent: 'pi_test_1' }).length, 0);
});

test('matches an order row on charge id', () => {
  const row = orderRow({ meta: { charge_id: 'ch_test_1' } });
  assert.equal(findVoidableOrderRows([row], { chargeId: 'ch_test_1' }).length, 1);
});

// This is the idempotency guarantee: Stripe delivers charge.refunded at least
// once, and a second delivery must be a no-op rather than a double report.
test('an already-voided row is not matched again', () => {
  const row = orderRow({ voided_at: '2026-10-18T20:00:00.000Z' });
  assert.equal(findVoidableOrderRows([row], { paymentIntent: 'pi_test_1' }).length, 0);
});

test('a mail-in row is never voided by a refund', () => {
  const row = { source: 'mail-in', voided_at: null, meta: { payment_intent: 'pi_test_1' } };
  assert.equal(findVoidableOrderRows([row], { paymentIntent: 'pi_test_1' }).length, 0);
});

test('a signup row is never voided by a refund', () => {
  const row = { source: 'newsletter', voided_at: null, meta: { payment_intent: 'pi_test_1' } };
  assert.equal(findVoidableOrderRows([row], { paymentIntent: 'pi_test_1' }).length, 0);
});

test('a different order is not voided', () => {
  const found = findVoidableOrderRows([orderRow()], { paymentIntent: 'pi_someone_else' });
  assert.equal(found.length, 0);
});

test('no identifiers at all matches nothing', () => {
  assert.equal(findVoidableOrderRows([orderRow()], {}).length, 0);
});

test('rows with no meta do not crash matching', () => {
  const rows = [{ source: 'order' }, { source: 'order', meta: null }, {}];
  assert.equal(findVoidableOrderRows(rows, { paymentIntent: 'pi_test_1' }).length, 0);
});

test('only the matching order is voided out of several', () => {
  const rows = [
    orderRow({ meta: { session_id: 'cs_a', payment_intent: 'pi_a' } }),
    orderRow({ meta: { session_id: 'cs_b', payment_intent: 'pi_b' } }),
    orderRow({ meta: { session_id: 'cs_c', payment_intent: 'pi_c' } }),
  ];
  const found = findVoidableOrderRows(rows, { paymentIntent: 'pi_b' });
  assert.equal(found.length, 1);
  assert.equal(found[0].meta.session_id, 'cs_b');
});
