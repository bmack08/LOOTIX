import { getPrintfulProductById } from "@/utils/printful";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  // Note: In a real implementation, you might want to fetch all product IDs from Printful
  // For now, we'll return an empty array and handle dynamic routes
  return [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  console.log('Rendering product page for slug:', params.slug);
  const product = await getPrintfulProductById(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg w-full h-auto object-cover"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-300 mb-6">{product.description}</p>
            <p className="text-3xl font-semibold mb-8">${product.price.toFixed(2)}</p>

            <button
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={() => {
                // Add to cart functionality will go here
                alert('Coming soon: Add to cart functionality!');
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
