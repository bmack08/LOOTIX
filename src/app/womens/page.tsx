import { getPrintfulProducts } from '@/utils/printful';
import { ENTRY_MULTIPLIER } from '@/config/giveaway';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Women's Collection | Lootix",
  description: "Shop women's streetwear — tees, hoodies, and more. Every purchase earns giveaway entries.",
};

export default async function WomensPage() {
  let products: Awaited<ReturnType<typeof getPrintfulProducts>> = [];

  try {
    products = await getPrintfulProducts();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-container mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            <span className="text-cta-primary">Women's</span> Collection
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Premium streetwear designed for her. Every dollar spent = {ENTRY_MULTIPLIER} entries.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-container mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-accent-earth/20">
            <p className="text-text-muted text-sm">
              {products.length > 0 ? `${products.length} products` : 'Collection coming soon'}
            </p>
            <div className="inline-flex items-center gap-2 bg-cta-primary/10 border border-cta-primary/30 rounded-md px-3 py-1.5">
              <span className="text-cta-primary font-bold text-sm uppercase">{ENTRY_MULTIPLIER}X Entries Active</span>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const entries = Math.floor(product.price * ENTRY_MULTIPLIER);
                return (
                  <Link key={product.id} href={`/product/${product.slug}`}>
                    <div className="product-card group">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="badge-entry">{ENTRY_MULTIPLIER}X</span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-text-primary mb-2 truncate">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-display font-bold text-cta-primary">${product.price.toFixed(2)}</span>
                          <span className="text-xs text-text-muted">{entries.toLocaleString()} entries</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-3">
                Drops Coming Soon
              </h2>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                Our women's collection is almost ready. Enter the giveaway while you wait.
              </p>
              <Link href="/current-giveaway" className="btn-primary">
                Enter Giveaway — Free
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
