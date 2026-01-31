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

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="font-display font-bold text-3xl text-cta-primary">5</div>
            <div className="text-sm text-text-muted uppercase tracking-wider">Active Giveaways</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl text-cta-primary">250+</div>
            <div className="text-sm text-text-muted uppercase tracking-wider">Winners So Far</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl text-cta-primary">$50K+</div>
            <div className="text-sm text-text-muted uppercase tracking-wider">Total Prizes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEntriesHero;
