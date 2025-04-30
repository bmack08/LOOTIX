import { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <section className="relative h-[90vh] flex flex-col justify-center items-center text-center bg-hero-pattern bg-cover bg-center">
      <div className="bg-black/60 p-8 rounded-xl max-w-xl">
        <h1 className="text-5xl font-bold tracking-wide mb-4">
          Loot Legendary. Live Bold.
        </h1>
        <p className="text-lg mb-6">
          Fantasy x Streetwear gear forged for the fearless.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#collections" className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded">
            Shop Now
          </a>
          <a href="#featured" className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black">
            Featured Drop
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 