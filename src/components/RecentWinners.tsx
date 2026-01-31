'use client';

import { FC } from 'react';

const RecentWinners: FC = () => {
  return (
    <section className="py-16 md:py-20 px-6 bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase mb-6">
          BE OUR FIRST WINNER
        </h2>

        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          We're launching soon! Enter our inaugural giveaway for your chance
          to make history as a Lootix winner. Real prizes. Real winners. Real soon.
        </p>

        {/* CTA Button */}
        <a href="/current-giveaway" className="btn-primary">
          ENTER NOW
        </a>

        {/* Trust indicator */}
        <p className="mt-8 text-sm text-text-muted">
          Your name could be here soon.
        </p>
      </div>
    </section>
  );
};

export default RecentWinners;
