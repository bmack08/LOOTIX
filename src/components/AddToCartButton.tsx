'use client';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  price?: number;
}

// `price` is accepted for API compatibility but no longer used: entries are a
// fixed count per item, not derived from price.
export default function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {

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
      {disabled ? 'SELECT OPTIONS' : 'ADD TO CART'}
    </button>
  );
}
