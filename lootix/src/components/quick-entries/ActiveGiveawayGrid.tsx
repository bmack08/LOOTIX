'use client';

import { FC, useState } from 'react';
import PrizeCard from '@/components/PrizeCard';
import QuickEntryForm from './QuickEntryForm';

// Mock giveaway data (reusing from FeaturedPrizes structure)
const activeGiveaways = [
  {
    id: 1,
    title: '$500 Gaming Gift Card Bundle',
    description: 'Steam, PlayStation, Xbox, and Nintendo eShop gift cards included in this epic bundle!',
    value: '$500',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5',
    link: '/current-giveaway',
    featured: true,
    endDate: 'Dec 15, 2024',
  },
  {
    id: 2,
    title: 'Luxury Dice Set Collection',
    description: 'Premium metal dice sets for D&D, Pathfinder, and other tabletop RPGs.',
    value: '$250',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937',
    link: '/current-giveaway',
    endDate: 'Dec 12, 2024',
  },
  {
    id: 3,
    title: 'Board Game Bundle',
    description: 'Top-rated modern board games including Wingspan, Catan, and Ticket to Ride.',
    value: '$300',
    image: 'https://images.unsplash.com/photo-1566694271453-390536dd1f0d',
    link: '/current-giveaway',
    endDate: 'Dec 18, 2024',
  },
  {
    id: 4,
    title: 'Gaming Collectibles Pack',
    description: 'Limited edition figurines, art prints, and memorabilia from popular franchises.',
    value: '$400',
    image: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048a9',
    link: '/current-giveaway',
    endDate: 'Dec 20, 2024',
  },
];

const ActiveGiveawayGrid: FC = () => {
  const [selectedGiveaway, setSelectedGiveaway] = useState<typeof activeGiveaways[0] | null>(null);

  const handleEnterClick = (giveaway: typeof activeGiveaways[0]) => {
    setSelectedGiveaway(giveaway);
  };

  return (
    <section className="py-20 px-6 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-white">
          Active <span className="text-primary">Giveaways</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose a giveaway below and enter with your email. Members get automatic entries!
        </p>

        {/* Giveaway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activeGiveaways.map((giveaway) => (
            <div key={giveaway.id} onClick={() => handleEnterClick(giveaway)}>
              <PrizeCard {...giveaway} />
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
