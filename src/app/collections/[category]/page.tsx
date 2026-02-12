import { dummyProducts } from "@/data/dummyProducts";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ENTRY_MULTIPLIER } from "@/config/giveaway";

import type { PageProps } from "../../../.next/types/app/collections/[category]/page";

export async function generateStaticParams() {
  const categories = ["streetwear", "premium", "essentials", "accessories"];
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.category} Collection | Lootix`,
  };
}

export default function CollectionPage({ params }: PageProps) {
  const { category } = params;
  const filteredProducts = dummyProducts.filter(
    (product) => product.category === category
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary p-8">
      <div className="max-w-container mx-auto">
        <h1 className="font-display font-bold text-hero-mobile md:text-hero uppercase text-center mb-10">
          <span className="text-cta-primary">{category}</span> Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`}>
              <div className="product-card group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="badge-entry">{ENTRY_MULTIPLIER}X</span>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-text-primary truncate">{product.name}</h2>
                  <p className="text-cta-primary font-display font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
