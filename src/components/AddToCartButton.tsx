'use client';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  price?: number;
}

// Makes no entry claim: one completed order earns one entry regardless of what
// is in the cart, so a per-item "earn N entries" label would be false.
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
