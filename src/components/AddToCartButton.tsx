'use client';

import { ENTRY_MULTIPLIER } from '@/config/giveaway';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  price?: number;
}

export default function AddToCartButton({ productId, disabled, price }: AddToCartButtonProps) {
  const entries = price ? Math.floor(price * ENTRY_MULTIPLIER) : 0;

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
