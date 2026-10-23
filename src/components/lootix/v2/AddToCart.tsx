'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import type { ShopProduct } from '@/lib/site';
import { entriesForSubtotal } from '@/config/giveaway';

/** Add-to-cart with confirmation flip: "Add to cart" → "✓ N entries added". */
export default function AddToCart({ product, full = false }: { product: ShopProduct; full?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  // 1 entry per $1 — derived from this item's price, not a per-product count.
  const entries = entriesForSubtotal(product.priceValue);

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation(); // don't trigger the parent card link
    add({
      slug: product.slug,
      name: product.name,
      price: product.priceValue,
      img: product.img,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <button
      onClick={onAdd}
      className={`font-archivo uppercase transition-colors ${full ? 'w-full' : ''}`}
      style={{
        background: added ? '#E6C57E' : '#C6A15B',
        color: '#0C0A07',
        border: 'none',
        borderRadius: 2,
        padding: '12px 18px',
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: '0.1em',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {added ? `✓ ${entries} entries added` : `Add to cart — ${product.price}`}
    </button>
  );
}
