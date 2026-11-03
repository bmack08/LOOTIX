'use client';

import { useEffect, useState } from 'react';
import { useWishlist } from '@/lib/wishlist';

/** Wishlist toggle: 34px visible, 44px target. Outline → filled brass. */
export default function Heart({ handle, color, title, className = '' }: { handle: string; color: string; title: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const on = mounted && has(handle);
  return (
    <button
      type="button"
      className={`heart ${className}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${title} from saved` : `Save ${title}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(handle, color, title); }}
    >
      <span className="heart-face" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" strokeLinejoin="round" /></svg>
      </span>
    </button>
  );
}
