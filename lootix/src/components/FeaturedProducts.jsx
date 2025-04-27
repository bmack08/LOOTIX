"use client";

import { dummyProducts } from "@/data/dummyProducts";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-12 bg-zinc-950 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Drops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`}>
              <div className="bg-zinc-800 p-6 rounded-lg hover:scale-105 transition transform">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-400">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
