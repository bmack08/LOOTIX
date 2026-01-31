import Image from 'next/image';

export const metadata = {
  title: 'About Us | Lootix',
  description: 'Learn about Lootix - fantasy-first merch and sweepstakes for D&D players, anime lovers, and gamers who care about aesthetics.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 text-white">
            About <span className="text-primary">LOOTIX</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Fantasy-first merch and sweepstakes built for fans who actually care about quality.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 px-6 bg-dark-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 text-white">
                LOOTIX was born from a simple idea:
              </h2>
              <p className="text-xl text-primary font-semibold mb-4">
                What if fantasy fans could get premium merch and a real shot at insane loot, all in one place?
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Right now, nerd culture is huge… but the merch and giveaways mostly aren't. Shirts feel cheap, designs feel lazy, and "giveaways" are either fake, rigged, or for stuff we don't actually care about.
              </p>
              <p className="text-xl font-bold text-white">
                We're here to fix that.
              </p>
            </div>

            {/* Placeholder Image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden border-2 border-primary/30 shadow-neon-purple">
              <Image
                src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80"
                alt="D&D dice and fantasy gaming setup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-6 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            <strong className="text-white">LOOTIX</strong> is a fantasy-first merch and sweepstakes brand built for D&D players, anime lovers, and gamers who actually care about aesthetics. Every drop is crafted around a theme – dragons, eldritch tomes, arcane academies, cursed loot – and every purchase comes with entries to win big-ticket items you'd actually brag about:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-dark-800/50 border-2 border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all duration-300">
              <div className="text-3xl mb-3">🖥️</div>
              <h3 className="text-xl font-bold text-white mb-2">Custom PCs and consoles</h3>
            </div>
            <div className="bg-dark-800/50 border-2 border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all duration-300">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-xl font-bold text-white mb-2">Full cosplay builds and gear</h3>
            </div>
            <div className="bg-dark-800/50 border-2 border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all duration-300">
              <div className="text-3xl mb-3">🗿</div>
              <h3 className="text-xl font-bold text-white mb-2">Collector-grade statues, dice, and props</h3>
            </div>
            <div className="bg-dark-800/50 border-2 border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all duration-300">
              <div className="text-3xl mb-3">🎲</div>
              <h3 className="text-xl font-bold text-white mb-2">Complete "campaign loadouts" for your table or stream</h3>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 px-6 bg-dark-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-white">
            What We <span className="text-primary">Believe</span>
          </h2>

          <div className="space-y-8">
            <div className="bg-dark-900/50 border-l-4 border-primary rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Merch should feel like loot, not an afterthought.</h3>
              <p className="text-gray-300">Premium fabrics, clean prints, wearable designs. Stuff you'd rock outside a convention.</p>
            </div>

            <div className="bg-dark-900/50 border-l-4 border-primary rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Giveaways should be real.</h3>
              <p className="text-gray-300">Clear rules, real winners, publicly announced. No smoke and mirrors.</p>
            </div>

            <div className="bg-dark-900/50 border-l-4 border-primary rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Fandom is a community.</h3>
              <p className="text-gray-300">We're building more than a store: art drops, stories, and events that make you feel like you're part of a living world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-white">
            How LOOTIX <span className="text-primary">Works</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Themed Drop</h3>
              <p className="text-gray-300 text-sm">We launch a themed drop with limited-run designs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Earn Entries</h3>
              <p className="text-gray-300 text-sm">Every dollar you spend earns entries into the current grand-prize loot pool.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Winner Drawn</h3>
              <p className="text-gray-300 text-sm">After the drop ends, we draw the winner, verify, and share with the community.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Next Chapter</h3>
              <p className="text-gray-300 text-sm">You keep the merch you love, and the next chapter begins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-t from-dark-800 to-dark-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Ready to Join the <span className="text-primary">Adventure</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get premium merch, real giveaways, and be part of a community that gets it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/shop"
              className="px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 text-white shadow-neon-purple"
            >
              Shop Now
            </a>
            <a
              href="/quick-entries"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              Enter Giveaway
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
