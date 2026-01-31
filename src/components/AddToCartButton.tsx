'use client';

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
}

export default function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    console.log(`Adding product ${productId} to cart`);
    alert('Coming soon: Add to cart functionality!');
  };

  return (
    <button
      className={`w-full py-3 px-6 rounded-lg transition
        ${disabled 
          ? 'bg-zinc-600 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600'} 
        text-white`}
      onClick={handleAddToCart}
      disabled={disabled}
    >
      {disabled ? 'Select options' : 'Add to Cart'}
    </button>
  );
} 