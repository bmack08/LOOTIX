// ─────────────────────────────────────────────────────────────
// Pure decision logic for "does this Stripe event void the order's entry?"
//
// Kept out of the route handler so it can be unit-tested with plain objects —
// no Stripe network calls, no env vars. See scripts/test-refunds.cjs.
//
// The rule, and why:
//
//   · FULL refund      → void the entry. Otherwise "order, collect entry,
//                        refund" is a free unlimited entry generator, which
//                        would also break the equal-odds promise the mail-in
//                        route depends on.
//   · PARTIAL refund   → keep the entry. One order earns exactly one entry
//                        regardless of amount, so a goodwill credit or a
//                        single returned item out of three does not undo the
//                        fact that a paid order was placed.
//   · CHARGEBACK       → void the entry, as soon as the dispute is opened.
//                        The funds are being clawed back, and the Terms treat
//                        a chargeback as forfeiting entries.
//
// A dispute the merchant later WINS does not auto-restore the entry: by then
// the draw may already have happened, and silently resurrecting an entry after
// a draw is worse than leaving it void. Re-add it by hand if it matters.
// ─────────────────────────────────────────────────────────────

/** Why an entry was voided. Stored on the ledger row for the audit trail. */
export type VoidReason = 'refund' | 'chargeback';

export type VoidDecision =
  | { void: true; reason: VoidReason; chargeId: string; paymentIntent: string | null }
  | { void: false; reason: string };

/** Minimal Stripe Charge shape; widened so tests can pass plain fixtures. */
export type ChargeLike = {
  id?: string | null;
  payment_intent?: string | { id?: string | null } | null;
  amount?: number | null;
  amount_refunded?: number | null;
  refunded?: boolean | null;
};

/** Minimal Stripe Dispute shape. */
export type DisputeLike = {
  id?: string | null;
  charge?: string | { id?: string | null } | null;
  payment_intent?: string | { id?: string | null } | null;
  status?: string | null;
};

/** Stripe expands some fields to objects depending on the request; accept both. */
function idOf(value: string | { id?: string | null } | null | undefined): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value || null;
  return value.id || null;
}

/**
 * Is this charge fully refunded?
 *
 * Stripe sets `refunded: true` once the whole charge is refunded, but the
 * amounts are checked too: a charge refunded in several partial steps that add
 * up to the full amount is also a full refund, and relying on the boolean
 * alone would miss it.
 */
export function isFullyRefunded(charge: ChargeLike): boolean {
  if (charge.refunded === true) return true;
  const amount = charge.amount ?? 0;
  const refunded = charge.amount_refunded ?? 0;
  return amount > 0 && refunded >= amount;
}

/** Decide what a `charge.refunded` event does to the order's entry. */
export function decideRefundVoid(charge: ChargeLike): VoidDecision {
  const chargeId = idOf(charge.id ?? null);
  if (!chargeId) return { void: false, reason: 'no charge id' };

  if (!isFullyRefunded(charge)) {
    const amount = charge.amount ?? 0;
    const refunded = charge.amount_refunded ?? 0;
    return { void: false, reason: `partial refund (${refunded} of ${amount}) — entry stands` };
  }

  return {
    void: true,
    reason: 'refund',
    chargeId,
    paymentIntent: idOf(charge.payment_intent),
  };
}

/** Decide what a `charge.dispute.created` event does to the order's entry. */
export function decideDisputeVoid(dispute: DisputeLike): VoidDecision {
  const chargeId = idOf(dispute.charge);
  if (!chargeId) return { void: false, reason: 'no charge on dispute' };

  return {
    void: true,
    reason: 'chargeback',
    chargeId,
    paymentIntent: idOf(dispute.payment_intent),
  };
}

/** A ledger row, as far as void matching cares. */
export type VoidableRow = {
  source?: string | null;
  voided_at?: string | null;
  meta?: {
    session_id?: string | null;
    payment_intent?: string | null;
    charge_id?: string | null;
  } | null;
};

/**
 * Which order rows does this refund/chargeback apply to?
 *
 * Matches on payment_intent or charge id. Orders granted before those were
 * recorded in meta match on neither, which is why the webhook falls back to
 * asking Stripe for the checkout session id.
 *
 * Already-voided rows are excluded so a duplicate refund webhook is a no-op
 * rather than an error — Stripe delivers at least once.
 */
export function findVoidableOrderRows(
  rows: VoidableRow[],
  match: { paymentIntent?: string | null; chargeId?: string | null; sessionId?: string | null },
): VoidableRow[] {
  const { paymentIntent, chargeId, sessionId } = match;
  if (!paymentIntent && !chargeId && !sessionId) return [];

  return rows.filter((r) => {
    if (r.source !== 'order') return false;
    if (r.voided_at) return false;
    const meta = r.meta ?? {};
    if (paymentIntent && meta.payment_intent === paymentIntent) return true;
    if (chargeId && meta.charge_id === chargeId) return true;
    if (sessionId && meta.session_id === sessionId) return true;
    return false;
  });
}
