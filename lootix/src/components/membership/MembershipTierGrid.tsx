'use client';

import { FC, useState } from 'react';
import { membershipTiers } from '@/data/membershipTiers';
import MembershipTierCard from './MembershipTierCard';
import WaitlistModal from './WaitlistModal';

const MembershipTierGrid: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const handleSelectTier = (tierName: string) => {
    if (tierName === 'Free') {
      // For free tier, could redirect to signup or show different modal
      alert('Free tier signup coming soon!');
      return;
    }
    setSelectedTier(tierName);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 px-6 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-white">
          Choose Your <span className="text-primary">Tier</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Select the membership level that fits your style. Upgrade or downgrade anytime.
        </p>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {membershipTiers.map((tier) => (
            <MembershipTierCard
              key={tier.id}
              tier={tier}
              onSelectTier={handleSelectTier}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>All plans include access to public giveaways and community features.</p>
          <p className="mt-2">Payment processed securely through Stripe.</p>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tierName={selectedTier}
      />
    </section>
  );
};

export default MembershipTierGrid;
