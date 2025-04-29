'use client';

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    console.log(`Adding product ${productId} to cart`);
    alert('Coming soon: Add to cart functionality!');
  };

  return (
    <button
      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
} 