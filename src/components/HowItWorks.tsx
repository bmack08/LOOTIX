'use client';

import { FC } from 'react';

const steps = [
  {
    number: '1',
    title: 'BROWSE',
    description: 'Check out our current giveaway and explore premium streetwear that earns you entries.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'ENTER',
    description: 'Enter for free via mail, or multiply your chances with every purchase. $1 = 60 entries.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'WIN',
    description: 'Winners announced weekly! Get notified by email and receive your prize shipped fast.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const HowItWorks: FC = () => {
  return (
    <section className="py-16 md:py-20 px-6 bg-bg-dark">
      <div className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase">
            HOW IT WORKS
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-[32px] left-[16.67%] right-[16.67%] h-0.5 border-t-2 border-dashed border-cta-primary/30 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Number Circle */}
              <div className="relative z-10 mx-auto w-16 h-16 rounded-full border-2 border-cta-primary flex items-center justify-center mb-6 bg-bg-dark">
                <span className="font-display font-bold text-2xl text-cta-primary">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="text-cta-primary mb-4 flex justify-center">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-text-primary uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="/current-giveaway" className="btn-primary">
            START ENTERING NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
