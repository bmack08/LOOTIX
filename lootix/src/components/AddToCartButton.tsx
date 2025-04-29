'use client';

interface AddToCartButtonProps {
  productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  return (
    <button
      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
      onClick={() => {
        // Add to cart functionality will go here
        alert('Coming soon: Add to cart functionality!');
      }}
    >
      Add to Cart
    </button>
  );
} 