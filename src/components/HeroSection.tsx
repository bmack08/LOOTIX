'use client';

import { FC, useState, useEffect } from 'react';
import { currentGiveaway, getTimeRemaining, formatEndDate } from '@/config/giveaway';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSection: FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = getTimeRemaining(currentGiveaway.endDate);
      setTimeLeft({
        days: remaining.days,
        hours: remaining.hours,
        minutes: remaining.minutes,
        seconds: remaining.seconds,
      });
      setIsUrgent(remaining.isUrgent);
      setIsExpired(remaining.isExpired);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background - Earth tone gradient per brief */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-primary to-bg-primary"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-forest/10 via-transparent to-transparent"></div>

      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-forest/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cta-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-20">
        {/* Main Heading - Oswald display font */}
        <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-2">
          LOOT <span className="text-cta-primary">LEGENDARY</span>
        </h1>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-text-primary uppercase tracking-wide mb-6">
          LIVE BOLD
        </h2>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Enter for a chance to win <span className="text-cta-primary font-semibold">epic gaming prizes</span>.
          Free entry available, or multiply your chances with every purchase.
        </p>

        {/* Countdown Timer - Section 4.3 specs */}
        <div className="mb-10">
          {/* End Date Label */}
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4" style={{ letterSpacing: '0.05em' }}>
            Giveaway Ends {formatEndDate(currentGiveaway.endDate)}
          </p>

          {isExpired ? (
            <div className="text-2xl font-display font-bold text-urgency uppercase">
              GIVEAWAY ENDED
            </div>
          ) : (
            <>
              {/* Urgency message */}
              {isUrgent && (
                <p className="text-sm uppercase tracking-widest text-urgency font-bold mb-4 animate-urgency">
                  LAST CHANCE — ENDS TODAY!
                </p>
              )}

              {/* Timer blocks */}
              <div className="flex justify-center gap-3 md:gap-4">
                {[
                  { label: 'DAYS', value: timeLeft.days },
                  { label: 'HOURS', value: timeLeft.hours },
                  { label: 'MINS', value: timeLeft.minutes },
                  { label: 'SECS', value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`bg-bg-secondary rounded-md flex flex-col items-center justify-center
                      w-[60px] h-[60px] md:w-[80px] md:h-[80px]
                      ${isUrgent ? 'animate-urgency' : ''}`}
                  >
                    <div
                      className={`font-display font-bold text-2xl md:text-4xl
                        ${isUrgent ? 'text-urgency' : 'text-text-primary'}`}
                    >
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div
                      className="text-xs text-text-muted uppercase mt-1"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA Buttons - Section 4.1 & 4.2 specs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/current-giveaway"
            className="btn-primary w-full sm:w-auto"
          >
            ENTER NOW
          </a>
          <a
            href="/shop"
            className="btn-secondary w-full sm:w-auto"
          >
            BROWSE GEAR
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <span className="text-cta-primary">✓</span>
            <span>Free Entry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cta-primary">✓</span>
            <span>Weekly Drawings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cta-primary">✓</span>
            <span>Ships Worldwide</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-scroll">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
