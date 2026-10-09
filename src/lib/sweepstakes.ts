// ─────────────────────────────────────────────────────────────
// Sweepstakes entry rules — SINGLE SOURCE OF TRUTH.
//
// These constants must stay in lockstep with the Official Rules
// (/official-rules). If a number changes here, the Rules change too.
//
//   · One completed order  = 1 entry (regardless of items or cart value)
//   · One mail-in card     = 1 entry (free Alternate Method of Entry)
//   · No cap on the number of entries one person may accumulate
//   · Entries only for legal residents of the US (50 states + D.C.)
//
// Merch ships to every country we sell to; only the *entry* is US-only.
// ─────────────────────────────────────────────────────────────

/** Entries granted for one completed checkout. NOT per item, NOT per dollar. */
export const ENTRIES_PER_ORDER = 1;

/** Entries granted per mail-in (AMOE) card. Equal odds to a purchase entry. */
export const ENTRIES_PER_MAIL_IN = 1;

/**
 * Country codes whose residents may receive entries, per the Rules'
 * eligibility clause. Purchases from elsewhere are fulfilled as normal
 * merchandise sales — they simply do not earn a sweepstakes entry.
 */
export const ENTRY_ELIGIBLE_COUNTRIES = ['US'] as const;

export function isEntryEligibleCountry(country?: string | null): boolean {
  if (!country) return false;
  return (ENTRY_ELIGIBLE_COUNTRIES as readonly string[]).includes(country.toUpperCase());
}

/** Canonical public origin. The owner owns getlootix.com (NOT lootix.com). */
export const SITE_ORIGIN = 'https://getlootix.com';

/** Stripe webhook endpoint to register in the Stripe Dashboard. */
export const STRIPE_WEBHOOK_PATH = '/api/stripe/webhook';

/** Short compliance line reused across every checkout surface. */
export const NO_PURCHASE_LINE =
  'No purchase necessary to enter or win. A purchase does not improve your chances of winning.';

/** Plural-safe entry label, e.g. "1 entry" / "3 entries". */
export function entryLabel(count: number): string {
  return `${count.toLocaleString()} ${count === 1 ? 'entry' : 'entries'}`;
}
