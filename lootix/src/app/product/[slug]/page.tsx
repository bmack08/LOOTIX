import { getPrintfulProductById } from "@/utils/printful";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductControls from "@/components/ProductControls";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const product = await getPrintfulProductById(params.slug);

  if (!product) {
    return { title: "Product Not Found | Lootix" };
  }

  return {
    title: `${product.name} | Lootix`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getPrintfulProductById(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition">
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            {/* Additional product images */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-zinc-900">
                    <Image
                      src={img.preview_url}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)} {product.currency}</p>
            </div>

            <ProductControls productId={product.id} variants={product.variants} />

            {/* Product Description */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-sm font-medium mb-3">Description</h3>
              <div className="prose prose-invert">
                <p className="text-zinc-300">{product.description}</p>
              </div>
            </div>

            {/* Product Features */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-sm font-medium mb-3">Product Features</h3>
              <ul className="list-disc pl-4 space-y-2 text-zinc-300">
                <li>Premium quality materials</li>
                <li>Made in the USA</li>
                <li>Fast shipping</li>
                <li>100% satisfaction guaranteed</li>
              </ul>
            </div>

            {/* Discontinued Notice */}
            {product.isDiscontinued && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-400">This product has been discontinued and may not be available for purchase.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
