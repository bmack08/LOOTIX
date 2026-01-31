'use client';

import { FC, useState, useMemo } from 'react';
import Image from 'next/image';
import QuickEntryForm from './QuickEntryForm';
import { ENTRY_MULTIPLIER, formatEndDate } from '@/config/giveaway';

// Helper to get a future date
const getEndDate = (daysFromNow: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

interface Giveaway {
  id: number;
  title: string;
  description: string;
  value: string;
  image: string;
  link: string;
  featured?: boolean;
  endDate: Date;
}

// Mock giveaway data - dates are dynamically calculated
const getActiveGiveaways = (): Giveaway[] => [
  {
    id: 1,
    title: '$500 Gaming Gift Card Bundle',
    description: 'Steam, PlayStation, Xbox, and Nintendo eShop gift cards included in this epic bundle!',
    value: '$500',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5',
    link: '/current-giveaway',
    featured: true,
    endDate: getEndDate(30),
  },
  {
    id: 2,
    title: 'Luxury Dice Set Collection',
    description: 'Premium metal dice sets for D&D, Pathfinder, and other tabletop RPGs.',
    value: '$250',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937',
    link: '/current-giveaway',
    endDate: getEndDate(27),
  },
  {
    id: 3,
    title: 'Board Game Bundle',
    description: 'Top-rated modern board games including Wingspan, Catan, and Ticket to Ride.',
    value: '$300',
    image: 'https://images.unsplash.com/photo-1566694271453-390536dd1f0d',
    link: '/current-giveaway',
    endDate: getEndDate(33),
  },
  {
    id: 4,
    title: 'Gaming Collectibles Pack',
    description: 'Limited edition figurines, art prints, and memorabilia from popular franchises.',
    value: '$400',
    image: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048a9',
    link: '/current-giveaway',
    endDate: getEndDate(35),
  },
];

const ActiveGiveawayGrid: FC = () => {
  const activeGiveaways = useMemo(() => getActiveGiveaways(), []);
  const [selectedGiveaway, setSelectedGiveaway] = useState<Giveaway | null>(null);

  const handleEnterClick = (giveaway: Giveaway) => {
    setSelectedGiveaway(giveaway);
  };

  return (
    <section className="py-16 md:py-20 px-6 bg-bg-primary">
      <div className="max-w-container mx-auto">
        <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-4">
          Active <span className="text-cta-primary">Giveaways</span>
        </h2>
        <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
          Choose a giveaway below and enter with your email. Members get automatic entries!
        </p>

        {/* Giveaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {activeGiveaways.map((giveaway) => (
            <div
              key={giveaway.id}
              className="card group cursor-pointer"
              onClick={() => handleEnterClick(giveaway)}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={giveaway.image}
                  alt={giveaway.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Value Badge */}
                <div className="badge-value">
                  VALUE: {giveaway.value}
                </div>
                {/* Entry Multiplier Badge */}
                <div className="badge-entry">
                  {ENTRY_MULTIPLIER}X ENTRIES
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-cta-primary transition-colors">
                  {giveaway.title}
                </h3>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {giveaway.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">
                    Ends: {formatEndDate(giveaway.endDate)}
                  </span>
                  <span className="btn-primary py-2 px-4 text-sm">
                    ENTER NOW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Entry Form Modal */}
        {selectedGiveaway && (
          <QuickEntryForm
            giveaway={selectedGiveaway}
            onClose={() => setSelectedGiveaway(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ActiveGiveawayGrid;
