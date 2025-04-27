import products from "@/app/data/dummyProducts";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-16 px-8 bg-zinc-900">
      <h2 className="text-4xl font-bold text-center mb-10">Latest Drops</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <a key={product.id} href={`/product/${product.slug}`} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-zinc-400">{product.tagline}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

<Link href={`/product/${product.slug}`}>
  <img src={product.image} alt={product.name} />
  <h2>{product.name}</h2>
</Link>