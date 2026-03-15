import Link from 'next/link';
import { ENTRY_MULTIPLIER, calculateEntries, formatEntries } from '@/config/giveaway';

export const metadata = {
  title: 'How It Works | Lootix',
  description: 'Learn how Lootix giveaways work — browse gear, earn entries, win epic prizes. Free entry always available.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            How <span className="text-cta-primary">Lootix</span> Works
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Shop premium streetwear, earn entries, win epic prizes. It's that simple.
          </p>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-3xl font-bold text-cta-primary mx-auto mb-6 font-display">
                1
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">Browse</h2>
              <p className="text-text-secondary leading-relaxed">
                Shop our premium streetwear collection — tees, hoodies, accessories, and more. Every piece is designed with gamers and collectors in mind. Or skip straight to Quick Entry packs if you just want a shot at the prize.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-3xl font-bold text-cta-primary mx-auto mb-6 font-display">
                2
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">Earn Entries</h2>
              <p className="text-text-secondary leading-relaxed">
                Every $1 you spend earns entries into the current giveaway. During {ENTRY_MULTIPLIER}X events, that's {ENTRY_MULTIPLIER} entries per dollar. A $50 order = {formatEntries(calculateEntries(50))} entries. Free entry is always available via mail-in.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-cta-primary/20 border-2 border-cta-primary rounded-full flex items-center justify-center text-3xl font-bold text-cta-primary mx-auto mb-6 font-display">
                3
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">Win</h2>
              <p className="text-text-secondary leading-relaxed">
                Winners are selected by random drawing at the end of each giveaway period. We verify the winner, ship the prize, and announce it publicly. Real prizes, real winners, no BS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Methods */}
      <section className="py-16 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-12">
            Two Ways to <span className="text-cta-primary">Enter</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Purchase Entry */}
            <div className="bg-bg-primary border-2 border-cta-primary/30 rounded-lg p-8">
              <div className="text-sm font-bold text-cta-primary uppercase tracking-wider mb-3">Purchase Entry</div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-4">BUY GEAR, EARN ENTRIES</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Every $1 spent = {ENTRY_MULTIPLIER} entries during active multiplier events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Entries are calculated automatically at checkout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Membership tiers unlock bonus multipliers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Quick Entry packs available for pure giveaway entries</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/shop" className="btn-primary w-full text-center block">
                  SHOP NOW
                </Link>
              </div>
            </div>

            {/* Free Entry */}
            <div className="bg-bg-primary border border-accent-earth/30 rounded-lg p-8">
              <div className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">Free Entry</div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-4">MAIL-IN METHOD</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-0.5">1</span>
                  <span>Get a 3" x 5" postcard or index card</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-0.5">2</span>
                  <span>Write your full name, email, mailing address, date of birth, and "LOOTIX SWEEPSTAKES ENTRY"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-0.5">3</span>
                  <span>Mail to the address listed in the Official Rules</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-0.5">4</span>
                  <span>One free entry per envelope. Must be postmarked before the giveaway end date.</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/official-rules" className="btn-secondary w-full text-center block">
                  READ OFFICIAL RULES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Calculator */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-8">
            Entry <span className="text-cta-primary">Calculator</span>
          </h2>
          <div className="bg-bg-secondary/50 border border-accent-earth/20 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[10, 25, 50, 100].map((amount) => (
                <div key={amount} className="bg-bg-primary rounded-md p-4 border border-accent-earth/20">
                  <p className="text-text-muted text-sm mb-1">Spend ${amount}</p>
                  <p className="font-display font-bold text-2xl text-cta-primary">
                    {formatEntries(calculateEntries(amount))}
                  </p>
                  <p className="text-text-muted text-xs">entries</p>
                </div>
              ))}
            </div>
            <p className="text-center text-text-muted text-sm mt-6">
              During {ENTRY_MULTIPLIER}X multiplier events. Standard rate is 1 entry per $1.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-bg-secondary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary uppercase mb-4">
            Ready to <span className="text-cta-primary">Enter</span>?
          </h2>
          <p className="text-text-secondary mb-8">
            Check out the current giveaway and start earning entries today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/current-giveaway" className="btn-primary">
              CURRENT GIVEAWAY
            </Link>
            <Link href="/quick-entries" className="btn-secondary">
              QUICK ENTRIES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
