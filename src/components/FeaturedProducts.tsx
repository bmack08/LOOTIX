"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { ENTRY_MULTIPLIER } from "@/config/giveaway";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("Fetching products from Printful...");
        const response = await fetch('/api/products');

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('API Response:', errorData || response.statusText);
          throw new Error(
            errorData?.details ||
            errorData?.error ||
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Products received:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-bg-dark">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase text-center mb-8">Latest Drops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-bg-secondary rounded-md animate-pulse overflow-hidden">
                <div className="w-full aspect-square bg-accent-earth/10"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-accent-earth/10 rounded w-3/4"></div>
                  <div className="h-4 bg-accent-earth/10 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-bg-dark">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase text-center mb-8">Latest Drops</h2>
          <div className="max-w-md mx-auto text-center">
            <div className="bg-urgency/10 border border-urgency/30 rounded-md p-4">
              <p className="text-urgency mb-2">Failed to load products</p>
              <p className="text-sm text-urgency/70">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 bg-bg-dark">
        <div className="max-w-container mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase mb-8">Latest Drops</h2>
          <p className="text-text-secondary">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-12 bg-bg-dark">
      <div className="max-w-container mx-auto px-6">
        <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase text-center mb-8">Latest Drops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 8).map((product) => {
            const entries = Math.floor(product.price * ENTRY_MULTIPLIER);
            return (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="block group"
              >
                <div className="product-card">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="badge-entry">{ENTRY_MULTIPLIER}X</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-text-primary truncate mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display font-bold text-cta-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-text-muted">
                        {entries.toLocaleString()} entries
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
