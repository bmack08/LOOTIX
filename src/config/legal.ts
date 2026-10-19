// Single source for legal/sweepstakes facts. OWNER: fill every [BRACKET] before launch.
import { GIVEAWAY } from '@/lib/site';

export const LEGAL = {
  entityName: 'Lootix LLC',
  sponsorAddress: '212 Whirlaway Lane, Havre de Grace, MD 21078',
  governingState: 'Maryland',
  venueCounty: 'Harford County',
  supportEmail: 'hello@getlootix.com',
  privacyEmail: 'hello@getlootix.com',
  dmcaAgent: 'Copyright Agent, Lootix LLC',
  siteUrl: 'https://getlootix.com',
  effectiveDate: 'September 23, 2026',
};
export const AMOE = {
  entriesPerCard: 25,
  maxCardsPerDay: 1,
  onlineFreeEntries: 25, // email sign-up, once per person per sweepstakes
  receiptWindowDays: 7,
};
export const CURRENT_SWEEPSTAKES = {
  name: 'Lootix Launch Giveaway',
  mailInPhrase: 'LOOTIX LAUNCH GIVEAWAY',
  startDate: '[START DATE]', // OWNER
  // end = GIVEAWAY.drawDateISO in src/lib/site.ts (2026-10-12 8:00 PM ET)
  prizeARV: 400,
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Parses a naive ET ISO string ("YYYY-MM-DDTHH:mm[:ss]") by its parts so the
 * output never shifts with the server's timezone (Vercel runs in UTC).
 */
function parseNaiveISO(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso);
  if (!m) throw new Error(`Invalid ISO date: ${iso}`);
  return {
    year: Number(m[1]),
    month: Number(m[2]),
    day: Number(m[3]),
    hour: m[4] ? Number(m[4]) : 0,
    minute: m[5] ? Number(m[5]) : 0,
  };
}

/** "October 12, 2026" — date part of a naive ET ISO string, optionally offset by whole days. */
export function formatETDate(iso: string, addDays = 0): string {
  const { year, month, day } = parseNaiveISO(iso);
  const d = new Date(Date.UTC(year, month - 1, day + addDays));
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** "October 12, 2026 at 8:00 PM ET" — formats a naive ET ISO string. */
export function formatETDateTime(iso: string): string {
  const { hour, minute } = parseNaiveISO(iso);
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${formatETDate(iso)} at ${h12}:${String(minute).padStart(2, '0')} ${ampm} ET`;
}

/** Current sweepstakes end, e.g. "October 12, 2026 at 8:00 PM ET". */
export function formatDrawDate(): string {
  return formatETDateTime(GIVEAWAY.drawDateISO);
}

/** True while any OWNER [BRACKET] placeholder remains in the legal facts. */
export const HAS_LEGAL_PLACEHOLDERS =
  LEGAL.sponsorAddress.includes('[') || CURRENT_SWEEPSTAKES.startDate.includes('[');
