'use client';

import { FC } from 'react';

const steps = [
  {
    number: '01',
    title: 'Browse Prizes',
    description: 'Check out our weekly giveaways featuring gift cards, games, dice sets, and exclusive collectibles.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Enter for Free',
    description: 'Click "Enter Now" on any giveaway. No purchase necessary. Support small businesses by shopping (optional).',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Win & Celebrate',
    description: 'Winners announced weekly! Get notified by email and showcased on our Winners page. Prizes shipped fast.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const HowItWorks: FC = () => {
  return (
    <section className="py-20 px-6 bg-dark-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30 rounded-full">
            <span className="text-neon-pink font-bold text-sm uppercase tracking-wider">⚡ Simple Process</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Entering our giveaways is easy and completely free. Here's how to get started:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 z-0"></div>
              )}

              {/* Card */}
              <div className="relative bg-dark-800/50 backdrop-blur-lg border-2 border-primary/30 rounded-xl p-8 transition-all duration-300 hover:border-primary/60 hover:shadow-neon-purple hover:-translate-y-2 z-10">
                {/* Step Number */}
                <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-full flex items-center justify-center font-display font-black text-2xl shadow-neon-purple">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-8 mb-6 text-neon-cyan">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="/current-giveaway"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neon-green text-neon-green rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-neon-green hover:text-dark-900 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <span>Start Entering Now</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
