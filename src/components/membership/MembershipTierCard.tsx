'use client';

import { FC } from 'react';
import { MembershipTier } from '@/types/membership';

interface MembershipTierCardProps {
  tier: MembershipTier;
  onSelectTier: (tierName: string) => void;
}

const MembershipTierCard: FC<MembershipTierCardProps> = ({ tier, onSelectTier }) => {
  const isFree = tier.price === 0;

  return (
    <div
      className={`relative bg-dark-800/50 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
        tier.featured
          ? 'border-2 border-primary shadow-[0_0_30px_rgba(168,85,247,0.3)]'
          : 'border-2 border-primary/30 hover:border-primary/60 hover:shadow-neon-purple'
      }`}
    >
      {/* Most Popular Badge */}
      {tier.featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Name */}
      <div className="mb-4">
        <h3
          className="text-2xl font-display font-bold uppercase tracking-wide mb-2"
          style={{ color: tier.color }}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          {isFree ? (
            <span className="text-4xl font-display font-black text-white">FREE</span>
          ) : (
            <>
              <span className="text-xl text-gray-400">$</span>
              <span className="text-4xl font-display font-black text-white">
                {tier.price.toFixed(2)}
              </span>
              <span className="text-gray-400">/{tier.interval}</span>
            </>
          )}
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-6 min-h-[240px]">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-primary text-lg flex-shrink-0 mt-0.5">✓</span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onSelectTier(tier.name)}
        className={`w-full py-3 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 ${
          isFree
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-primary hover:bg-primary/90 text-white shadow-neon-purple'
        }`}
      >
        {isFree ? 'Get Started Free' : `Join Waitlist - ${tier.name}`}
      </button>
    </div>
  );
};

export default MembershipTierCard;
