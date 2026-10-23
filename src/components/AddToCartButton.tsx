'use client';

import { ENTRIES_LABEL, entriesForSubtotal } from '@/config/giveaway';
import { useEntryWindow } from '@/components/lootix/useEntryWindow';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  price?: number;
}

export default function AddToCartButton({ productId, disabled, price }: AddToCartButtonProps) {
  const windowOpen = useEntryWindow(); // per-dollar cue is LIVE only
  const entries = price && windowOpen ? entriesForSubtotal(price) : 0;

  const handleAddToCart = () => {
    console.log(`Adding product ${productId} to cart`);
    alert('Coming soon: Add to cart functionality!');
  };

  return (
    <button
      className={`btn-primary w-full justify-center ${
        disabled ? '!bg-accent-stone !cursor-not-allowed !opacity-60' : ''
      }`}
      onClick={handleAddToCart}
      disabled={disabled}
    >
      {disabled
        ? 'SELECT OPTIONS'
        : entries > 0
          ? `ADD TO CART — EARN ${entries.toLocaleString()} ENTRIES`
          : 'ADD TO CART'}
    </button>
  );
}
