import { getPrintfulProductById } from "@/utils/printful";
import { ENTRY_MULTIPLIER, calculateEntries, formatEntries } from "@/config/giveaway";
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
    description: product.description || `Shop ${product.name} and earn giveaway entries with your purchase.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getPrintfulProductById(params.slug);

  if (!product) {
    notFound();
  }

  const entries = calculateEntries(product.price);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors">
            Home
          </Link>
          <span className="text-text-muted">/</span>
          <Link href="/shop" className="text-text-muted hover:text-text-primary transition-colors">
            Shop
          </Link>
          <span className="text-text-muted">/</span>
          <span className="text-text-secondary truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {/* Product Image Section — 60% on desktop */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-md bg-bg-secondary border border-accent-earth/20">
              <Image
                src={product.image}
                alt={`${product.name} - Main product image`}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-300"
                priority
              />
              {/* Entry Badge */}
              <span className="badge-entry">{ENTRY_MULTIPLIER}X ENTRIES</span>
            </div>
            {/* Additional product images */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden rounded-md bg-bg-secondary border border-accent-earth/20 hover:border-accent-earth transition-colors cursor-pointer">
                    <Image
                      src={img.preview_url}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section — 40% on desktop */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
              LOOTIX GEAR
            </p>

            {/* Title */}
            <h1 className="text-3xl font-display font-bold text-text-primary uppercase">{product.name}</h1>

            {/* Price Row */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-display font-bold text-cta-primary">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(String(product.price)).toFixed(2)}
              </span>
              <span className="text-sm text-text-muted">
                {product.currency}
              </span>
            </div>

            {/* Entry Calculator */}
            <div className="entry-calculator">
              <p className="entry-calculator-text">
                This purchase = {formatEntries(entries)} entries
              </p>
              <span className="inline-block mt-2 bg-cta-primary text-white text-xs font-bold uppercase px-2 py-1 rounded-sm tracking-wider">
                {ENTRY_MULTIPLIER}X ACTIVE
              </span>
            </div>

            {/* Variant Controls */}
            <ProductControls productId={product.id} variants={product.variants} />

            {/* Product Description */}
            {product.description && (
              <div className="pt-6 border-t border-accent-earth/20">
                <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Description</h3>
                <p className="text-text-secondary leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Features */}
            <div className="pt-6 border-t border-accent-earth/20">
              <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">Product Features</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-accent-forest">✓</span> Premium quality materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-forest">✓</span> Made in the USA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-forest">✓</span> Fast shipping
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent-forest">✓</span> 100% satisfaction guaranteed
                </li>
              </ul>
            </div>

            {/* Discontinued Notice */}
            {product.isDiscontinued && (
              <div className="mt-4 p-4 bg-urgency/10 border border-urgency/30 rounded-md">
                <p className="text-urgency">This product has been discontinued and may not be available for purchase.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
