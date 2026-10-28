'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import type { ShopProduct } from '@/lib/site';
import { entriesForSubtotal } from '@/config/giveaway';
import { isComingSoon, sizesFor } from '@/config/sizes';
import { useEntryWindow } from '../useEntryWindow';
import { GIVEAWAY_ENABLED } from '@/config/flags';

/**
 * The shop card wraps this in a <Link href="/shop">, so every control here
 * swallows its click instead of letting the card navigate.
 */
function swallow(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

const BTN: React.CSSProperties = {
  color: '#0C0A07',
  border: '1px solid transparent',
  borderRadius: 2,
  padding: '12px 18px',
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: '0.1em',
  whiteSpace: 'nowrap',
};

/**
 * Add-to-cart with confirmation flip: "Add to cart" → "✓ N entries added".
 *
 * SHOP_PRODUCTS have no product page of their own, so for sized products the
 * picker below IS the size picker: nothing can be added until a size is
 * chosen. Products that are not on sale yet show a disabled "Coming soon".
 */
export default function AddToCart({ product, full = false }: { product: ShopProduct; full?: boolean }) {
  const { add } = useCart();
  const entryWindow = useEntryWindow();
  const windowOpen = GIVEAWAY_ENABLED && entryWindow; // the entries confirmation is LIVE only
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState<string | null>(null);

  const sizes = sizesFor(product);
  const needsPick = sizes !== null && size === null;

  // 1 entry per $1 — derived from this item's price, not a per-product count.
  const entries = entriesForSubtotal(product.priceValue);

  function onAdd(e: React.MouseEvent) {
    swallow(e); // don't trigger the parent card link
    if (needsPick) return;
    add({
      slug: product.slug,
      name: product.name,
      price: product.priceValue,
      img: product.img,
      // Unsized products carry no size; checkout records them as ONE_SIZE.
      size: sizes && size ? size : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  if (isComingSoon(product)) {
    return (
      <button
        type="button"
        onClick={swallow}
        disabled
        className={`font-archivo uppercase ${full ? 'w-full' : ''}`}
        style={{
          ...BTN,
          background: 'transparent',
          color: '#B4A88C',
          border: '1px solid rgba(198,161,91,0.25)',
          cursor: 'default',
        }}
      >
        Coming soon
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sizes && (
        <div className="flex gap-1.5" onClick={swallow} role="group" aria-label={`Size — ${product.name}`}>
          {sizes.map((s) => {
            const active = s === size;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={(e) => {
                  swallow(e);
                  setSize(s);
                }}
                className="font-plex uppercase transition-colors flex-1"
                style={{
                  background: active ? '#C6A15B' : 'transparent',
                  color: active ? '#0C0A07' : '#B4A88C',
                  border: `1px solid ${active ? '#C6A15B' : 'rgba(198,161,91,0.25)'}`,
                  borderRadius: 2,
                  padding: '7px 0',
                  fontSize: 11,
                  fontWeight: active ? 700 : 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={onAdd}
        disabled={needsPick}
        className={`font-archivo uppercase transition-colors ${full ? 'w-full' : ''}`}
        style={{
          ...BTN,
          background: added ? '#E6C57E' : '#C6A15B',
          opacity: needsPick ? 0.55 : 1,
          cursor: needsPick ? 'default' : 'pointer',
        }}
      >
        {added
          ? windowOpen ? `\u2713 ${entries} entries added` : '\u2713 Added to cart'
          : needsPick
            ? 'Select size'
            : `Add to cart — ${product.price}`}
      </button>
    </div>
  );
}
