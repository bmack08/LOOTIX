import { MembershipTier } from '@/types/membership';

export const membershipTiers: MembershipTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '1 automatic entry per week',
      'Access to all public giveaways',
      'Standard email support',
      'Entry into monthly drawings',
    ],
    entriesPerWeek: 1,
    discountPercent: 0,
    pointsMultiplier: 1,
    color: '#6B7280', // gray
  },
  {
    id: 'bronze',
    name: 'Bronze',
    price: 9.99,
    interval: 'month',
    stripePriceId: 'price_bronze_monthly', // Replace with real Stripe ID
    features: [
      '5 automatic entries per week',
      '10% discount on all merchandise',
      'Priority email support',
      'Access to bronze member giveaways',
      'Entry into weekly drawings',
    ],
    entriesPerWeek: 5,
    discountPercent: 10,
    pointsMultiplier: 1,
    color: '#CD7F32', // bronze
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 19.99,
    interval: 'month',
    stripePriceId: 'price_silver_monthly',
    features: [
      '15 automatic entries per week',
      '20% discount on all merchandise',
      '2x loyalty points on purchases',
      'Access to silver-tier exclusive giveaways',
      'Early access to new product drops',
      'Priority email + chat support',
    ],
    entriesPerWeek: 15,
    discountPercent: 20,
    pointsMultiplier: 2,
    color: '#C0C0C0', // silver
    featured: true, // "Most Popular" badge
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    interval: 'month',
    stripePriceId: 'price_gold_monthly',
    features: [
      'UNLIMITED automatic entries',
      '30% discount on all merchandise',
      '3x loyalty points on purchases',
      'Access to GOLD-tier exclusive giveaways ($1000+ prizes)',
      'VIP early access to all drops',
      'Exclusive Discord channel access',
      'Free shipping on all orders',
      '24/7 priority support',
    ],
    entriesPerWeek: -1, // unlimited
    discountPercent: 30,
    pointsMultiplier: 3,
    color: '#FFD700', // gold
  },
];
