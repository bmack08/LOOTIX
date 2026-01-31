'use client';

import { FC } from 'react';

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '$50K+', label: 'PRIZES GIVEN' },
  { value: '250+', label: 'WINNERS' },
  { value: '10K+', label: 'MEMBERS' },
  { value: 'FREE', label: 'TO ENTER' },
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
