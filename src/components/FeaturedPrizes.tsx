'use client';

import { FC } from 'react';
import Image from 'next/image';
import { currentGiveaway, ENTRY_MULTIPLIER, formatEndDate } from '@/config/giveaway';

const FeaturedPrizes: FC = () => {
  return (
    <section id="featured" className="py-16 md:py-20 px-6 bg-bg-primary">
      <div className="max-w-container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="text-sm font-semibold text-cta-primary uppercase tracking-wider">
            CURRENT GIVEAWAY
          </span>
        </div>
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase mb-4">
            {currentGiveaway.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {currentGiveaway.description}
          </p>
        </div>

        {/* Main Prize Feature - 2 column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Prize Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"
              alt={currentGiveaway.title}
              fill
              className="object-cover"
            />
            {/* Value Badge */}
            <div className="badge-value">
              VALUE: ${currentGiveaway.prizeValue.toLocaleString()}
            </div>
          </div>

          {/* Prize Details */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-text-primary uppercase mb-4">
              What You Could Win
            </h3>

            {/* Prize Details List */}
            <ul className="space-y-3 mb-6">
              {currentGiveaway.prizeDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-text-secondary">
                  <span className="text-cta-primary mt-1">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {/* Entry Calculator */}
            <div className="entry-calculator mb-6">
              <p className="entry-calculator-text">
                This purchase = {(50 * ENTRY_MULTIPLIER).toLocaleString()} entries
              </p>
              <span className="inline-block mt-2 bg-cta-primary text-white text-xs font-bold uppercase px-2 py-1 rounded-sm">
                {ENTRY_MULTIPLIER}X ACTIVE
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/current-giveaway" className="btn-primary flex-1 justify-center">
                ENTER NOW — FREE
              </a>
              <a href="/official-rules" className="text-text-muted text-sm underline hover:text-text-secondary transition-colors self-center">
                Official Rules
              </a>
            </div>

            {/* End Date */}
            <p className="text-sm text-text-muted mt-4">
              Ends: {formatEndDate(currentGiveaway.endDate)}
            </p>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a
            href="/shop"
            className="text-cta-primary font-semibold hover:underline inline-flex items-center gap-2"
          >
            VIEW ALL GEAR
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrizes;
