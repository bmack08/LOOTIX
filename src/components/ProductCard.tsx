'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ENTRIES_PER_ORDER } from '@/lib/sweepstakes';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | null;
  slug?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  salePrice,
  image,
  badge,
  slug,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Entries are NOT derived from price. One completed order earns exactly one
  // entry no matter the item or the cart total, so there is nothing per-product
  // to compute — this used to render "42 entries" on a $42 tee.
  const displayPrice = salePrice || price;

  const href = slug ? `/product/${slug}` : `/product/${id}`;

  return (
    <Link href={href}>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />

          {/* Badge (NEW/SALE) */}
          {badge && (
            <span
              className={`product-badge ${
                badge === 'SALE' ? 'product-badge-sale' : 'product-badge-new'
              }`}
            >
              {badge}
            </span>
          )}

          {/* One order = one entry, whatever is in the cart */}
          <span className="badge-entry">1 ENTRY</span>

          {/* Quick View Overlay */}
          <div
            className="quick-view-overlay"
            style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            <button className="quick-view-btn">QUICK VIEW</button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-2 truncate">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-display font-bold text-cta-primary">
                ${displayPrice.toFixed(2)}
              </span>
              {salePrice && (
                <span className="text-sm text-text-muted line-through">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-text-muted">
              {ENTRIES_PER_ORDER} entry per order
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
