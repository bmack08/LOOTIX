// ─────────────────────────────────────────────────────────────
// Sweepstakes entry rules — SINGLE SOURCE OF TRUTH.
//
// These constants must stay in lockstep with the Official Rules
// (/official-rules). If a number or a date changes here, the Rules change too.
//
//   · One completed order  = 1 entry (regardless of items or cart value)
//   · One mail-in card     = 1 entry (free Alternate Method of Entry)
//   · One email sign-up    = 1 entry
//   · No cap on the number of entries one person may accumulate
//   · Entries only for legal residents of the US (50 states + D.C.)
//   · Entries only count inside the Sweepstakes Period (see below)
//
// Merch ships US-only; the entry is US-only for eligibility reasons.
// ─────────────────────────────────────────────────────────────

/** Entries granted for one completed checkout. NOT per item, NOT per dollar. */
export const ENTRIES_PER_ORDER = 1;

/** Entries granted per mail-in (AMOE) card. Equal odds to a purchase entry. */
export const ENTRIES_PER_MAIL_IN = 1;

/**
 * Entries granted for an email sign-up.
 *
 * Was 25. A sign-up bonus worth 25× a purchase entry made the "equal odds"
 * claim in the Rules false and made the entry maths impossible to explain, so
 * every route is now worth exactly one.
 */
export const ENTRIES_PER_SIGNUP = 1;

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

// ─────────────────────────────────────────────────────────────
// The Sweepstakes Period
//
// ⚠️ OWNER ACTION REQUIRED BEFORE LAUNCH ⚠️
// Both values below are ET wall-clock times and MUST match the dates printed
// in the Official Rules. The close time is 8:00 PM ET by decision.
//
// The close date carried over from the existing copy is 2026-08-01, which is
// in the PAST. Until it is updated, entryWindowState() reports 'closed' and
// NOTHING earns an entry — orders still complete and still ship, they just do
// not enter the draw. Update both dates, and /official-rules, before launch.
// ─────────────────────────────────────────────────────────────

/** IANA zone for every sweepstakes date. Handles EST/EDT automatically. */
export const SWEEPSTAKES_TIMEZONE = 'America/New_York';

/** Period opens — ET wall clock, no offset (the zone above supplies it). */
export const SWEEPSTAKES_START_ET = '2026-08-01T00:00:00';

/** Period closes — ET wall clock. 8:00 PM ET by decision. */
export const SWEEPSTAKES_CLOSE_ET = '2026-08-01T20:00:00';

/**
 * How far `date` sits from UTC in `timeZone`, in milliseconds.
 *
 * Intl is the only thing in the standard library that knows when EDT becomes
 * EST, so the offset is derived from it rather than hardcoded to -4 or -5. A
 * hardcoded offset is wrong for half the year, and "8 PM ET" silently becoming
 * 7 or 9 PM is exactly the kind of bug that voids a draw.
 */
function timeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const wallAsUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour') % 24, // Intl can emit hour 24 for midnight
    get('minute'),
    get('second'),
  );
  return wallAsUtc - date.getTime();
}

/**
 * Turn an ET wall-clock string into the real instant it refers to.
 *
 * Interprets the string as if it were UTC, then subtracts the zone's offset at
 * that moment. The offset is re-checked once because the first guess can land
 * on the other side of a DST transition.
 */
export function etWallClockToInstant(
  wallClock: string,
  timeZone: string = SWEEPSTAKES_TIMEZONE,
): Date | null {
  const asIfUtc = new Date(`${wallClock}Z`);
  if (Number.isNaN(asIfUtc.getTime())) return null;

  const firstGuess = new Date(asIfUtc.getTime() - timeZoneOffsetMs(asIfUtc, timeZone));
  const refinedOffset = timeZoneOffsetMs(firstGuess, timeZone);
  return new Date(asIfUtc.getTime() - refinedOffset);
}

export type EntryWindowState = 'before' | 'open' | 'closed' | 'misconfigured';

/** The instants the period opens and closes, or null if the config is broken. */
export function sweepstakesPeriod(): { start: Date; close: Date } | null {
  const start = etWallClockToInstant(SWEEPSTAKES_START_ET);
  const close = etWallClockToInstant(SWEEPSTAKES_CLOSE_ET);
  if (!start || !close) return null;
  if (close.getTime() <= start.getTime()) return null;
  return { start, close };
}

/**
 * Is `at` inside the Sweepstakes Period?
 *
 * Boundaries: the start instant counts, the close instant does not — an entry
 * landing exactly at 8:00:00 PM ET is out, which is the reading of "ends at
 * 8:00 PM" that cannot be argued with afterwards.
 */
export function entryWindowState(at: Date = new Date()): EntryWindowState {
  const period = sweepstakesPeriod();
  if (!period) return 'misconfigured';
  const t = at.getTime();
  if (t < period.start.getTime()) return 'before';
  if (t >= period.close.getTime()) return 'closed';
  return 'open';
}

/** Convenience: may an entry be granted for something happening at `at`? */
export function isWithinEntryWindow(at: Date = new Date()): boolean {
  return entryWindowState(at) === 'open';
}

/** Human-readable reason an entry was refused, for logs and API responses. */
export function entryWindowReason(state: EntryWindowState): string {
  switch (state) {
    case 'open':
      return 'inside the sweepstakes period';
    case 'before':
      return `sweepstakes period has not opened (opens ${SWEEPSTAKES_START_ET} ET)`;
    case 'closed':
      return `sweepstakes period closed (closed ${SWEEPSTAKES_CLOSE_ET} ET)`;
    case 'misconfigured':
      return 'sweepstakes period is misconfigured — check SWEEPSTAKES_START_ET / SWEEPSTAKES_CLOSE_ET in src/lib/sweepstakes.ts';
  }
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
