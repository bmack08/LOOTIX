export interface Giveaway {
  id: string;
  title: string;
  description: string;
  value: string;
  image: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  featured: boolean;
  memberOnly: boolean; // For exclusive giveaways
  requiredTier?: 'Bronze' | 'Silver' | 'Gold';
}

export interface GiveawayEntry {
  id: string;
  userId: string;
  giveawayId: string;
  email: string;
  name?: string;
  enteredAt: Date;
  entryMethod: 'manual' | 'automatic' | 'quick' | 'bonus' | 'referral';
  baseEntries: number;
  bonusEntries: number;
  totalEntries: number;
  bonusActions?: BonusActions;
}

export interface BonusActions {
  sharedTwitter?: boolean;
  joinedDiscord?: boolean;
  followedInstagram?: boolean;
  taggedFriend?: boolean;
}

export interface QuickEntryFormData {
  email: string;
  name: string;
  giveawayId: string;
  agreedToRules: boolean;
}
