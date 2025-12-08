'use client';

import { FC } from 'react';

const QuickEntriesHero: FC = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-16">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm font-bold tracking-wider text-primary">
          🎯 QUICK ENTRIES
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 text-white">
          ENTER TO <span className="text-primary">WIN</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Enter active giveaways in seconds. Earn bonus entries with social actions.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-display font-bold text-primary">5</div>
            <div className="text-sm text-gray-400">Active Giveaways</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary">250+</div>
            <div className="text-sm text-gray-400">Winners So Far</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary">$50K+</div>
            <div className="text-sm text-gray-400">Total Prizes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEntriesHero;
