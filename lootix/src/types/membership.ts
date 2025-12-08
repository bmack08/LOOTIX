export type MembershipTierName = 'Free' | 'Bronze' | 'Silver' | 'Gold';

export interface MembershipTier {
  id: string;
  name: MembershipTierName;
  price: number;
  interval: 'month' | 'year';
  stripePriceId?: string; // For future Stripe integration
  features: string[];
  entriesPerWeek: number; // -1 = unlimited
  discountPercent: number;
  pointsMultiplier: number;
  color: string;
  featured?: boolean;
}

export interface UserMembership {
  userId: string;
  tier: MembershipTier;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

export interface WaitlistEntry {
  email: string;
  tierInterest: MembershipTierName;
  subscribedAt: Date;
}
