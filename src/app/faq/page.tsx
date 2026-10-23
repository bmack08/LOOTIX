import type { Metadata } from 'next';
import Link from 'next/link';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { ENTRIES_LABEL, MAIL_IN_ENTRIES, SIGNUP_ENTRIES, FREE_SHIPPING_THRESHOLD, ODDS_LONG_MD, ODDS_SHORT, GIVEAWAY_CLOSE_TIME_LABEL } from '@/config/giveaway';

export const metadata: Metadata = {
  title: 'FAQ — Lootix',
  description: 'Answers on entries, the free entry method, the RANDOM.ORG draw, shipping and returns.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const GROUPS: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: 'Giveaways & Entries',
    items: [
      { q: 'How do the giveaways work?', a: <>You earn <strong className="text-parchment">{ENTRIES_LABEL}</strong> — every dollar of your order subtotal is one entry into the current giveaway. A $129.99 order earns 129 entries. You keep your gear either way, and free entry is always available by mail (see the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>).</> },
      { q: 'Do I have to buy anything to enter?', a: <>No. Free entry is available by mail — {MAIL_IN_ENTRIES} entries per hand-printed card, one card per envelope, with no limit on envelopes. See the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the address and instructions. {ODDS_SHORT}</> },
      { q: 'How are entry counts decided?', a: <>{ENTRIES_LABEL}, counted from your order subtotal after discounts and before tax and shipping, then rounded down. A free mail-in card is worth {MAIL_IN_ENTRIES} entries, and the one-time online sign-up is worth {SIGNUP_ENTRIES}. Your purchase total shows at checkout and in your confirmation email.</> },
      { q: 'Does spending more improve my odds?', a: <>The free mail-in method is worth {MAIL_IN_ENTRIES} entries per card with no limit on how many cards you mail, so you can build entries without spending anything. <NoPurchaseNotice as="span" line={ODDS_LONG_MD} /></> },
      { q: 'What is the current prize?', a: 'The Lootix Launch Giveaway: $250 cash plus a custom Lootix hoodie and a custom Lootix tee. Item values and the total are still being finalized. Cash is paid by PayPal. Future giveaways unlock after the current one pays out.' },
      { q: 'What happens to my entries if I get a refund?', a: 'A refund or a chargeback voids that order’s entries. A size exchange keeps them — you still bought the gear.' },
    ],
  },
  {
    title: 'The Draw',
    items: [
      { q: 'How is the winner chosen?', a: 'Winner is selected at random using RANDOM.ORG; the draw is screen-recorded and posted.' },
      { q: 'When is the draw?', a: <>Each giveaway runs to the close date shown on the <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">Giveaways page</Link>, at {GIVEAWAY_CLOSE_TIME_LABEL}. Entries apply to the giveaway running at the time of your order — nothing is entered before the start or after the close.</> },
      { q: 'How do I know the draw is fair?', a: <>Every draw is screen-recorded and posted along with the RANDOM.ORG result link, and each winner is listed on the <Link href="/winners" className="text-brass hover:text-brass-lit transition-colors">Winners page</Link> after verification (with permission; otherwise first name, last initial and state). The full process is committed in writing in the Official Rules before the first draw.</> },
      { q: 'Who can enter?', a: <>Legal residents of the 50 United States and D.C. who are at least 18 (19 in AL and NE; 21 in MS) at the time of entry, void where prohibited or restricted by law. Full eligibility is in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.</> },
    ],
  },
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How does shipping work?', a: `We ship to the United States only. Orders ship within 2–4 business days, and US shipping is free on orders of $${FREE_SHIPPING_THRESHOLD} or more. Entries are earned only on orders shipped to eligible U.S. addresses.` },
      { q: 'Can I return an item?', a: <>Made-to-order gear cannot be returned for change of mind. If an item arrives damaged, defective, or wrong, email hello@getlootix.com within 14 days of delivery for a replacement or refund; see the <Link href="/returns" className="text-brass hover:text-brass-lit transition-colors">Returns</Link> page. A refund voids the entries from that order, per the Official Rules.</> },
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
            Everything on entries, the free mail-in method, the RANDOM.ORG draw, shipping and returns. Still stuck? Email{' '}
            <a href="mailto:hello@getlootix.com" className="text-brass hover:text-brass-lit transition-colors">hello@getlootix.com</a> — we answer within one business day.
          </p>
          <NoPurchaseNotice line={ODDS_SHORT} className="m-0 text-stone" style={{ maxWidth: 580, fontSize: 12.5, lineHeight: 1.7 }} />
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
              Eligibility, the free mail-in entry method, prize details, how the RANDOM.ORG draw works, and publicity — all of it.
            </span>
          </div>
          <Link href="/official-rules" className="btn-ghost-v2 whitespace-nowrap">Read Official Rules →</Link>
        </div>
      </section>
    </div>
  );
}
