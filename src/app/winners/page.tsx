import type { Metadata } from 'next';
import Link from 'next/link';
import { getLatestWinner } from '@/lib/raffle';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Winners — The Winners Vault | Lootix',
  description: 'Every Lootix draw is run by an independent third party, streamed live, and archived. The first name in the Loot Vault is still unclaimed.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const STEPS = [
  { n: '01', title: 'Independent random draw', body: 'A third-party administrator selects one entry from all eligible entries — purchase and free entries pooled together, equal odds.' },
  { n: '02', title: 'Streamed live & archived', body: 'The draw is broadcast live on Instagram and Discord and stays archived, timestamped, forever.' },
  { n: '03', title: 'Verified & paid fast', body: 'Winner confirms eligibility, then cash is paid within days — not weeks. Merch ships immediately.' },
  { n: '04', title: 'Etched into the vault', body: 'Name, prize, draw date, and proof-of-payout land on this page — a permanent public record.' },
];

const LOCKED = [
  { title: 'The $1K Club', body: 'Unlocks once the Vault has awarded its first $1,000 in prizes.' },
  { title: 'Legend Status', body: 'Unlocks at 100 verified winners paid. The guild has a long quest ahead.' },
];

// Privacy-safe handle until a real name is collected with permission
function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  return `${local.slice(0, 2)}${'•'.repeat(Math.max(3, local.length - 2))}@${domain ?? ''}`;
}

export default async function WinnersPage() {
  const winner = await getLatestWinner();

  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header
        className="text-center"
        style={{ padding: '88px 24px 64px', borderBottom: HAIR, background: 'radial-gradient(circle at 50% 0%, rgba(198,161,91,0.1), rgba(12,10,7,0) 60%)' }}
      >
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 760 }}>
          <span className="v2-eyebrow">The Winners Vault</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>
            {winner ? 'The vault is claimed' : 'The vault is unclaimed'}
          </h1>
          <p className="m-0 text-sand" style={{ maxWidth: 560, fontSize: 17, lineHeight: 1.65 }}>
            {winner
              ? 'We have our first winner. The next vault resets when Drop 002 opens — every order is a shot at it.'
              : "No one has won yet — Lootix launched with Drop 1 and the first draw hasn't closed. The first name etched here could be yours."}
          </p>
          <Link href="/shop" className="btn-brass" style={{ marginTop: 10 }}>Claim It First</Link>
        </div>
      </header>

      {/* VAULT SLOTS */}
      <section style={{ padding: '72px 24px', borderBottom: HAIR }}>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mx-auto" style={{ maxWidth: 1080 }}>
          {/* Slot 1 — first winner (unclaimed or claimed) */}
          <div
            className="text-center flex flex-col gap-3.5 items-center"
            style={{ border: '1px solid rgba(198,161,91,0.5)', borderRadius: 4, background: '#131009', padding: '40px 32px', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}
          >
            <span
              className="font-plex uppercase text-brass-lit"
              style={{ border: '1px solid rgba(198,161,91,0.45)', fontSize: 10, letterSpacing: '0.14em', padding: '4px 12px', borderRadius: 2 }}
            >
              {winner ? '◆ Claimed' : '◆ Unclaimed'}
            </span>
            <span className="text-parchment break-all" style={{ fontSize: winner ? 20 : 28, fontWeight: 900, letterSpacing: '0.04em' }}>
              {winner ? maskEmail(winner.winner_email) : '— YOUR NAME —'}
            </span>
            <span className="font-plex uppercase text-brass" style={{ fontSize: 11, letterSpacing: '0.14em' }}>First Winner · Launch Vault</span>
            <p className="m-0 text-stone" style={{ fontSize: 14, lineHeight: 1.6 }}>
              {winner
                ? `Drawn ${new Date(winner.created_at).toLocaleDateString()} from ${winner.total_entries.toLocaleString()} entries by an independent third party.`
                : 'The first name ever etched into the Loot Vault. Every Drop 1 order is a shot at it.'}
            </p>
          </div>

          {/* Slots 2 & 3 — locked */}
          {LOCKED.map((l) => (
            <div
              key={l.title}
              className="text-center flex flex-col gap-3.5 items-center"
              style={{ border: HAIR, borderRadius: 4, background: '#0F0C08', padding: '40px 32px', opacity: 0.75 }}
            >
              <span
                className="font-plex uppercase text-stone"
                style={{ border: '1px solid rgba(198,161,91,0.25)', fontSize: 10, letterSpacing: '0.14em', padding: '4px 12px', borderRadius: 2 }}
              >
                🔒 Locked
              </span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#5E543E', letterSpacing: '0.1em' }}>??????</span>
              <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{l.title}</span>
              <p className="m-0" style={{ fontSize: 14, lineHeight: 1.6, color: '#5E543E' }}>{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DRAW PROMISE */}
      <section style={{ padding: '80px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 52 }}>
          <span className="v2-eyebrow">No hidden draws. Ever.</span>
          <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(28px,4.2vw,44px)', fontWeight: 900 }}>What happens when someone wins</h2>
          <p className="m-0 text-sand" style={{ maxWidth: 620, fontSize: 16, lineHeight: 1.6 }}>
            Before the first draw even happens, here&rsquo;s the exact process every winner goes through — committed publicly, in writing.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col gap-3" style={{ border: HAIR, borderRadius: 4, background: '#0C0A07', padding: '30px 26px' }}>
              <span className="font-plex text-brass" style={{ fontSize: 14, letterSpacing: '0.1em' }}>{s.n} ─────</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 16, fontWeight: 800 }}>{s.title}</h3>
              <p className="m-0 text-stone" style={{ fontSize: 13, lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (inverted cream) */}
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '48px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 26, fontWeight: 900 }}>Be the first name in the vault</span>
          <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
            LAUNCH VAULT · $250 + MERCH BUNDLE · DRAWN LIVE AUG 1
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
