import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Lootix',
  description: 'Answers on entries, the free entry method, the random draw, shipping and returns.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const GROUPS: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: 'Giveaways & Entries',
    items: [
      { q: 'How do the giveaways work?', a: 'Each item earns a fixed number of entries into the current giveaway, shown on the item. After the giveaway closes, one winner is drawn at random from all eligible entries. You keep your gear either way.' },
      { q: 'Do I have to buy anything to enter?', a: <>No. No purchase is necessary to enter or win. Free entry is available by email sign-up or by mail-in card — see the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the address and instructions. Every entry, paid or free, has the same chance of being drawn.</> },
      { q: 'How many entries does a free entry get?', a: <>Email sign-up: 25 entries, once per person per giveaway. Mail-in card: 25 entries per card, limit one card per person per day. Details are in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.</> },
      { q: 'How are entry counts decided?', a: 'Each item earns a fixed number of entries, shown on the item. Your total shows at checkout and in your confirmation email.' },
      { q: 'What is the current prize?', a: 'The Lootix Launch Giveaway: $250 cash plus a Lootix hoodie, tee, and slingbag. Approximate retail value $400.' },
    ],
  },
  {
    title: 'The Draw',
    items: [
      { q: 'How is the winner chosen?', a: 'Lootix conducts a random draw using an independent random-number service, across all eligible entries — purchase and free entries pooled together. The draw is recorded and the results are published.' },
      { q: 'When is the draw?', a: <>Each giveaway runs to the close date shown on the <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">Giveaways page</Link> countdown. Entries apply to the giveaway live at the time of your order.</> },
      { q: 'How do I know it is legit?', a: <>The draw is recorded, and results are published on the <Link href="/winners" className="text-brass hover:text-brass-lit transition-colors">Winners page</Link>. The full process is set out in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.</> },
      { q: 'Who can enter?', a: <>Legal residents of the United States who are 18 or older. Void where prohibited. Full eligibility is in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.</> },
    ],
  },
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How does shipping work?', a: 'Gear ships worldwide from the US. Domestic orders ship within 2–4 business days; international timelines vary by region. Free shipping on orders over $75 and on Hero and Legend packs.' },
      { q: 'Can I return or exchange?', a: <>Most gear is made to order, so we can&rsquo;t take returns for change of mind or size. Damaged, defective, or wrong items are replaced or refunded — see <Link href="/returns" className="text-brass hover:text-brass-lit transition-colors">Returns &amp; Refunds</Link>. Entries from cancelled, refunded, or charged-back orders are removed.</> },
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
              Eligibility, the free entry method, prize details, winner selection, and publicity — all of it.
            </span>
          </div>
          <Link href="/official-rules" className="btn-ghost-v2 whitespace-nowrap">Read Official Rules →</Link>
        </div>
      </section>
    </div>
  );
}
