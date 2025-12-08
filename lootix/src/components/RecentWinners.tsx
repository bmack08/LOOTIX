'use client';

import { FC } from 'react';

const recentWinners = [
  {
    name: 'Alex M.',
    prize: '$500 Gaming Bundle',
    date: 'Dec 1, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    testimonial: 'I never win anything, but Lootix changed that! Got my Steam cards in 2 days!',
  },
  {
    name: 'Sarah K.',
    prize: 'Metal Dice Collection',
    date: 'Nov 28, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    testimonial: 'These dice are BEAUTIFUL! The quality is insane. Worth way more than $250!',
  },
  {
    name: 'Marcus T.',
    prize: 'Board Game Mega Pack',
    date: 'Nov 25, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    testimonial: 'Our game night crew is obsessed! Thank you Lootix for the amazing prizes!',
  },
  {
    name: 'Emma L.',
    prize: 'Collectibles Bundle',
    date: 'Nov 22, 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    testimonial: 'The limited edition figures are perfect for my collection. 10/10!',
  },
];

const RecentWinners: FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-neon-yellow/20 to-neon-green/20 border border-neon-yellow/30 rounded-full">
            <span className="text-neon-yellow font-bold text-sm uppercase tracking-wider">🏆 Hall of Fame</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            RECENT WINNERS
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real people, real prizes. You could be next!
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentWinners.map((winner, index) => (
            <div
              key={index}
              className="bg-dark-800/50 backdrop-blur-lg border-2 border-neon-yellow/30 rounded-xl p-6 transition-all duration-300 hover:border-neon-yellow/60 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-yellow to-neon-green p-1">
                  <img
                    src={winner.avatar}
                    alt={winner.name}
                    className="w-full h-full rounded-full bg-dark-900"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{winner.name}</h3>
                  <p className="text-sm text-gray-500">{winner.date}</p>
                </div>
              </div>

              {/* Prize */}
              <div className="mb-4 p-3 bg-neon-yellow/10 border border-neon-yellow/30 rounded-lg">
                <p className="text-neon-yellow font-bold text-center">
                  🎁 {winner.prize}
                </p>
              </div>

              {/* Testimonial */}
              <p className="text-gray-400 text-sm italic leading-relaxed">
                "{winner.testimonial}"
              </p>
            </div>
          ))}
        </div>

        {/* View All Winners CTA */}
        <div className="text-center mt-12">
          <a
            href="/past-winners"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-yellow transition-colors duration-300 font-bold text-lg"
          >
            <span>View All Winners</span>
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

export default RecentWinners;
