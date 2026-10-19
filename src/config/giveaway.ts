// Centralized giveaway configuration
// Update this file to manage giveaway dates and multipliers

export interface GiveawayConfig {
  id: string;
  title: string;
  description: string;
  prizeValue: number;
  prizeDetails: string[];
  endDate: Date;
  entryMultiplier: number;
  isActive: boolean;
}

// Entry multiplier for purchases.
//
// NOTE FOR COUNSEL REVIEW: purchase entries accrue at 60x per dollar, while the
// free mail-in path (AMOE) grants a single entry. The growth plan calls for the
// free path to be "clearly visible and equal in odds" — that is not currently
// true at this ratio. Confirm the AMOE entry grant with promotions counsel
// before launch. See 08_Growth_Plan/QUESTIONS-FOR-OWNER.md.
export const ENTRY_MULTIPLIER = 60;

// Current active giveaway - UPDATE THIS FOR NEW GIVEAWAYS
//
// LAUNCH TIER, per 08_Growth_Plan/03-Prize-Scaling-Roadmap.md.
// Total announced value $400. Do not raise this without clearing the Tier 2
// gate: 1,000 subscribers AND two consecutive drops above $5,000 revenue.
//
// The previous prize (a $5,000 custom gaming PC) was removed on 2026-09-01.
// It crossed the Florida / New York $5,000 filing-and-bonding threshold and
// sat six tiers above the current stage of the business.
export const currentGiveaway: GiveawayConfig = {
  id: 'giveaway-2026-launch',
  title: 'Launch Giveaway: $250 Cash + Full Merch Set',
  description:
    'Win $250 cash plus a complete Lootix merch set — hoodie, tee and slingbag. No purchase necessary to enter.',
  prizeValue: 400,
  prizeDetails: [
    '$250 cash',
    'Lootix hoodie ($64.99 value)',
    'Lootix tee ($34.99 value)',
    'Lootix slingbag ($49.99 value)',
    'No purchase necessary — free entry available',
  ],
  // PLACEHOLDER DATE. Set this to the close of the first drop window once the
  // launch date is fixed. Must stay in sync with GIVEAWAY.drawDateISO in
  // src/lib/site.ts, which drives the homepage countdown. Never ship a past date.
  endDate: new Date('2026-10-12T20:00:00'),
  entryMultiplier: ENTRY_MULTIPLIER,
  // NOTE: isActive is declared on the interface but is not read anywhere in the
  // app yet. Toggling it currently has no effect.
  isActive: true,
};

// Calculate entries from purchase amount
export function calculateEntries(purchaseAmount: number): number {
  return Math.floor(purchaseAmount * ENTRY_MULTIPLIER);
}

// Format entry count with commas
export function formatEntries(entries: number): string {
  return entries.toLocaleString();
}

// Get time remaining until giveaway ends
export function getTimeRemaining(endDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isUrgent: boolean;
} {
  const now = new Date().getTime();
  const end = endDate.getTime();
  const difference = end - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      isUrgent: false,
    };
  }

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

// Format end date for display
export function formatEndDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
