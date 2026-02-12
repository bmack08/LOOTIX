'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  currentGiveaway,
  ENTRY_MULTIPLIER,
  calculateEntries,
  formatEntries,
  getTimeRemaining,
  formatEndDate,
} from '@/config/giveaway';

export default function CurrentGiveawayPage() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(currentGiveaway.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(currentGiveaway.endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section with Prize */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Prize Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary border border-accent-earth/20">
              <Image
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"
                alt={currentGiveaway.title}
                fill
                className="object-cover"
                priority
              />
              {/* Value Badge */}
              <div className="badge-value">
                VALUE: ${currentGiveaway.prizeValue.toLocaleString()}
              </div>
            </div>

            {/* Prize Details */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-semibold text-cta-primary uppercase tracking-widest">
                  Current Giveaway
                </span>
                <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mt-2">
                  {currentGiveaway.title}
                </h1>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed">
                {currentGiveaway.description}
              </p>

              {/* Prize Details List */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {currentGiveaway.prizeDetails.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <span className="text-cta-primary font-bold">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Countdown Timer */}
              <div>
                <p className="text-sm text-text-muted uppercase tracking-widest mb-3">
                  Giveaway Ends {formatEndDate(currentGiveaway.endDate)}
                </p>
                {!timeRemaining.isExpired ? (
                  <div className="flex gap-3 md:gap-4">
                    {[
                      { value: timeRemaining.days, label: 'Days' },
                      { value: timeRemaining.hours, label: 'Hours' },
                      { value: timeRemaining.minutes, label: 'Mins' },
                      { value: timeRemaining.seconds, label: 'Secs' },
                    ].map((block) => (
                      <div
                        key={block.label}
                        className="flex flex-col items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-bg-secondary rounded-md"
                      >
                        <span
                          className={`font-display font-bold text-2xl md:text-4xl ${
                            timeRemaining.isUrgent
                              ? 'text-urgency animate-urgency'
                              : 'text-text-primary'
                          }`}
                        >
                          {pad(block.value)}
                        </span>
                        <span className="text-text-muted text-[10px] md:text-xs uppercase tracking-widest mt-1">
                          {block.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-bg-secondary rounded-md p-4 text-center">
                    <p className="font-display font-bold text-xl text-urgency uppercase">
                      Giveaway Ended
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quick-entries" className="btn-primary text-center">
                  ENTER NOW — FREE
                </Link>
                <Link href="/shop" className="btn-secondary text-center">
                  SHOP TO EARN MORE ENTRIES
                </Link>
              </div>

              <Link href="/official-rules" className="text-text-muted text-sm hover:text-text-secondary underline transition-colors">
                View Official Rules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Section */}
      <section className="py-16 px-6 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-8">
            How to <span className="text-cta-primary">Enter</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Entry */}
            <div className="bg-bg-primary border border-accent-earth/30 rounded-md p-6">
              <div className="text-sm font-bold text-success uppercase tracking-wider mb-3">Free Entry</div>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3">MAIL-IN METHOD</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Send a 3x5 postcard with your name, email, and "Lootix Giveaway Entry" to our mailing address. One entry per postcard, no purchase necessary.
              </p>
              <div className="mt-4 p-3 bg-bg-secondary rounded-sm text-text-muted text-xs">
                <p className="font-semibold text-text-secondary mb-1">Lootix LLC</p>
                <p>[Street Address]</p>
                <p>[City, State ZIP]</p>
              </div>
            </div>

            {/* Purchase Entry */}
            <div className="bg-bg-primary border border-cta-primary/30 rounded-md p-6">
              <div className="text-sm font-bold text-cta-primary uppercase tracking-wider mb-3">Bonus Entries</div>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3">PURCHASE METHOD</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Every $1 spent on Lootix gear earns you {ENTRY_MULTIPLIER} entries into the current giveaway. The more you shop, the better your odds.
              </p>
              <div className="entry-calculator">
                <p className="entry-calculator-text">
                  Example: $50 purchase = {formatEntries(calculateEntries(50))} entries
                </p>
                <span className="inline-block mt-2 bg-cta-primary text-white text-xs font-bold uppercase px-2 py-1 rounded-sm">
                  {ENTRY_MULTIPLIER}X ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Be Our First Winner */}
      <section className="py-16 px-6 bg-bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase mb-4">
            BE OUR FIRST <span className="text-cta-primary">WINNER</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            We're launching soon! Enter our inaugural giveaway for your chance to make history as a Lootix winner. Real prizes. Real winners. Real soon.
          </p>
          <Link href="/quick-entries" className="btn-primary">
            ENTER NOW
          </Link>
        </div>
      </section>
    </main>
  );
}
