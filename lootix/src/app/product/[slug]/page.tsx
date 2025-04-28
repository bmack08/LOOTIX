import { getPrintfulProductById } from "@/utils/printful";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  // Note: In a real implementation, you might want to fetch all product IDs from Printful
  // For now, we'll return an empty array and handle dynamic routes
  return [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getPrintfulProductById(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <Link href="/" className="mt-4 inline-block text-blue-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="rounded-lg mb-6 w-full h-auto object-cover"
        />
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-2xl font-semibold mb-6">${product.price}</p>

        <Link
          href="#"
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
        >
          Buy Now
        </Link>
      </div>
    </main>
  );
}
