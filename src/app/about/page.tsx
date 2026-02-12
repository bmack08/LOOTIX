import Image from 'next/image';

export const metadata = {
  title: 'About Us | Lootix',
  description: 'Learn about Lootix - premium streetwear and epic gaming giveaways for those who game hard and live bold.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-bg-dark via-bg-primary to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-text-primary uppercase">
            About <span className="text-cta-primary">LOOTIX</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
            Premium streetwear and epic giveaways built for gamers who live bold.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 px-6 bg-bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 text-text-primary uppercase">
                LOOTIX was born from a simple idea:
              </h2>
              <p className="text-xl text-cta-primary font-semibold mb-4">
                What if gamers could get premium gear and a real shot at epic prizes, all in one place?
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                Gaming culture is massive, but the merch options are mostly uninspiring. Cheap shirts with lazy prints, giveaways that feel fake, and gear you wouldn't actually wear outside. We knew there had to be a better way.
              </p>
              <p className="text-xl font-bold text-text-primary">
                We're here to fix that.
              </p>
            </div>

            {/* Placeholder Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-accent-earth/30">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
                alt="Mountain trail adventure with outdoor gear"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-6 bg-bg-primary">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            <strong className="text-text-primary">LOOTIX</strong> is a giveaway-driven streetwear brand for gamers, anime fans, and collectors who reject the sedentary stereotype. Every drop features premium designs you'd wear on a mountain trail or at a LAN party, and every purchase earns entries to win prizes you'd actually brag about:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-bg-secondary/50 border border-accent-earth/30 rounded-md p-6 hover:border-accent-earth transition-all duration-300">
              <div className="text-3xl mb-3">🖥</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Custom gaming PC builds</h3>
              <p className="text-text-secondary text-sm">High-performance rigs built with the latest components.</p>
            </div>
            <div className="bg-bg-secondary/50 border border-accent-earth/30 rounded-md p-6 hover:border-accent-earth transition-all duration-300">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Consoles and peripherals</h3>
              <p className="text-text-secondary text-sm">The gear you need to game at the highest level.</p>
            </div>
            <div className="bg-bg-secondary/50 border border-accent-earth/30 rounded-md p-6 hover:border-accent-earth transition-all duration-300">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Gift card bundles</h3>
              <p className="text-text-secondary text-sm">Steam, PlayStation, Xbox, and more — choose your platform.</p>
            </div>
            <div className="bg-bg-secondary/50 border border-accent-earth/30 rounded-md p-6 hover:border-accent-earth transition-all duration-300">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Collector-grade items</h3>
              <p className="text-text-secondary text-sm">Limited editions, figures, and memorabilia worth showing off.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 px-6 bg-bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-text-primary uppercase">
            What We <span className="text-cta-primary">Believe</span>
          </h2>

          <div className="space-y-8">
            <div className="bg-bg-primary/50 border-l-4 border-cta-primary rounded-md p-6">
              <h3 className="text-2xl font-bold text-text-primary mb-3">Merch should feel like loot, not an afterthought.</h3>
              <p className="text-text-secondary">Premium fabrics, clean prints, wearable designs. Stuff you'd rock on a hike, at a convention, or just on a Tuesday.</p>
            </div>

            <div className="bg-bg-primary/50 border-l-4 border-cta-primary rounded-md p-6">
              <h3 className="text-2xl font-bold text-text-primary mb-3">Giveaways should be real.</h3>
              <p className="text-text-secondary">Clear rules, real winners, publicly announced. No smoke and mirrors. Free entry available on every giveaway.</p>
            </div>

            <div className="bg-bg-primary/50 border-l-4 border-cta-primary rounded-md p-6">
              <h3 className="text-2xl font-bold text-text-primary mb-3">Gaming is a lifestyle, not a label.</h3>
              <p className="text-text-secondary">We're building a brand for people who game hard and live bold. Whether you're summiting a peak or climbing the ranked ladder, Lootix fits your life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-bg-primary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-text-primary uppercase">
            How LOOTIX <span className="text-cta-primary">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-2xl font-bold text-cta-primary mx-auto mb-4 font-display">
                1
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-display uppercase">Browse</h3>
              <p className="text-text-secondary text-sm">Shop premium streetwear or enter giveaways for free via mail-in entry.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-2xl font-bold text-cta-primary mx-auto mb-4 font-display">
                2
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-display uppercase">Earn Entries</h3>
              <p className="text-text-secondary text-sm">Every dollar you spend earns multiplied entries into the current giveaway. $1 = 60 entries during promotional events.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-2xl font-bold text-cta-primary mx-auto mb-4 font-display">
                3
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3 font-display uppercase">Win</h3>
              <p className="text-text-secondary text-sm">Winners are drawn, verified, and announced publicly. You keep your gear and your shot at epic prizes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-bg-secondary to-bg-primary text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-text-primary uppercase">
            Ready to <span className="text-cta-primary">Gear Up</span>?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Premium streetwear, real giveaways, and a community that gets it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/shop"
              className="btn-primary"
            >
              Shop Now
            </a>
            <a
              href="/quick-entries"
              className="btn-secondary"
            >
              Enter Giveaway
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
