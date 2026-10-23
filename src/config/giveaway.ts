// ─────────────────────────────────────────────────────────────
// Centralized giveaway configuration.
//
// Owner decision (Oct 22, 2026): entries are PER DOLLAR.
//   · Order    → 1 entry per $1 of the order subtotal, after discounts and
//                before tax and shipping. $129.99 → 129 entries.
//   · Mail-in  → 25 entries per card (one card per envelope, no cap).
//   · Sign-up  → 10 entries, once per normalized email for the whole giveaway.
//
// These numbers live HERE and nowhere else. Order entries are always computed
// server-side from the Stripe session, never from client data.
//
// Dates live in src/lib/site.ts (GIVEAWAY) so there is one source for those.
// ─────────────────────────────────────────────────────────────

import { GIVEAWAY } from '@/lib/site';

export const ENTRIES_PER_DOLLAR = 1;
export const MAIL_IN_ENTRIES = 25;
export const SIGNUP_ENTRIES = 10;

/** The one public-facing phrase for how purchase entries work. */
export const ENTRIES_LABEL = '1 entry per $1 spent';

// ── The standard no-purchase disclosure (owner decision, Oct 22 2026) ──
//
// This exact sentence must appear — unchanged — wherever entries are mentioned
// to the public, always next to a link to the free mail-in entry method.
// Render it with <NoPurchaseNotice> (src/components/NoPurchaseNotice.tsx) so
// there is one copy of the wording for the whole site, and the plain string
// below for email HTML.
//
// It says "the odds of any ENTRY being selected" on purpose: entries are
// weighted per dollar, so buying more earns more entries — what a purchase
// never does is make one entry more likely to be drawn than another. Do NOT
// reword it to "a purchase does not increase your chances of winning": with a
// weighted draw that claim is false.
/** Second half of the line on its own, for copy that already says sentence 1. */
export const NO_PURCHASE_ODDS_SENTENCE =
  'A purchase will not increase the odds of any entry being selected.';

export const NO_PURCHASE_LINE =
  `No purchase necessary to enter or win. ${NO_PURCHASE_ODDS_SENTENCE}`;

/** Public origin, for links inside emails (which need absolute URLs). */
export const SITE_ORIGIN = 'https://getlootix.com';

/** The free mail-in entry method — Official Rules § 04 "How to Enter". */
export const FREE_ENTRY_HREF = '/official-rules#free-entry';
export const FREE_ENTRY_URL = `${SITE_ORIGIN}${FREE_ENTRY_HREF}`;
export const FREE_ENTRY_LINK_TEXT = 'Free entry by mail';

/** Free US shipping threshold, in dollars. */
export const FREE_SHIPPING_THRESHOLD = 100;

/**
 * Entries earned by an order subtotal in DOLLARS.
 * Subtotal = after discounts, before tax and shipping. Always floored.
 */
export function entriesForSubtotal(subtotalDollars: number): number {
  if (!Number.isFinite(subtotalDollars) || subtotalDollars <= 0) return 0;
  return Math.floor(subtotalDollars * ENTRIES_PER_DOLLAR);
}

/** Same, from Stripe's integer cents. */
export function entriesForSubtotalCents(subtotalCents: number): number {
  if (!Number.isInteger(subtotalCents) || subtotalCents <= 0) return 0;
  return entriesForSubtotal(subtotalCents / 100);
}

export interface GiveawayConfig {
  id: string;
  title: string;
  description: string;
  /**
   * Total approximate retail value. `null` on purpose — the owner has not set
   * item values yet, so the site must keep showing the "still being
   * finalized" placeholder instead of a made-up number.
   */
  prizeValue: number | null;
  prizeDetails: string[];
  /** Entry close, derived from GIVEAWAY.endDateISO. `null` until it is set. */
  endDate: Date | null;
  isActive: boolean;
}

/** Shown wherever the total prize value would go, until the owner sets it. */
export const PRIZE_VALUE_PLACEHOLDER = '[TOTAL VALUE TBD]';

// Current active giveaway - UPDATE THIS FOR NEW GIVEAWAYS
export const currentGiveaway: GiveawayConfig = {
  id: GIVEAWAY.id,
  title: 'Lootix Launch Giveaway',
  description:
    '$250 cash plus a custom Lootix hoodie and a custom Lootix tee. Item values and the total are still being finalized. No purchase necessary.',
  prizeValue: null,
  prizeDetails: [
    '$250 cash',
    'Custom Lootix hoodie (value TBD)',
    'Custom Lootix tee (value TBD)',
    'No purchase necessary',
  ],
  // One source for the date: src/lib/site.ts → GIVEAWAY.endDateISO (the entry
  // close, not the draw date — those are separate fields).
  endDate: GIVEAWAY.endDateISO ? new Date(GIVEAWAY.endDateISO) : null,
  isActive: true,
};

// Format entry count with commas
export function formatEntries(entries: number): string {
  return entries.toLocaleString();
}

// Get time remaining until giveaway ends
export function getTimeRemaining(endDate: Date | null): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isUrgent: boolean;
} {
  const zero = { days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: false };
  // No date set yet → not "expired", just nothing to count down to.
  if (!endDate) return { ...zero, isExpired: false };

  const now = new Date().getTime();
  const end = endDate.getTime();
  const difference = end - now;

  if (difference <= 0) return { ...zero, isExpired: true };

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    isUrgent: days === 0, // Less than 24 hours remaining
  };
}

/** Format the close date in Eastern time — the timezone the rules are written in. */
export function formatEndDate(date: Date | null): string {
  if (!date) return 'date to be announced';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });
}
