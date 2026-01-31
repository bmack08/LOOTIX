import MembershipHero from '@/components/membership/MembershipHero';
import MembershipTierGrid from '@/components/membership/MembershipTierGrid';
import MembershipComparison from '@/components/membership/MembershipComparison';
import MembershipFAQ from '@/components/membership/MembershipFAQ';

export const metadata = {
  title: 'Membership Plans | Lootix - Win More with Premium Access',
  description: 'Join Lootix membership for automatic giveaway entries, exclusive prizes, merch discounts, and VIP perks. Bronze, Silver, and Gold tiers available.',
};

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MembershipHero />

      {/* Tier Selection */}
      <MembershipTierGrid />

      {/* Feature Comparison */}
      <MembershipComparison />

      {/* FAQ Section */}
      <MembershipFAQ />
    </div>
  );
}
