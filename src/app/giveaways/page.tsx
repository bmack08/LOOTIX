import type { Metadata } from 'next';
import Link from 'next/link';
import Countdown from '@/components/lootix/v2/Countdown';
import { GIVEAWAY, PACKS, UPCOMING } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Giveaways — The Launch Vault | Lootix',
  description: 'The Launch Vault: $250 cash + a full merch bundle, drawn live by an independent third party. No purchase necessary — free entry with equal odds.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';
const pct = Math.min(100, Math.round((GIVEAWAY.entriesClaimed / GIVEAWAY.entriesGoal) * 100));

export default function GiveawaysPage() {
  return (
    <div className="text-parchment">
      {/* CURRENT GIVEAWAY HERO */}
      <section className="grid lg:grid-cols-[1.05fr_1fr]" style={{ borderBottom: HAIR }}>
        <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <img src="/brand/v2/unboxing.png" alt="The Launch Vault kit" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #0C0A07 0%, rgba(12,10,7,0) 28%)' }} />
          <span
            className="font-plex absolute flex items-center gap-2 uppercase"
            style={{ top: 24, left: 24, background: '#C6A15B', color: '#0C0A07', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', padding: '6px 12px', borderRadius: 2 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0C0A07' }} />Live now
          </span>
        </div>

        <div className="flex flex-col justify-center gap-6" style={{ padding: '64px 24px' }}>
          <span className="v2-eyebrow">Launch Giveaway · Drop 001</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,60px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1 }}>The Launch Vault</h1>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-brass-lit" style={{ fontSize: 52, fontWeight: 900 }}>$250</span>
            <span className="text-sand" style={{ fontSize: 16 }}>cash + full merch bundle · winner&rsquo;s pick from Drop 001</span>
          </div>
          <div style={{ maxWidth: 420 }}><Countdown size="lg" /></div>
          <div style={{ maxWidth: 420 }}>
            <div className="flex justify-between font-plex text-stone" style={{ fontSize: 11, marginBottom: 6 }}>
              <span className="text-sand">{GIVEAWAY.entriesClaimed.toLocaleString()} entries claimed</span>
              <span>Goal {GIVEAWAY.entriesGoal.toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: '#131009', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(198,161,91,0.2)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#C6A15B,#E6C57E)' }} />
            </div>
          </div>
          <div className="flex gap-3.5 flex-wrap">
            <Link href="/shop" className="btn-brass">Enter &amp; Shop</Link>
            <Link href="/official-rules" className="btn-ghost-v2">Free Entry Method</Link>
          </div>
          <span className="font-plex text-stone" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
            No purchase necessary · equal odds · 18+ · drawn live by an independent third party
          </span>
        </div>
      </section>

      {/* ENTRY PACKS */}
      <section style={{ padding: '80px 24px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 48 }}>
          <span className="v2-eyebrow">Entry packs</span>
          <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(30px,4.5vw,44px)', fontWeight: 900 }}>Pick your pack</h2>
          <p className="m-0 text-sand" style={{ maxWidth: 520, fontSize: 16, lineHeight: 1.6 }}>
            Real gear, flat entry counts. Bigger packs stack more entries and ship free.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mx-auto" style={{ maxWidth: 1080 }}>
          {PACKS.map((pk) => (
            <div
              key={pk.name}
              className="relative flex flex-col gap-[18px] text-center items-center"
              style={{ background: '#131009', border: `1px solid ${pk.popular ? 'rgba(198,161,91,0.6)' : 'rgba(198,161,91,0.16)'}`, borderRadius: 4, padding: '40px 32px' }}
            >
              {pk.popular && (
                <span
                  className="font-plex absolute uppercase whitespace-nowrap"
                  style={{ top: -12, left: '50%', transform: 'translateX(-50%)', background: '#C6A15B', color: '#0C0A07', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', padding: '4px 12px', borderRadius: 2 }}
                >
                  Most popular
                </span>
              )}
              <span className="uppercase text-parchment" style={{ fontSize: 20, fontWeight: 800 }}>{pk.name}</span>
              <span className="text-brass-lit" style={{ fontSize: 44, fontWeight: 900 }}>{pk.price}</span>
              <span className="font-plex text-brass" style={{ fontSize: 13, letterSpacing: '0.08em' }}>◆ {pk.entries} ENTRIES</span>
              <span className="text-stone" style={{ fontSize: 14, lineHeight: 1.6 }}>{pk.sub}</span>
              <Link
                href="/shop"
                className="block w-full uppercase transition-colors hover:!bg-brass-lit hover:!text-brass-fg hover:!border-brass-lit"
                style={{
                  boxSizing: 'border-box',
                  background: pk.popular ? '#C6A15B' : 'transparent',
                  color: pk.popular ? '#0C0A07' : '#EFE5CF',
                  border: '1px solid rgba(198,161,91,0.45)',
                  padding: '14px 0',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  borderRadius: 2,
                }}
              >
                {pk.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-stone" style={{ margin: '32px auto 0', maxWidth: 680, fontSize: 12, lineHeight: 1.7 }}>
          No purchase necessary — a purchase does not increase your chances of winning. Free entry with equal odds via the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>. 18+.
        </p>
      </section>

      {/* UPCOMING VAULTS */}
      <section style={{ padding: '80px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex flex-col gap-2.5" style={{ marginBottom: 40 }}>
          <span className="v2-eyebrow">The road ahead</span>
          <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900 }}>Future vaults unlock as the guild grows</h2>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {UPCOMING.map((u) => (
            <div key={u.tag} className="flex flex-col gap-3" style={{ border: HAIR, borderRadius: 4, background: '#0C0A07', padding: '32px 28px' }}>
              <div className="flex justify-between items-center gap-3">
                <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{u.tag}</span>
                <span className="font-plex uppercase text-brass" style={{ border: '1px solid rgba(198,161,91,0.35)', fontSize: 10, letterSpacing: '0.12em', padding: '3px 10px', borderRadius: 2 }}>{u.status}</span>
              </div>
              <span className="uppercase text-parchment" style={{ fontSize: 24, fontWeight: 900 }}>{u.name}</span>
              <p className="m-0 text-stone" style={{ fontSize: 14, lineHeight: 1.6 }}>{u.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em' }}>
          One giveaway at a time, run properly — future vaults open only after the current one pays out. No fake countdowns.
        </p>
      </section>
    </div>
  );
}
