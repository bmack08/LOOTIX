import type { Metadata } from 'next';
import Link from 'next/link';
import Countdown from '@/components/lootix/v2/Countdown';
import { PACKS, UPCOMING } from '@/lib/site';
import { SWEEPSTAKES_OPEN, COMING_SOON_LABEL } from '@/config/sweepstakes';

export const metadata: Metadata = {
  title: 'Giveaways — The Launch Vault | Lootix',
  description: 'The Launch Vault: $250 cash + a full merch bundle, drawn live by an independent third party. Coming soon — the sweepstakes has not started yet.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

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
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0C0A07' }} />
            {SWEEPSTAKES_OPEN ? 'Live now' : COMING_SOON_LABEL}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-6" style={{ padding: '64px 24px' }}>
          <span className="v2-eyebrow">
            {SWEEPSTAKES_OPEN ? 'Launch Giveaway · Drop 1' : `Launch Giveaway · Drop 1 · ${COMING_SOON_LABEL}`}
          </span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,60px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1 }}>The Launch Vault</h1>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-brass-lit" style={{ fontSize: 52, fontWeight: 900 }}>$250</span>
            <span className="text-sand" style={{ fontSize: 16 }}>cash + full merch bundle · winner&rsquo;s pick from Drop 1</span>
          </div>
          {/* Countdown hidden until the sweepstakes opens. */}
          {SWEEPSTAKES_OPEN && <div style={{ maxWidth: 420 }}><Countdown size="lg" /></div>}
          {/* The hard-coded "entries claimed / goal" progress bar was removed — it was not real entry data. */}
          {!SWEEPSTAKES_OPEN && (
            <div style={{ maxWidth: 460, background: '#131009', border: '1px solid rgba(198,161,91,0.3)', borderRadius: 4, padding: '20px 22px' }}>
              <span className="font-plex uppercase text-brass block" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 8 }}>
                Not open yet
              </span>
              <p className="m-0 text-sand" style={{ fontSize: 14, lineHeight: 1.65 }}>
                This sweepstakes has not started. There is nothing to enter yet and no entries are being
                earned or claimed. The Official Rules will be posted before it opens.
              </p>
            </div>
          )}
          <div className="flex gap-3.5 flex-wrap">
            <Link href="/shop" className="btn-brass">{SWEEPSTAKES_OPEN ? <>Enter &amp; Shop</> : 'Shop the Drop'}</Link>
            <Link href="/official-rules" className="btn-ghost-v2">{SWEEPSTAKES_OPEN ? 'Free Entry Method' : 'Official Rules'}</Link>
          </div>
          <span className="font-plex text-stone" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
            {SWEEPSTAKES_OPEN
              ? 'No purchase necessary · equal odds · 18+ · drawn live by an independent third party'
              : 'Not started · no entries yet · no purchase will be necessary · 18+ · drawn live by an independent third party'}
          </span>
        </div>
      </section>

      {/* ENTRY PACKS — an entry flow, so the whole section is hidden until the
          sweepstakes opens. Kept in the repo: it comes back with SWEEPSTAKES_OPEN. */}
      {SWEEPSTAKES_OPEN && (
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
      )}

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
