'use client';

import { FC } from 'react';
import PrizeCard from './PrizeCard';

// Mock giveaway data
const featuredPrizes = [
  {
    id: 1,
    title: '$500 Gaming Gift Card Bundle',
    description: 'Steam, PlayStation, Xbox, and Nintendo eShop gift cards. Level up your gaming library!',
    value: '$500',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    link: '/current-giveaway',
    featured: true,
    endDate: 'Dec 15, 2024',
  },
  {
    id: 2,
    title: 'Metal D&D Dice Set Collection',
    description: 'Premium metal dice sets including dragon-scale designs, gemstone inlays, and collector cases.',
    value: '$250',
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80',
    link: '/current-giveaway',
    endDate: 'Dec 15, 2024',
  },
  {
    id: 3,
    title: 'Board Game Mega Bundle',
    description: 'Top-rated board games including Wingspan, Gloomhaven, and exclusive expansions.',
    value: '$300',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80',
    link: '/current-giveaway',
    endDate: 'Dec 15, 2024',
  },
  {
    id: 4,
    title: 'Limited Edition Collectibles',
    description: 'Rare figures, signed posters, and exclusive gaming merchandise from top franchises.',
    value: '$400',
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&q=80',
    link: '/current-giveaway',
    endDate: 'Dec 15, 2024',
  },
];

const FeaturedPrizes: FC = () => {
  return (
    <section id="featured" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full">
            <span className="text-neon-cyan font-bold text-sm uppercase tracking-wider">🎁 Active Giveaways</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            EPIC PRIZES UP FOR GRABS
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enter for free and win legendary prizes. New giveaways every week!
          </p>
        </div>

        {/* Prize Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredPrizes.map((prize) => (
            <PrizeCard
              key={prize.id}
              title={prize.title}
              description={prize.description}
              value={prize.value}
              image={prize.image}
              link={prize.link}
              featured={prize.featured}
              endDate={prize.endDate}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="/current-giveaway"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-neon-purple hover:shadow-neon-cyan"
          >
            <span>View All Giveaways</span>
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrizes;
