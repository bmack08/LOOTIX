import Link from 'next/link';

export const metadata = {
  title: 'Past Winners | Lootix',
  description: 'See past Lootix giveaway winners. Real people, real prizes, publicly verified.',
};

export default function PastWinnersPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            Past <span className="text-cta-primary">Winners</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Real people. Real prizes. Publicly verified.
          </p>
        </div>
      </section>

      {/* Coming Soon State */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-cta-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary uppercase mb-4">
            Our First Winner is <span className="text-cta-primary">Coming Soon</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            We're running our inaugural giveaway right now. Once the drawing is complete, our first winner will be announced here with their name, prize, and photo.
          </p>
          <p className="text-text-muted text-sm mb-8">
            Every winner is verified, publicly announced, and celebrated. No fake winners, no staged photos — real people winning real prizes.
          </p>

          {/* What winners get */}
          <div className="bg-bg-secondary/50 border border-accent-earth/20 rounded-lg p-8 mb-10 text-left max-w-lg mx-auto">
            <h3 className="font-display font-bold text-lg text-text-primary uppercase mb-4 text-center">
              When You Win, You Get:
            </h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-cta-primary font-bold mt-0.5">+</span>
                <span>Your prize shipped directly to your door</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cta-primary font-bold mt-0.5">+</span>
                <span>Featured on our website and social media</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cta-primary font-bold mt-0.5">+</span>
                <span>Exclusive Lootix Winner merch</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cta-primary font-bold mt-0.5">+</span>
                <span>Lifetime bragging rights</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/current-giveaway" className="btn-primary">
              ENTER CURRENT GIVEAWAY
            </Link>
            <Link href="/official-rules" className="btn-secondary">
              VIEW OFFICIAL RULES
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">100%</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Verified Winners</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">FREE</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Entry Available</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">Public</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Announcements</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">Real</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Prizes Shipped</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
