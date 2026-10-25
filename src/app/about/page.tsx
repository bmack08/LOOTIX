import type { Metadata } from 'next';
import Link from 'next/link';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { GIVEAWAY, isEntryWindowOpen } from '@/lib/site';
import { ENTRIES_LABEL, MAIL_IN_ENTRIES, formatEndDate, GIVEAWAY_CLOSE_TIME_LABEL } from '@/config/giveaway';

export const metadata: Metadata = {
  title: 'About — This is your loot | Lootix',
  description: 'Lootix was built on a simple idea: the gear you wear should feel like treasure you earned. Limited, numbered drops — and honest giveaways drawn at random on RANDOM.ORG.',
};

// isEntryWindowOpen() is wall-clock dependent: revalidate so the LIVE / PRE-START copy refreshes.
export const revalidate = 60;

const HAIR = '1px solid rgba(198,161,91,0.16)';

const VALUES = [
  { icon: '🛡', title: 'Premium quality', body: 'Built to last. Heavyweight fabrics, embroidered details.' },
  { icon: '◆', title: 'Limited edition', body: 'Numbered runs. Never mass produced, never restocked.' },
  { icon: '⚔', title: 'Designed for adventurers', body: 'Fantasy-forged graphics with streetwear cut and fit.' },
  { icon: '⚖', title: 'Clear giveaways', body: 'RANDOM.ORG draws, free entry by mail, winners listed with permission.' },
];

const QUEST = [
  { n: '01', title: 'Shop the drop', body: <>Each drop is a limited, numbered collection. When it&rsquo;s gone, it&rsquo;s gone.</> },
  { n: '02', title: `Earn ${ENTRIES_LABEL}`, body: <>Every dollar of your order subtotal is one entry — a $129.99 order earns 129 entries. Your total shows at checkout and in your confirmation email. Prefer not to buy? The free mail-in method in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> is worth {MAIL_IN_ENTRIES} entries per card, with no limit on envelopes.</> },
  { n: '03', title: 'Watch the draw', body: <>Entries close at {GIVEAWAY_CLOSE_TIME_LABEL}. The winner is drawn on RANDOM.ORG and the draw is screen-recorded. The recording is posted with the RANDOM.ORG result link.</> },
  { n: '04', title: 'Claim the loot', body: <>Cash is sent by PayPal and the merch ships after the winner is verified. With the winner&rsquo;s permission, the name goes on the <Link href="/winners" className="text-brass hover:text-brass-lit transition-colors">Winners page</Link>.</> },
];

// PRE-START (dates not both set): no per-dollar cue, no prize pitch, no 'earn' language.
const QUEST_PRE = [
  QUEST[0],
  { n: '02', title: 'Join the list', body: <>Dates for the Lootix Launch Giveaway are not set yet. Join the list to hear when entries open.</> },
  QUEST[2],
  QUEST[3],
];

export default function AboutPage() {
  const windowOpen = isEntryWindowOpen();
  return (
    <div className="text-parchment">
      {/* STORY HERO */}
      <section className="grid lg:grid-cols-2" style={{ borderBottom: HAIR }}>
        <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <img src="/brand/v2/hero-duo.png" alt="Lootix Drop 1" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #0C0A07 0%, rgba(12,10,7,0) 32%)' }} />
        </div>
        <div className="flex flex-col justify-center gap-6" style={{ padding: '80px 24px' }}>
          <span className="v2-eyebrow">The Story</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(38px,5.4vw,58px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.02 }}>
            This isn&rsquo;t just streetwear.<br /><span className="text-brass">This is your loot.</span>
          </h1>
          <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
            {windowOpen
              ? 'Lootix was built on a simple idea: the gear you wear should feel like treasure you earned. Every drop is limited, numbered, and never mass produced \u2014 and every dollar you spend earns an entry toward a vault of real prizes, drawn at random and in the open.'
              : 'Lootix was built on a simple idea: the gear you wear should feel like treasure you earned. Every drop is limited, numbered, and never mass produced.'}
          </p>
          <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
            We&rsquo;re a small crew out of Maryland — adventurers, gamers, collectors. We built the brand we wanted to exist: premium quality, built to last, designed for the fearless.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '80px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="flex flex-col gap-3" style={{ border: HAIR, borderRadius: 4, background: '#0C0A07', padding: '32px 28px' }}>
              <span className="text-brass" style={{ fontSize: 24 }}>{v.icon}</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 16, fontWeight: 800 }}>{v.title}</h3>
              <p className="m-0 text-stone" style={{ fontSize: 13.5, lineHeight: 1.6 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE QUEST / HOW IT WORKS */}
      <section style={{ padding: '88px 24px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 52 }}>
          <span className="v2-eyebrow">How it works</span>
          <h2 className="v2-h2">The full quest, start to finish</h2>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 mx-auto" style={{ maxWidth: 1080 }}>
          {(windowOpen ? QUEST : QUEST_PRE).map((q) => (
            <div key={q.n} className="v2-card flex flex-col gap-3.5" style={{ padding: '36px 32px' }}>
              <span className="font-plex text-brass" style={{ fontSize: 14, letterSpacing: '0.1em' }}>{q.n} ─────</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 20, fontWeight: 800 }}>{q.title}</h3>
              <p className="m-0 text-sand" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{q.body}</p>
            </div>
          ))}
        </div>
        {windowOpen && (
          <NoPurchaseNotice className="text-center text-stone" style={{ margin: '28px auto 0', maxWidth: 720, fontSize: 12, lineHeight: 1.7 }}>
            See the{' '}
            <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the full
            mail-in instructions. 18+ only, US only, void where prohibited.
          </NoPurchaseNotice>
        )}
      </section>

      {/* CTA (inverted cream) */}
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '48px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 26, fontWeight: 900 }}>{windowOpen ? 'Ready to earn your loot?' : 'Ready for the drop?'}</span>
          <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
            DROP 1 IS LIVE ·{' '}
            {GIVEAWAY.endDateISO
              ? `LAUNCH GIVEAWAY CLOSES ${formatEndDate(new Date(GIVEAWAY.endDateISO)).toUpperCase()} AT ${GIVEAWAY_CLOSE_TIME_LABEL.toUpperCase()}`
              : 'LAUNCH GIVEAWAY DATES COMING SOON'}
          </span>
        </div>
        <Link
          href="/shop"
          className="uppercase transition-colors whitespace-nowrap"
          style={{ background: '#171208', color: '#E4D5B4', padding: '16px 32px', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}
        >
          Shop Drop 1 →
        </Link>
      </section>
    </div>
  );
}
