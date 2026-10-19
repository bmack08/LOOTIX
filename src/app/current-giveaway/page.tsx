import Image from 'next/image';
import Link from 'next/link';
import { currentGiveaway, ENTRY_MULTIPLIER } from '@/config/giveaway';
import { SWEEPSTAKES_OPEN, COMING_SOON_LABEL } from '@/config/sweepstakes';

/**
 * Legacy route — superseded by /giveaways and permanently redirected there in
 * next.config.js. Kept so the redirect has something to point past, and kept
 * honest so it cannot ship a fabricated giveaway if that redirect is lifted.
 *
 * What used to be here: a ticking countdown to an invented 2026-03-15 close
 * date, a "$5,000" value badge for a gaming PC that does not exist, and an
 * entry calculator badged "60X ACTIVE" while no order earns entries. All of it
 * is gone — the countdown had no published draw date to count to, and the
 * prize came from a config object that described a giveaway that never ran.
 *
 * This no longer needs client hooks: with the countdown removed there is
 * nothing to tick.
 */
export default function CurrentGiveawayPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section with Prize */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Prize Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-secondary border border-accent-earth/20">
              <Image
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"
                alt={currentGiveaway.title}
                fill
                className="object-cover"
                priority
              />
              {/* Value Badge */}
              <div className="badge-value">
                VALUE: ${currentGiveaway.prizeValue.toLocaleString()}
              </div>
            </div>

            {/* Prize Details */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-semibold text-cta-primary uppercase tracking-widest">
                  {SWEEPSTAKES_OPEN ? 'Current Giveaway' : `Launch Giveaway · ${COMING_SOON_LABEL}`}
                </span>
                <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mt-2">
                  {currentGiveaway.title}
                </h1>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed">
                {currentGiveaway.description}
              </p>

              {/* Prize Details List */}
              <div>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2">
                  {currentGiveaway.prizeDetails.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <span className="text-cta-primary font-bold">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status — no countdown. There is no published close date to
                  count to until the sweepstakes opens. */}
              <div className="bg-bg-secondary rounded-md p-4">
                <p className="font-display font-bold text-lg text-text-primary uppercase mb-1">
                  {SWEEPSTAKES_OPEN ? 'Giveaway open' : 'Not open yet'}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {SWEEPSTAKES_OPEN
                    ? 'See the Official Rules for the draw date and the free entry method.'
                    : 'This sweepstakes has not started. There is nothing to enter yet and no entries are being earned. The Official Rules will be posted before it opens.'}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="btn-primary text-center">
                  SHOP THE DROP
                </Link>
                <Link href="/giveaways" className="btn-secondary text-center">
                  SEE THE GIVEAWAY
                </Link>
              </div>

              <Link href="/official-rules" className="text-text-muted text-sm hover:text-text-secondary underline transition-colors">
                View Official Rules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Section */}
      <section className="py-16 px-6 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-center text-text-primary uppercase mb-8">
            How to <span className="text-cta-primary">Enter</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Entry */}
            <div className="bg-bg-primary border border-accent-earth/30 rounded-md p-6">
              <div className="text-sm font-bold text-success uppercase tracking-wider mb-3">Free Entry</div>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3">MAIL-IN METHOD</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                A free mail-in entry method with exactly the same odds will be published in the Official
                Rules before the sweepstakes opens. No purchase will ever be necessary to enter.
              </p>
            </div>

            {/* Purchase Entry */}
            <div className="bg-bg-primary border border-cta-primary/30 rounded-md p-6">
              <div className="text-sm font-bold text-cta-primary uppercase tracking-wider mb-3">Bonus Entries</div>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3">PURCHASE METHOD</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {SWEEPSTAKES_OPEN
                  ? `Every $1 spent on Lootix gear earns you ${ENTRY_MULTIPLIER} entries into the current giveaway.`
                  : 'Once the giveaway opens, every order will carry a flat entry count shown at checkout and in your confirmation email. The sweepstakes has not started, so no order is earning entries and there is no entry total to calculate.'}
              </p>
              {/* The worked example ("$50 purchase = 3,000 entries") and the
                  "60X ACTIVE" badge were removed: they advertised an active
                  entry rate for a sweepstakes that has not started. */}
            </div>
          </div>
        </div>
      </section>

      {/* Be Our First Winner */}
      <section className="py-16 px-6 bg-bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-section-mobile md:text-section text-text-primary uppercase mb-4">
            BE OUR FIRST <span className="text-cta-primary">WINNER</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            No one has won yet. The Launch Vault giveaway is coming soon — the Official Rules go up
            before it opens, and the first name in the Loot Vault is still unclaimed.
          </p>
          <Link href="/shop" className="btn-primary">
            SHOP THE DROP
          </Link>
        </div>
      </section>
    </main>
  );
}
