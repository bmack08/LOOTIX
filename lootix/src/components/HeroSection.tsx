'use client';

import { FC, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Set giveaway end date (example: 7 days from now)
    const giveawayEndDate = new Date();
    giveawayEndDate.setDate(giveawayEndDate.getDate() + 7);

    const calculateTimeLeft = () => {
      const difference = giveawayEndDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] flex flex-col justify-center items-center text-center bg-hero-pattern bg-cover bg-center overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/80 to-dark-900/95"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm font-bold tracking-wider text-primary">
          🎮 LEGENDARY GIVEAWAY ACTIVE
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-display font-black tracking-tight mb-4 text-white">
          LOOT <span className="text-primary">LEGENDARY</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-wide mb-6 text-white">
          LIVE BOLD
        </h2>

        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Enter for a chance to win <span className="text-primary font-bold">epic prizes</span>, support small businesses, and level up your collection!
        </p>

        {/* Countdown Timer */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">
            ⚡ Current Giveaway Ends In ⚡
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINS', value: timeLeft.minutes },
              { label: 'SECS', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-dark-800/80 backdrop-blur-lg border-2 border-primary/50 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px] hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-display font-black text-primary mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-semibold tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons - Hormozi style: ONE color, high contrast */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/current-giveaway"
            className="px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 text-white"
          >
            Enter Now
          </a>
          <a
            href="#featured"
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            Browse Prizes
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Free Entry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Weekly Drawings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">✓</span>
            <span>Support Small Biz</span>
          </div>
        </div>
      </div>

      {/* Floating Elements - Purple only */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroSection; 