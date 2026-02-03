'use client';

import { FC } from 'react';
import Image from 'next/image';
import { currentGiveaway, ENTRY_MULTIPLIER, formatEndDate } from '@/config/giveaway';

const FeaturedPrizes: FC = () => {
  return (
    <section className="py-16 px-4 bg-bg-dark">
      <div
        className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Prize Image */}
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"
            alt={currentGiveaway.title}
            width={800}
            height={600}
            className="w-full rounded-md"
          />
          {/* Value Badge */}
          <div className="absolute top-4 left-4 bg-urgency text-white px-4 py-2 font-display font-bold">
            VALUE: ${currentGiveaway.prizeValue.toLocaleString()}
          </div>
        </div>

        {/* Prize Details */}
        <div>
          {/* Label with blinking underscore */}
          <span className="text-cta-primary text-[13px] font-semibold tracking-[0.2em]">
            CURRENT GIVEAWAY<span className="animate-blink">_</span>
          </span>

          {/* Title */}
          <h2 className="text-[32px] font-display font-bold text-text-primary mt-2 mb-4">
            {currentGiveaway.title}
          </h2>

          {/* Description */}
          <p className="text-text-secondary mb-6 leading-relaxed">
            {currentGiveaway.description}
          </p>

          {/* Feature List */}
          <ul className="mb-6 space-y-2">
            {currentGiveaway.prizeDetails.map((detail, index) => (
              <li key={index} className="flex items-center gap-2 text-text-secondary">
                <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {detail}
              </li>
            ))}
          </ul>

          {/* Entry Calculator */}
          <div className="entry-calculator mb-6">
            <span className="text-cta-primary font-semibold">This purchase = </span>
            <span className="text-[24px] font-display font-bold text-cta-primary">3,000 entries</span>
            <span className="bg-cta-primary text-white text-[11px] font-bold px-2 py-0.5 ml-2">
              {ENTRY_MULTIPLIER}X ACTIVE
            </span>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-cta-primary text-white py-4 text-base font-bold tracking-[0.1em] border-none cursor-pointer transition-all duration-300 hover:bg-cta-hover">
            ENTER NOW — FREE
          </button>

          {/* Rules Link */}
          <a href="/official-rules" className="block text-center text-text-muted text-sm mt-4 hover:text-text-secondary cursor-pointer">
            View Official Rules
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrizes;
