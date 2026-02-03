'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface Product {
  id: string | number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | null;
  slug?: string;
}

// Fallback products in case Printful API is not configured
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Summit Hoodie',
    price: 89,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80',
    badge: 'NEW',
    slug: 'summit-hoodie',
  },
  {
    id: 2,
    name: 'Trail Runner Tee',
    price: 45,
    salePrice: 35,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    badge: 'SALE',
    slug: 'trail-runner-tee',
  },
  {
    id: 3,
    name: 'Explorer Joggers',
    price: 75,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80',
    badge: null,
    slug: 'explorer-joggers',
  },
  {
    id: 4,
    name: 'Basecamp Cap',
    price: 35,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80',
    badge: 'NEW',
    slug: 'basecamp-cap',
  },
];

const JustArrivedSection: FC = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            // Map Printful products to our format, take first 4
            const mappedProducts = data.products.slice(0, 4).map((p: {
              id: string | number;
              name: string;
              price: number;
              images?: string[];
              slug?: string;
            }, index: number) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              image: p.images?.[0] || fallbackProducts[index]?.image || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80',
              badge: index === 0 ? 'NEW' : null,
              slug: p.slug || p.id.toString(),
            }));
            setProducts(mappedProducts);
          }
        }
      } catch (error) {
        console.log('Using fallback products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-display font-bold text-text-primary">
            JUST ARRIVED<span className="text-cta-primary animate-blink">_</span>
          </h2>
          <Link
            href="/shop"
            className="text-cta-primary text-sm font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-bg-secondary rounded-md mb-4" />
                <div className="h-4 bg-bg-secondary rounded w-3/4 mb-2" />
                <div className="h-4 bg-bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                image={product.image}
                badge={product.badge}
                slug={product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JustArrivedSection;
