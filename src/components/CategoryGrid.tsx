'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  name: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    name: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80',
    href: '/collections/hoodies',
  },
  {
    name: 'Shirts',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
    href: '/collections/shirts',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    href: '/collections/accessories',
  },
  {
    name: 'Bundles',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    href: '/collections/bundles',
  },
];

const CategoryGrid: FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <h2 className="text-[28px] font-display font-bold text-text-primary text-center mb-8">
          SHOP BY CATEGORY<span className="text-cta-primary animate-blink">_</span>
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div className="category-card group">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="category-overlay" />
                <span className="category-name">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
