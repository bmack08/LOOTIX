'use client';

import { FC } from 'react';

const QuickEntriesHero: FC = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-bg-dark via-bg-primary to-bg-primary overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-forest/10 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-16">
        {/* Main Heading */}
        <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
          QUICK <span className="text-cta-primary">ENTRIES</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Enter active giveaways in seconds. Earn bonus entries with social actions.
          Free to enter, no purchase necessary.
        </p>

        {/* The stat row was removed. It showed `5` Active Giveaways, `250+`
            Winners So Far and `$50K+` Total Prizes — all three invented. No
            giveaway has run, there are no winners, and no giveaway count is
            read from anywhere. Do not restore these without a real source. */}
      </div>
    </section>
  );
};

export default QuickEntriesHero;
