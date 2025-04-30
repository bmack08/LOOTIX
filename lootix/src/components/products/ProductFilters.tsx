'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'fantasy', name: 'Fantasy Collection' },
  { id: 'luxe', name: 'Luxe Edition' },
  { id: 'youth', name: 'Youth Series' },
  { id: 'accessories', name: 'Accessories' },
];

const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'under-50', name: 'Under $50' },
  { id: '50-100', name: '$50 - $100' },
  { id: 'over-100', name: 'Over $100' },
];

export default function ProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="heading-3 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-radio text-lootix-gold"
              />
              <span className="body-text">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="heading-3 mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="priceRange"
                value={range.id}
                checked={selectedPriceRange === range.id}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="form-radio text-lootix-gold"
              />
              <span className="body-text">{range.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h3 className="heading-3 mb-4">Availability</h3>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="form-checkbox text-lootix-gold"
          />
          <span className="body-text">In Stock Only</span>
        </label>
      </div>

      {/* Apply Filters Button */}
      <button className="btn btn-primary w-full">
        Apply Filters
      </button>
    </div>
  );
} 