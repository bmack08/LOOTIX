'use client';

import { FC } from 'react';

interface StatItem {
  value: string;
  label: string;
}

// Only claims that are true before the first draw.
//
// Removed: `'$50K+' PRIZES GIVEN`, `'250+' WINNERS` and `'10K+' MEMBERS`.
// Lootix has not run a giveaway yet — nothing has been awarded, there are no
// winners and there is no member count to read — so all three were invented.
// Do not add a figure here that is not read from real data.
// Also note the wording: no bare "LIVE" badge, which reads as "the giveaway is
// running now" — the same reason @/lib/site uses "ON STREAM".
const stats: StatItem[] = [
  { value: 'FREE', label: 'TO ENTER' },
  { value: 'ON STREAM', label: 'INDEPENDENT DRAW' },
  { value: 'PUBLIC', label: 'WINNER ANNOUNCED' },
];

const TrustBar: FC = () => {
  return (
    <section className="bg-bg-secondary py-6">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-display font-bold text-2xl md:text-3xl text-cta-primary">
                {stat.value}
              </span>
              <span className="text-xs text-text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
