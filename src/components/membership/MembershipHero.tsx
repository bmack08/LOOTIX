'use client';

import { FC } from 'react';

const MembershipHero: FC = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-20">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm font-bold tracking-wider text-primary">
          ⚡ MEMBERSHIP BENEFITS
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 text-white">
          LEVEL UP YOUR <span className="text-primary">LOOT GAME</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Auto-entries, exclusive discounts, and legendary rewards
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Instant activation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipHero;
