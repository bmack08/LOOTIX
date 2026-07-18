'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import type { ShopProduct } from '@/lib/site';

/** Add-to-cart with confirmation flip: "Add to cart" → "✓ N entries secured". */
export default function AddToCart({ product, full = false }: { product: ShopProduct; full?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function onAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation(); // don't trigger the parent card link
    add({
      slug: product.slug,
      name: product.name,
      price: product.priceValue,
      entries: product.entries,
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
      {added ? `✓ ${product.entries} entries secured` : `Add to cart — ${product.price}`}
    </button>
  );
}
