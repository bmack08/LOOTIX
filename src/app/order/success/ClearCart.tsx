'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/lootix/v2/CartContext';

/** Payment succeeded: empty the cart once on mount. Renders nothing. */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, [clear]);
  return null;
}
