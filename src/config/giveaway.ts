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

// Current active giveaway - UPDATE THIS FOR NEW GIVEAWAYS
export const currentGiveaway: GiveawayConfig = {
  id: 'giveaway-2026-02',
  title: 'Custom Gaming PC Build',
  description: 'Win a fully loaded custom gaming PC worth over $5,000. Built with the latest components for maximum performance.',
  prizeValue: 5000,
  prizeDetails: [
    'RTX 4080 Super Graphics Card',
    'AMD Ryzen 9 7950X Processor',
    '64GB DDR5 RAM',
    '2TB NVMe SSD Storage',
    'Custom RGB Case & Cooling',
  ],
  // Set end date 30 days from deployment - adjust as needed
  endDate: new Date('2026-03-15T23:59:59'),
  entryMultiplier: 60,
  isActive: true,
};

// Entry multiplier for purchases
export const ENTRY_MULTIPLIER = 60;

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
