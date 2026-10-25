import Link from 'next/link';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { isEntryWindowOpen } from '@/lib/site';

// isEntryWindowOpen() is wall-clock dependent, so this page must not be
// frozen at build time: revalidate so the window state refreshes on its own.
export const revalidate = 60;

export const metadata = {
  title: 'Past Winners | Lootix',
  description: 'See past Lootix giveaway winners. The Lootix Launch Giveaway has not been drawn yet. The winner will be listed here after the drawing and verification.',
};

export default function PastWinnersPage() {
  // LIVE = entries open. Anything else is PRE-START copy (Legal ruling 2026-10-23):
  // no prize amounts or value, no "win"/"enter" language, until the start date.
  const live = isEntryWindowOpen();
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
            The Lootix Launch Giveaway has not been drawn yet. The winner will be listed here after the drawing and verification.
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
            {live
              ? 'The Lootix Launch Giveaway is open now. Once it has been drawn and the winner verified, we will list the winner here.'
              : 'No one has won yet. The Lootix Launch Giveaway has not been drawn. The winner will be listed here after the drawing and verification.'}
          </p>
          <p className="text-text-muted text-sm mb-8">
            We list the winner&apos;s first name and last initial. A full name, city, photo or video is shown only if the winner signs our publicity release.
          </p>

          {/* What winners get - prize details only once the giveaway has started (LIVE). */}
          {live && (
            <div className="bg-bg-secondary/50 border border-accent-earth/20 rounded-lg p-8 mb-10 text-left max-w-lg mx-auto">
              <h3 className="font-display font-bold text-lg text-text-primary uppercase mb-4 text-center">
                When You Win, You Get:
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Your prize: $250 cash by PayPal, plus your custom Lootix hoodie and tee shipped to you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cta-primary font-bold mt-0.5">+</span>
                  <span>Lifetime bragging rights</span>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/giveaways" className="btn-primary">
              {live ? 'ENTER CURRENT GIVEAWAY' : 'SEE THE GIVEAWAY'}
            </Link>
            <Link href="/official-rules" className="btn-secondary">
              VIEW OFFICIAL RULES
            </Link>
          </div>
          {live && (
            <NoPurchaseNotice className="text-text-muted text-xs mt-4 max-w-md mx-auto" />
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">{live ? 'FREE' : 'Soon'}</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">{live ? 'Entry Available' : 'Join the list'}</p>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-cta-primary">Opt-in</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Photos &amp; Full Names</p>
            </div>
            <div>
              {/* After the first prize is actually delivered, Legal: "Real" / "Prizes Delivered". */}
              <p className="font-display font-bold text-3xl text-cta-primary">RANDOM.ORG</p>
              <p className="text-text-muted text-sm uppercase tracking-wider">Screen-Recorded Draw</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}