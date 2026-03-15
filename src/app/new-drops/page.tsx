import { getPrintfulProducts } from '@/utils/printful';
import { ENTRY_MULTIPLIER } from '@/config/giveaway';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'New Drops | Lootix',
  description: 'Shop the latest Lootix drops — fresh streetwear that earns giveaway entries.',
};

export default async function NewDropsPage() {
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
            New <span className="text-cta-primary">Drops</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
            The freshest Lootix gear. Every dollar spent = {ENTRY_MULTIPLIER} entries into the current giveaway.
          </p>
          <div className="inline-flex items-center gap-2 bg-cta-primary/10 border border-cta-primary/30 rounded-md px-4 py-2">
            <span className="text-cta-primary font-bold text-sm uppercase">{ENTRY_MULTIPLIER}X Entries Active</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-container mx-auto">
          {products.length > 0 ? (
            <>
              <p className="text-text-muted text-sm mb-8 pb-6 border-b border-accent-earth/20">
                {products.length} new drops
              </p>
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
                          <span className="absolute top-2 left-2 bg-cta-primary text-white text-xs font-bold uppercase px-2 py-1 rounded-sm">
                            NEW
                          </span>
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
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-3">
                Next Drop Loading...
              </h2>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                New designs are in the pipeline. Sign up to get notified when they go live.
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
