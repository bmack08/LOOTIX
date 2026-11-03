'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Card } from '@/config/collections';
import ProductCard from '@/components/store/ProductCard';
import { useWishlist } from '@/lib/wishlist';

export default function SavedView({ cards }: { cards: readonly Card[] }) {
  const { items, remove } = useWishlist();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const list = mounted ? items : [];
  return (
    <div className="text-parchment store-collection">
      <nav aria-label="Breadcrumb" className="pdp-crumbs font-plex uppercase text-stone"><Link href="/">Home</Link> / <span className="text-sand">Saved</span></nav>
      <header className="store-head">
        <h1 className="m-0 uppercase">Saved</h1>
        <span className="font-plex text-stone">{list.length} {list.length === 1 ? 'item' : 'items'}</span>
      </header>
      {mounted && !list.length ? (
        <div className="store-empty">
          <p>Nothing saved yet. Tap &#9825; on anything you like.</p>
          <Link href="/shop" className="btn-brass">Shop all</Link>
        </div>
      ) : (
        <div className="store-grid">
          {list.map((s) => {
            const card = cards.find((c) => c.handle === s.handle);
            const live = card && card.colours.some((c) => c.inStock.length > 0 || card.sizes.length === 0);
            if (card && live) return <ProductCard key={s.handle} card={card} colour={s.color} />;
            return (
              <div key={s.handle} className="store-card store-card-gone">
                {card ? <img src={card.img} alt="" /> : null}
                <div className="store-card-body">
                  <span className="store-card-name">{card?.title ?? s.handle}</span>
                  <span className="font-plex text-stone">No longer available</span>
                  <button type="button" className="pdp-link" onClick={() => remove(s.handle)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
