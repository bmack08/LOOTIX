import QuickEntriesHero from '@/components/quick-entries/QuickEntriesHero';
import ActiveGiveawayGrid from '@/components/quick-entries/ActiveGiveawayGrid';
import BonusEntryActions from '@/components/quick-entries/BonusEntryActions';

export const metadata = {
  title: 'Quick Entries | Lootix - Enter Giveaways in Seconds',
  description: 'Enter active giveaways quickly and easily. Earn bonus entries with social actions. Free to enter, no purchase necessary.',
};

export default function QuickEntriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <QuickEntriesHero />

      {/* Active Giveaways */}
      <ActiveGiveawayGrid />

      {/* Bonus Entry Actions */}
      <BonusEntryActions />
    </div>
  );
}
