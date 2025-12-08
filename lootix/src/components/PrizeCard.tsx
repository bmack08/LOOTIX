'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PrizeCardProps {
  title: string;
  description: string;
  value: string;
  image: string;
  link: string;
  featured?: boolean;
  endDate?: string;
}

const PrizeCard: FC<PrizeCardProps> = ({
  title,
  description,
  value,
  image,
  link,
  featured = false,
  endDate,
}) => {
  return (
    <Link href={link}>
      <div
        className={`group relative bg-dark-800/50 backdrop-blur-lg rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 ${
          featured
            ? 'border-neon-yellow shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)]'
            : 'border-primary/30 hover:border-primary/60 shadow-lg hover:shadow-neon-purple'
        }`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-neon-yellow to-neon-green px-4 py-2 rounded-full text-dark-900 font-bold text-sm uppercase tracking-wide animate-pulse-glow">
            🏆 Featured
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-dark-700">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Prize Value */}
          <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-neon-cyan/30 rounded-full">
            <span className="text-neon-cyan font-bold text-sm">💎 {value} Value</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* End Date */}
          {endDate && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Ends {endDate}</span>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <button className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white uppercase text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-neon-purple">
              <span>Enter Now</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </button>

            {/* Like/Save Button */}
            <button className="p-3 rounded-lg border-2 border-gray-700 hover:border-neon-pink hover:text-neon-pink transition-all duration-300 hover:scale-110">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default PrizeCard;
