"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

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
      <section className="py-12 bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Drops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-zinc-800/50 p-6 rounded-lg animate-pulse">
                <div className="w-full aspect-square bg-zinc-700/50 rounded mb-4"></div>
                <div className="h-6 bg-zinc-700/50 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-zinc-700/50 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Drops</h2>
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
              <p className="text-red-400 mb-2">Failed to load products</p>
              <p className="text-sm text-red-300/70">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 bg-zinc-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Latest Drops</h2>
          <p className="text-zinc-400">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-12 bg-zinc-950 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Drops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 8).map((product) => (
            <Link 
              key={product.slug} 
              href={`/product/${product.slug}`}
              className="block group"
            >
              <div className="bg-zinc-800 p-6 rounded-lg group-hover:scale-105 transition transform">
                <div className="aspect-square relative mb-4 rounded overflow-hidden bg-zinc-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold truncate">{product.name}</h3>
                <p className="text-gray-400">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 