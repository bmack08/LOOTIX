'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement Printful checkout
      console.log('Adding to cart:', {
        productId: product.id,
        size: selectedSize,
        quantity,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="btn btn-outline w-10 h-10"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center bg-surface border border-lootix-silver/20 rounded-md"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="btn btn-outline w-10 h-10"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="btn btn-primary w-full py-6 text-lg font-bold"
      >
        {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>

      {/* Additional Options */}
      <div className="flex items-center justify-between text-sm text-lootix-silver">
        <button className="hover:text-lootix-gold">Add to Wishlist</button>
        <button className="hover:text-lootix-gold">Share</button>
      </div>
    </div>
  );
} 