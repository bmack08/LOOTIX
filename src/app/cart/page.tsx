import Link from 'next/link';

export const metadata = {
  title: 'Your Cart | Lootix',
  description: 'Review your Lootix cart and checkout.',
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="py-12 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase text-center">
            Your <span className="text-cta-primary">Cart</span>
          </h1>
        </div>
      </section>

      {/* Empty Cart State */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>

          <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-text-secondary mb-8">
            Gear up with premium streetwear and earn entries into the current giveaway with every purchase.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              SHOP GEAR
            </Link>
            <Link href="/quick-entries" className="btn-secondary">
              QUICK ENTRIES
            </Link>
          </div>

          {/* Entry Reminder */}
          <div className="mt-12 bg-bg-secondary/50 border border-cta-primary/20 rounded-md p-6">
            <p className="text-text-secondary text-sm">
              Every $1 spent = entries into the current giveaway.{' '}
              <Link href="/how-it-works" className="text-cta-primary hover:underline">
                Learn how it works
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
