'use client';

import { FC } from 'react';

const RecentWinners: FC = () => {
  return (
    <section className="py-16 px-4 bg-bg-dark text-center">
      <div className="max-w-[600px] mx-auto">
        {/* Section Header */}
        <h2 className="text-[28px] font-display font-bold text-text-primary mb-4">
          BE OUR FIRST WINNER<span className="text-cta-primary animate-blink">_</span>
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
