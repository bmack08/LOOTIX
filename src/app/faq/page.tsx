import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Lootix',
  description: 'Answers on entries, the free entry method, the independent draw, shipping and returns.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const GROUPS: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: 'Giveaways & Entries',
    items: [
      { q: 'How do the giveaways work?', a: 'Every order earns a flat number of entries into the current giveaway — the count is printed on each product card. When the draw closes, an independent third party selects one winner, live on stream. You keep your gear either way.' },
      { q: 'Do I have to buy anything to enter?', a: <>No. There is always a free mail-in entry method with exactly the same odds as a purchase entry — see the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the address and instructions. No purchase is necessary to enter or win, and buying does not increase your chances.</> },
      { q: 'How are entry counts decided?', a: 'One flat number per item, printed on the card — no multipliers, no math. Bigger items and bundles carry more entries. Your total shows at checkout and in your confirmation email.' },
      { q: 'What is the current prize?', a: 'The Launch Vault: $250 cash plus a full Lootix merch bundle — the winner picks from Drop 001. Future vaults unlock after the current one pays out.' },
    ],
  },
  {
    title: 'The Draw',
    items: [
      { q: 'How is the winner chosen?', a: 'By an independent third-party administrator using a random draw across all eligible entries — purchase and free entries pooled together. We never touch the draw.' },
      { q: 'When is the draw?', a: <>Each giveaway runs to the close date shown on the <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">Giveaways page</Link> countdown. Entries apply to the giveaway live at the time of your order.</> },
      { q: 'How do I know it is legit?', a: <>Every draw is streamed live, archived publicly, and every winner is named on the <Link href="/winners" className="text-brass hover:text-brass-lit transition-colors">Winners page</Link> with proof of payout. The full process is committed in writing before the first draw.</> },
      { q: 'Who can enter?', a: <>Legal residents 18+ (or the age of majority in your area), void where prohibited. Full eligibility is in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.</> },
    ],
  },
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How does shipping work?', a: 'Gear ships worldwide from the US. Domestic orders ship within 2–4 business days; international timelines vary by region. Free shipping on orders over $75 and on Hero and Legend packs.' },
      { q: 'Can I return or exchange?', a: 'Unworn gear can be returned or exchanged within 30 days. Entries earned from a refunded order are voided per the Official Rules.' },
      { q: 'Is checkout secure?', a: 'Yes — payments run through Stripe. We never see or store your card details.' },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header className="text-center" style={{ padding: '88px 24px 56px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 720 }}>
          <span className="v2-eyebrow">Support</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Frequently asked</h1>
          <p className="m-0 text-sand" style={{ maxWidth: 580, fontSize: 16.5, lineHeight: 1.65 }}>
            Everything on entries, the free method, the draw, shipping and returns. Still stuck? Email{' '}
            <a href="mailto:hello@getlootix.com" className="text-brass hover:text-brass-lit transition-colors">hello@getlootix.com</a> — we answer within one business day.
          </p>
        </div>
      </header>

      {/* ACCORDION GROUPS */}
      <section style={{ padding: '72px 24px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-14 mx-auto" style={{ maxWidth: 880 }}>
          {GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col gap-4">
              <h2 className="font-plex uppercase text-brass m-0" style={{ fontSize: 12, letterSpacing: '0.18em' }}>{g.title}</h2>
              <div className="flex flex-col gap-3">
                {g.items.map((f) => (
                  <details key={f.q} className="group" style={{ background: '#131009', border: HAIR, borderRadius: 4 }}>
                    <summary
                      className="flex items-center justify-between gap-4 cursor-pointer list-none text-parchment"
                      style={{ padding: '20px 24px', fontSize: 16, fontWeight: 700 }}
                    >
                      {f.q}
                      <span className="text-brass flex-none transition-transform group-open:rotate-45" style={{ fontSize: 20, lineHeight: 1 }}>+</span>
                    </summary>
                    <p className="m-0 text-sand" style={{ padding: '0 24px 22px', fontSize: 14.5, lineHeight: 1.7, maxWidth: 720 }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICIAL RULES CROSS-LINK */}
      <section style={{ padding: '64px 24px' }}>
        <div
          className="flex items-center justify-between gap-8 flex-wrap mx-auto"
          style={{ maxWidth: 880, border: '1px solid rgba(198,161,91,0.35)', borderRadius: 4, background: '#131009', padding: '32px 36px' }}
        >
          <div className="flex flex-col gap-2">
            <span className="uppercase text-parchment" style={{ fontSize: 20, fontWeight: 800 }}>The full legal terms</span>
            <span className="text-stone" style={{ fontSize: 13.5, lineHeight: 1.6, maxWidth: 520 }}>
              Eligibility, the free entry method with equal odds, prize details, winner selection, and publicity — all of it.
            </span>
          </div>
          <Link href="/official-rules" className="btn-ghost-v2 whitespace-nowrap">Read Official Rules →</Link>
        </div>
      </section>
    </div>
  );
}
