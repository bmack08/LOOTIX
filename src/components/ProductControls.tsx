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
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Select Size</h3>
        <div className="grid grid-cols-6 gap-2">
          {sizes.map((size) => {
            const variantForSize = variants.find(v => v.size === size);
            const isAvailable = variantForSize?.inStock;
            const isSelected = selectedVariant?.size === size;

            return (
              <button
                key={size}
                disabled={!isAvailable}
                className={`border rounded-sm py-2 px-3 text-sm font-medium transition-all duration-200
                  ${isSelected
                    ? 'border-cta-primary bg-cta-primary/10 text-cta-primary'
                    : 'border-accent-earth/30 hover:border-cta-primary text-text-secondary hover:text-text-primary'}
                  ${!isAvailable && 'opacity-30 cursor-not-allowed bg-bg-dark'}`}
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
          <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Select Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const variantForColor = variants.find(v => v.color === color && v.size === selectedVariant?.size);
              const isAvailable = variantForColor?.inStock;
              const isSelected = selectedVariant?.color === color;

              return (
                <button
                  key={color}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200
                    ${isSelected
                      ? 'bg-cta-primary text-white'
                      : 'bg-bg-secondary border border-accent-earth/30 hover:border-cta-primary text-text-secondary hover:text-text-primary'}
                    ${!isAvailable && 'opacity-30 cursor-not-allowed'}`}
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
        <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            className="w-10 h-10 rounded-sm border border-accent-earth/30 flex items-center justify-center hover:border-cta-primary text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center text-text-primary">{quantity}</span>
          <button
            className="w-10 h-10 rounded-sm border border-accent-earth/30 flex items-center justify-center hover:border-cta-primary text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
            onClick={increaseQuantity}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      {/* Selected Variant Price */}
      {selectedVariant && (
        <div className="text-lg font-display font-bold text-cta-primary">
          ${typeof selectedVariant.price === 'number' ? selectedVariant.price.toFixed(2) : selectedVariant.price}
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="mt-8">
        <AddToCartButton
          productId={productId}
          disabled={!selectedVariant}
          price={selectedVariant?.price}
        />
      </div>

      {/* Stock Status */}
      {selectedVariant && !selectedVariant.inStock && (
        <p className="text-urgency text-sm">This variant is currently out of stock</p>
      )}
    </div>
  );
}
