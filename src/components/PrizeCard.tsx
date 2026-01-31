'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ENTRY_MULTIPLIER } from '@/config/giveaway';

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
      <div className="card group">
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-20 bg-cta-primary px-3 py-1 rounded-sm text-white font-bold text-sm uppercase tracking-wide">
            FEATURED
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Value Badge */}
          <div className="badge-value">
            VALUE: {value}
          </div>
          {/* Entry Multiplier Badge */}
          <div className="badge-entry">
            {ENTRY_MULTIPLIER}X ENTRIES
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-cta-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* End Date */}
          {endDate && (
            <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Ends {endDate}</span>
            </div>
          )}

          {/* CTA Button */}
          <span className="btn-primary w-full justify-center py-3 text-sm">
            ENTER NOW
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PrizeCard;
