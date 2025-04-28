import { dummyProducts } from "@/data/dummyProducts";
import Link from "next/link";
import Image from "next/image"; // 🛠️ FIXED: import Image

export async function generateStaticParams() {
  return dummyProducts.map((product) => ({
    slug: product.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = dummyProducts.find((p) => p.slug === resolvedParams.slug);

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
