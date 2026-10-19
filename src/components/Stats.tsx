'use client';

import { FC } from 'react';

// Removed: `'$50K+' Prizes Given Away`, `'250+' Happy Winners` and
// `'10K+' Active Members`. No giveaway has run yet — nothing has been awarded,
// there are no winners, and there is no member count to read — so every one of
// those figures was invented. Only the free-entry claim below is true today.
// Do not add a figure here that is not read from real data.
const stats = [
  {
    number: '100%',
    label: 'Free to Enter',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

const Stats: FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-dark-800/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid — one honest tile, so it centers rather than sitting in a
            4-column track with three empty cells. */}
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 text-neon-cyan group-hover:scale-110 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-neon-cyan">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="text-4xl md:text-5xl font-display font-black text-transparent bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-dark-800/50 backdrop-blur-lg border-2 border-neon-green/30 rounded-full">
            <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-white font-bold">
              Verified & Trusted Platform
            </span>
            <span className="text-neon-green">✓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
