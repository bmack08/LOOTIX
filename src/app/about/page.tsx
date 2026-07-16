import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — This is your loot | Lootix',
  description: 'Lootix was built on a simple idea: the gear you wear should feel like treasure you earned. Limited, numbered drops — and honest, independently drawn giveaways.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const VALUES = [
  { icon: '🛡', title: 'Premium quality', body: 'Built to last. Heavyweight fabrics, embroidered details.' },
  { icon: '◆', title: 'Limited edition', body: 'Numbered runs. Never mass produced, never restocked.' },
  { icon: '⚔', title: 'Designed for adventurers', body: 'Fantasy-forged graphics with streetwear cut and fit.' },
  { icon: '⚖', title: 'Honest giveaways', body: 'Independent draws, free entry with equal odds, public winners.' },
];

const QUEST = [
  { n: '01', title: 'Shop the drop', body: <>Each drop is a limited, numbered collection. When it&rsquo;s gone, it&rsquo;s gone. Every product card shows its flat entry count — what you see is what you stack.</> },
  { n: '02', title: 'Stack entries', body: <>Entries total automatically at checkout and arrive in your confirmation email. Prefer not to buy? The free mail-in method in the <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> carries exactly the same odds.</> },
  { n: '03', title: 'Watch the draw', body: <>When the countdown hits zero, an independent third party draws the winner live on our socials. The stream stays archived — no hidden draws, ever.</> },
  { n: '04', title: 'Claim the loot', body: <>Cash is paid within days, merch ships immediately, and the winner&rsquo;s name is etched into the <Link href="/winners" className="text-brass hover:text-brass-lit transition-colors">Winners Vault</Link> with proof of payout — permanently.</> },
];

export default function AboutPage() {
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
            Lootix was built on a simple idea: the gear you wear should feel like treasure you earned. Every drop is limited, numbered, and never mass produced — and every order stacks entries toward a vault of real prizes, drawn live, in the open.
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
          {QUEST.map((q) => (
            <div key={q.n} className="v2-card flex flex-col gap-3.5" style={{ padding: '36px 32px' }}>
              <span className="font-plex text-brass" style={{ fontSize: 14, letterSpacing: '0.1em' }}>{q.n} ─────</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 20, fontWeight: 800 }}>{q.title}</h3>
              <p className="m-0 text-sand" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{q.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-stone" style={{ margin: '28px auto 0', maxWidth: 720, fontSize: 12, lineHeight: 1.7 }}>
          No purchase necessary to enter or win — a purchase does not increase your chances of winning. See the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the free entry method with equal odds. 18+ only.
        </p>
      </section>

      {/* CTA (inverted cream) */}
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '48px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 26, fontWeight: 900 }}>Ready to earn your loot?</span>
          <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>Drop 1 IS LIVE · LAUNCH VAULT CLOSES AUG 1</span>
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
