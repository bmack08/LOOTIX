// Centralized giveaway configuration
// Update this file to manage giveaway dates and multipliers

export interface GiveawayConfig {
  id: string;
  title: string;
  description: string;
  prizeValue: number;
  prizeDetails: string[];
  /**
   * Undefined until a close date is published in the finalized Official Rules.
   * Never put a placeholder date here: anything set is treated as a real
   * deadline and drives a visible countdown.
   */
  endDate?: Date;
  entryMultiplier: number;
  isActive: boolean;
}

// Entry multiplier for purchases
export const ENTRY_MULTIPLIER = 60;

/**
 * The real giveaway — the Launch Vault, which has NOT started.
 *
 * This previously described a "Custom Gaming PC Build" worth "over $5,000",
 * with an invented five-line spec list (RTX 4080 Super, Ryzen 9 7950X, 64GB
 * DDR5, 2TB NVMe, custom RGB), `prizeValue: 5000`, `isActive: true` and an
 * `endDate` of 2026-03-15 that drove a live ticking countdown. No such
 * giveaway exists or ever ran. The prize below is the Launch Vault as stated
 * everywhere else on the site (see `VAULT` / `GIVEAWAY_PRIZE` in @/lib/lootix).
 *
 * Site-wide status lives in @/config/sweepstakes — `SWEEPSTAKES_OPEN` is the
 * switch that gates every entry flow and countdown.
 */
export const currentGiveaway: GiveawayConfig = {
  id: 'launch-vault',
  title: 'The Launch Vault',
  description:
    'The Launch Vault: $250 cash plus a full Lootix merch bundle, drawn live by an independent third party. The sweepstakes has not started yet — no entries are being earned.',
  prizeValue: 250,
  prizeDetails: [
    '$250 cash, paid instantly',
    'Full Lootix merch bundle',
    "Winner's pick from the launch drop",
  ],
  // No end date: the sweepstakes has not started and no close date is published.
  endDate: undefined,
  entryMultiplier: ENTRY_MULTIPLIER,
  isActive: false,
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
