'use client';

import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { ProductVariant } from '@/types';

interface ProductControlsProps {
  productId: number;
  variants: ProductVariant[];
}

export default function ProductControls({ productId, variants }: ProductControlsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Get unique sizes from variants
  const sizes = Array.from(new Set(variants.map(v => v.size))).sort();
  
  // Get unique colors from variants
  const colors = Array.from(new Set(variants.map(v => v.color))).sort();

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
        <h3 className="text-sm font-medium text-zinc-900 mb-3">Select Size</h3>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => {
            const variantForSize = variants.find(v => v.size === size);
            const isAvailable = variantForSize?.inStock;
            
            return (
              <button
                key={size}
                disabled={!isAvailable}
                className={`border rounded py-2 px-3 text-sm font-medium transition-colors
                  ${selectedVariant?.size === size 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-200 hover:border-blue-600 text-zinc-900'}
                  ${!isAvailable && 'opacity-50 cursor-not-allowed bg-gray-50'}`}
                onClick={() => {
                  const variant = variants.find(v => v.size === size);
                  if (variant) setSelectedVariant(variant);
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selector (if there are multiple colors) */}
      {colors.length > 1 && (
        <div>
          <h3 className="text-sm font-medium text-zinc-900 mb-3">Select Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const variantForColor = variants.find(v => v.color === color && v.size === selectedVariant?.size);
              const isAvailable = variantForColor?.inStock;

              return (
                <button
                  key={color}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors
                    ${selectedVariant?.color === color 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-zinc-900'}
                    ${!isAvailable && 'opacity-50 cursor-not-allowed'}`}
                  onClick={() => {
                    const variant = variants.find(v => v.color === color && v.size === selectedVariant?.size);
                    if (variant) setSelectedVariant(variant);
                  }}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium text-zinc-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button 
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-600 disabled:opacity-50 text-zinc-900"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center text-zinc-900">{quantity}</span>
          <button 
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-600 disabled:opacity-50 text-zinc-900"
            onClick={increaseQuantity}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Selected Variant Price */}
      {selectedVariant && (
        <div className="text-lg font-semibold text-zinc-900">
          Price: ${typeof selectedVariant.price === 'number' ? selectedVariant.price.toFixed(2) : selectedVariant.price}
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="mt-8">
        <AddToCartButton 
          productId={productId} 
          disabled={!selectedVariant} 
        />
      </div>

      {/* Stock Status */}
      {selectedVariant && !selectedVariant.inStock && (
        <p className="text-red-600 text-sm">This variant is currently out of stock</p>
      )}
    </div>
  );
} 