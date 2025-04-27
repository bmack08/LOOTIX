import { dummyProducts } from "@/data/dummyProducts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";  // Optional for SEO

type Props = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  const categories = ["fantasy", "luxe", "youth", "accessories"];
  return categories.map((category) => ({
    category,
  }));
}

// Optional SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.category} Collection | Lootix`,
  };
}

// REAL FIX RIGHT HERE ↓↓↓
export default function CollectionPage({ params }: Props) {
  const { category } = params;
  const filteredProducts = dummyProducts.filter(
    (product) => product.category === category
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 capitalize text-center">
        {category} Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.slug} href={`/product/${product.slug}`}>
            <div className="bg-zinc-800 p-4 rounded-lg hover:scale-105 transition">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-400">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
