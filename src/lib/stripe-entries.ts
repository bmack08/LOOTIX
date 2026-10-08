import type Stripe from 'stripe';
import { isEntryEligibleCountry } from './sweepstakes';

// ─────────────────────────────────────────────────────────────
// Pure decision logic for "does this Stripe order earn an entry?"
//
// Kept out of the route handler so it can be unit-tested with plain
// objects — no Stripe network calls, no env vars. See
// scripts/test-webhook-grant.mjs.
// ─────────────────────────────────────────────────────────────

export type EntryDecision =
  | { grant: true; email: string; country: string }
  | { grant: false; reason: string };

/** Minimal shape we need; widened so tests can pass plain fixtures. */
type SessionLike = Pick<Stripe.Checkout.Session, 'id'> & {
  payment_status?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null; address?: { country?: string | null } | null } | null;
  shipping_details?: { address?: { country?: string | null } | null } | null;
  collected_information?: { shipping_details?: { address?: { country?: string | null } | null } | null } | null;
};

/**
 * Country used to judge entry eligibility. Prefer the shipping address (where
 * the goods — and so the entrant — actually are), fall back to billing.
 *
 * `collected_information.shipping_details` is the current API location;
 * top-level `shipping_details` is the older one. Support both so this keeps
 * working across Stripe API versions.
 */
export function resolveCountry(session: SessionLike): string | null {
  return (
    session.collected_information?.shipping_details?.address?.country ||
    session.shipping_details?.address?.country ||
    session.customer_details?.address?.country ||
    null
  );
}

/** Email we attribute the entry to. */
export function resolveEmail(session: SessionLike): string {
  return (session.customer_details?.email || session.customer_email || '').trim().toLowerCase();
}

/**
 * Decide whether one completed checkout session earns its single entry.
 *
 * An ineligible order is still a valid merch sale — it simply earns no entry.
 */
export function decideOrderEntry(session: SessionLike): EntryDecision {
  if (session.payment_status !== 'paid') {
    return { grant: false, reason: `payment_status=${session.payment_status ?? 'unknown'}` };
  }

  const email = resolveEmail(session);
  if (!email) return { grant: false, reason: 'no email on session' };

  const country = resolveCountry(session);
  if (!isEntryEligibleCountry(country)) {
    return { grant: false, reason: `country ${country ?? 'unknown'} not entry-eligible` };
  }

  return { grant: true, email, country: country!.toUpperCase() };
}

/** An entry-ledger row, as far as duplicate detection cares. */
export type LedgerRow = { source?: string | null; meta?: { session_id?: string | null } | null };

/**
 * Has this Stripe session already been granted its order entry?
 *
 * Pulled out as a pure predicate so the idempotency rule is unit-testable
 * without touching Supabase or the filesystem.
 */
export function isDuplicateOrderEntry(rows: LedgerRow[], sessionId: string): boolean {
  if (!sessionId) return false;
  return rows.some((r) => r.source === 'order' && r.meta?.session_id === sessionId);
}
