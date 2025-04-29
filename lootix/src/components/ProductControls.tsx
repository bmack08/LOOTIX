'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

interface ProductControlsProps {
  productId: number;
  sizes: string[];
}

export default function ProductControls({ productId, sizes }: ProductControlsProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 10) { // Max 10 items
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div>
        <h3 className="text-sm font-medium mb-3">Select Size</h3>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`border rounded py-2 px-3 text-sm font-medium transition-colors
                ${selectedSize === size 
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                  : 'border-zinc-700 hover:border-blue-500'}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button 
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:border-blue-500 disabled:opacity-50"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">{quantity}</span>
          <button 
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:border-blue-500 disabled:opacity-50"
            onClick={increaseQuantity}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-8">
        <AddToCartButton productId={productId} />
      </div>
    </div>
  );
} 