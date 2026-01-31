'use client';

import { FC } from 'react';
import { membershipTiers } from '@/data/membershipTiers';

const MembershipComparison: FC = () => {
  const paidTiers = membershipTiers.filter(tier => tier.price > 0);

  const comparisonFeatures = [
    { label: 'Auto-entries per week', getValue: (tier: typeof paidTiers[0]) => tier.entriesPerWeek === -1 ? 'Unlimited' : tier.entriesPerWeek.toString() },
    { label: 'Merch discount', getValue: (tier: typeof paidTiers[0]) => `${tier.discountPercent}%` },
    { label: 'Loyalty multiplier', getValue: (tier: typeof paidTiers[0]) => `${tier.pointsMultiplier}x` },
    { label: 'Exclusive giveaways', getValue: (tier: typeof paidTiers[0]) => tier.name === 'Bronze' ? '✗' : '✓' },
    { label: 'Early access', getValue: (tier: typeof paidTiers[0]) => tier.name === 'Bronze' ? '✗' : '✓' },
    { label: 'VIP Discord', getValue: (tier: typeof paidTiers[0]) => tier.name === 'Gold' ? '✓' : '✗' },
    { label: 'Free shipping', getValue: (tier: typeof paidTiers[0]) => tier.name === 'Gold' ? '✓' : '✗' },
  ];

  return (
    <section className="py-20 px-6 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-white">
          Compare <span className="text-primary">Features</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          See what each tier includes at a glance
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/30">
                <th className="text-left py-4 px-4 text-gray-300 font-semibold">Feature</th>
                {paidTiers.map((tier) => (
                  <th
                    key={tier.id}
                    className="py-4 px-4 text-center font-display font-bold uppercase"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-primary/10 hover:bg-dark-900/50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-300">{feature.label}</td>
                  {paidTiers.map((tier) => (
                    <td key={tier.id} className="py-4 px-4 text-center text-white font-semibold">
                      {feature.getValue(tier)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly Cards (hidden on desktop) */}
        <div className="lg:hidden mt-8 space-y-4">
          {paidTiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-dark-900/50 border-2 border-primary/30 rounded-lg p-6"
            >
              <h3
                className="text-xl font-display font-bold uppercase mb-4"
                style={{ color: tier.color }}
              >
                {tier.name}
              </h3>
              <ul className="space-y-2">
                {comparisonFeatures.map((feature, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{feature.label}</span>
                    <span className="text-white font-semibold">{feature.getValue(tier)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipComparison;
