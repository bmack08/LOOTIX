'use client';

import { FC, useState, useEffect } from 'react';
import { currentGiveaway, getTimeRemaining, formatEndDate } from '@/config/giveaway';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroSlide {
  image: string;
  title: string;
  highlight?: string;
  subtitle: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
    title: 'LOOT',
    highlight: 'LEGENDARY',
    subtitle: 'GEAR UP. LEVEL UP.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    title: 'WIN EPIC',
    highlight: 'PRIZES',
    subtitle: 'Every purchase earns entries.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    title: 'ADVENTURE',
    highlight: 'AWAITS',
    subtitle: '$5,000 Gaming PC Giveaway',
  },
];

const HeroSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Slideshow auto-rotation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Countdown timer
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

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slideshow Backgrounds */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          {/* Background Image with Ken Burns zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(15,15,26,0.5) 0%, rgba(15,15,26,0.6) 50%, rgba(26,26,46,1) 100%)',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Main Heading */}
        <h1 className="font-display font-bold text-[clamp(40px,8vw,80px)] text-text-primary uppercase mb-4 tracking-tight">
          {heroSlides[currentSlide].title}{' '}
          <span className="text-cta-primary">{heroSlides[currentSlide].highlight}</span>
        </h1>
        <p className="text-[clamp(18px,3vw,24px)] text-text-secondary mb-8 tracking-wide">
          {heroSlides[currentSlide].subtitle}
        </p>

        {/* Countdown Timer */}
        <div className="mb-8">
          <p className="text-xs text-text-muted uppercase tracking-[0.2em] mb-4">
            Giveaway Ends {formatEndDate(currentGiveaway.endDate)}
          </p>

          {!isExpired && (
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINS' },
                { value: timeLeft.seconds, label: 'SECS' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-bg-secondary/80 backdrop-blur-sm rounded-md p-4 min-w-[70px]"
                >
                  <div className={`font-display font-bold text-[32px] ${isUrgent ? 'text-urgency' : 'text-text-primary'}`}>
                    {pad(item.value)}
                  </div>
                  <div className="text-[10px] text-text-muted tracking-[0.2em] mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a href="/current-giveaway" className="btn-primary">
            ENTER NOW
          </a>
          <a href="/shop" className="btn-secondary">
            SHOP GEAR
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
          {['Free Entry', 'Weekly Drawings', 'Ships Worldwide'].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-text-muted hover:text-text-primary transition-colors p-1"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Dot Navigation */}
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-cta-primary'
                  : 'w-2 bg-text-muted hover:bg-text-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
