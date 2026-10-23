import Link from 'next/link';
import Countdown from '@/components/lootix/v2/Countdown';
import EmailCapture from '@/components/lootix/v2/EmailCapture';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { GIVEAWAY, isEntryWindowOpen, STATS, PRODUCTS, QUICKIES, PACKS, HOW_STEPS, PROOF } from '@/lib/site';
import { ENTRIES_LABEL, FREE_SHIPPING_THRESHOLD, SIGNUP_ENTRIES } from '@/config/giveaway';

// isEntryWindowOpen() is wall-clock dependent, so this page must not be
// frozen at build time: revalidate so the window state refreshes on its own.
export const revalidate = 60;

const HAIR = '1px solid rgba(198,161,91,0.16)';

// The entry close (GIVEAWAY.endDateISO), not the draw date — "Ends ..." is
// about the entry window. No date set → no "ends ..." line, no countdown, no
// "enter to win".
const endShort = GIVEAWAY.endDateISO
  ? new Date(GIVEAWAY.endDateISO).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' })
  : null;

export default function Home() {
  const windowOpen = isEntryWindowOpen();
  return (
    <div className="text-parchment">
      {/* ───────────── HERO ───────────── */}
      <section className="grid lg:grid-cols-[1fr_1.05fr]" style={{ minHeight: 680, borderBottom: HAIR }}>
        <div className="flex flex-col justify-center gap-7" style={{ padding: '72px 24px' }}>
          <div className="flex items-center gap-3 font-plex uppercase text-brass" style={{ fontSize: 12, letterSpacing: '0.18em' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C6A15B', boxShadow: '0 0 10px #C6A15B' }} />
            {endShort ? `Launch Giveaway · Drop 1 · Ends ${endShort}` : 'Launch Giveaway · Drop 1 · Dates coming soon'}
          </div>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(52px,7vw,88px)', lineHeight: 0.95, fontWeight: 900, letterSpacing: '-0.02em' }}>
            Earn it.<br />Wear it.<br /><span className="text-brass">Loot it.</span>
          </h1>
          <p className="m-0 text-sand" style={{ maxWidth: 480, fontSize: 17, lineHeight: 1.65 }}>
            Legendary streetwear, forged for the fearless. Every dollar you spend on Drop 1 is one entry toward the Lootix Launch Giveaway — <strong className="text-parchment">$250 cash plus a custom Lootix hoodie and tee</strong>, drawn at random on RANDOM.ORG.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/shop" className="btn-brass">Shop the Drop</Link>
            <Link href="/about" className="btn-ghost-v2">How It Works</Link>
          </div>
          <div className="flex gap-7 flex-wrap font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em', paddingTop: 8 }}>
            <span>✓ No purchase necessary</span>
            <span>✓ {ENTRIES_LABEL}</span>
            <span>✓ Ships to the US only</span>
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <img src="/brand/v2/hero-duo.png" alt="Lootix Drop 1 hoodies" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0C0A07 0%, rgba(12,10,7,0) 22%)' }} />
          {/* Giveaway card overlay */}
          <div
            className="absolute flex flex-col gap-4"
            style={{ right: 24, bottom: 24, width: 330, maxWidth: 'calc(100% - 48px)', background: 'rgba(12,10,7,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(198,161,91,0.4)', borderRadius: 4, padding: 24 }}
          >
            <div className="flex justify-between items-center font-plex uppercase" style={{ fontSize: 11, letterSpacing: '0.16em' }}>
              <span className="text-brass">Lootix Launch Giveaway</span>
              {windowOpen && (
                <span style={{ color: '#0C0A07', background: '#C6A15B', padding: '2px 8px', borderRadius: 2, fontWeight: 600 }}>Live</span>
              )}
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-parchment" style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.02em' }}>$250</span>
              <span className="text-sand" style={{ fontSize: 13, fontWeight: 500 }}>+ custom hoodie &amp; tee</span>
            </div>
            <Countdown />
            <p className="font-plex m-0 text-stone" style={{ fontSize: 11, lineHeight: 1.6, letterSpacing: '0.04em' }}>
              {ENTRIES_LABEL}. Free entry by mail —{' '}
              <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
            </p>
            <Link
              href="/giveaways"
              className="block text-center uppercase transition-colors hover:bg-brass-lit"
              style={{ background: '#EFE5CF', color: '#0C0A07', padding: '13px 0', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}
            >
              {windowOpen ? 'Enter This Giveaway' : 'See the Giveaway'}
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── STAT STRIP ───────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4" style={{ borderBottom: HAIR }}>
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-1" style={{ padding: '28px 24px', borderRight: i < STATS.length - 1 ? HAIR : undefined }}>
            <span className="text-brass-lit" style={{ fontSize: 26, fontWeight: 900 }}>{s.value}</span>
            <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ───────────── FEATURED DROP ───────────── */}
      <section style={{ padding: '88px 24px', borderBottom: HAIR }}>
        <div className="flex justify-between items-end gap-6 flex-wrap" style={{ marginBottom: 44 }}>
          <div className="flex flex-col gap-2.5">
            <span className="v2-eyebrow">Drop 1 · Summon the Loot</span>
            <h2 className="v2-h2">Gear worth winning in</h2>
          </div>
          <Link href="/shop" className="uppercase text-brass hover:text-brass-lit transition-colors" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', borderBottom: '1px solid rgba(198,161,91,0.45)', paddingBottom: 4 }}>
            Shop all gear →
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link key={p.name} href="/shop" className="v2-card flex flex-col overflow-hidden text-parchment">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/4.4' }}>
                <img src={p.img} alt={p.name} className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                <span className="v2-chip absolute" style={{ top: 12, left: 12 }}>◆ {ENTRIES_LABEL.toUpperCase()}</span>
                <span className="font-plex absolute text-sand" style={{ top: 12, right: 12, background: 'rgba(12,10,7,0.85)', fontSize: 10, letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 2 }}>{p.edition}</span>
              </div>
              <div className="flex flex-col gap-1.5" style={{ padding: 18 }}>
                <div className="flex justify-between items-baseline gap-2">
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                  <span className="font-plex text-brass-lit" style={{ fontSize: 15, fontWeight: 600 }}>{p.price}</span>
                </div>
                <span className="uppercase text-stone" style={{ fontSize: 12, letterSpacing: '0.06em' }}>{p.sub}</span>
              </div>
            </Link>
          ))}
        </div>
        <NoPurchaseNotice className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 }}>
          {ENTRIES_LABEL} of your order subtotal. See the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
        </NoPurchaseNotice>
      </section>

      {/* ───────────── ACCESSORIES ───────────── */}
      <section style={{ padding: '64px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex justify-between items-center gap-4 flex-wrap" style={{ marginBottom: 32 }}>
          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 26, fontWeight: 900 }}>Accessories</h3>
            <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.12em' }}>Small loot · same $1 = 1 entry</span>
          </div>
          <Link href="/shop" className="uppercase text-brass hover:text-brass-lit transition-colors" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}>View all →</Link>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {QUICKIES.map((q) => (
            <Link key={q.name} href="/shop" className="v2-card flex items-center justify-between gap-3 text-parchment" style={{ padding: '18px 20px' }}>
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: 15, fontWeight: 700 }}>{q.name}</span>
                <span className="font-plex text-brass" style={{ fontSize: 11, letterSpacing: '0.06em' }}>◆ {ENTRIES_LABEL.toUpperCase()}</span>
              </div>
              <span className="font-plex text-brass-lit" style={{ fontSize: 15, fontWeight: 600 }}>{q.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section style={{ padding: '88px 24px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 56 }}>
          <span className="v2-eyebrow">How it works</span>
          <h2 className="v2-h2">Three steps to legendary</h2>
          <p className="m-0 text-sand" style={{ maxWidth: 520, fontSize: 16, lineHeight: 1.6 }}>
            No gimmicks. Shop the gear you actually want — the entries come free with every order.
          </p>
        </div>
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
          {HOW_STEPS.map((s) => (
            <div key={s.n} className="v2-card flex flex-col gap-4" style={{ padding: '36px 32px' }}>
              <span className="font-plex text-brass" style={{ fontSize: 14, letterSpacing: '0.1em' }}>{s.n} ─────</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 22, fontWeight: 800 }}>{s.title}</h3>
              <p className="m-0 text-sand" style={{ fontSize: 15, lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <NoPurchaseNotice className="text-center text-stone" style={{ margin: '28px auto 0', maxWidth: 720, fontSize: 12, lineHeight: 1.7 }}>
          See the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the
          free entry method. 18+ only, void where prohibited.
        </NoPurchaseNotice>
      </section>

      {/* ───────────── THE GIVEAWAY ───────────── */}
      <section className="grid lg:grid-cols-2" style={{ borderBottom: HAIR }}>
        <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <img src="/brand/v2/unboxing.png" alt="Lootix Launch Giveaway welcome kit" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #0C0A07 0%, rgba(12,10,7,0) 30%)' }} />
          <span className="font-plex absolute uppercase" style={{ top: 24, left: 24, background: '#C6A15B', color: '#0C0A07', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', padding: '6px 12px', borderRadius: 2 }}>
            Lootix Launch Giveaway
          </span>
        </div>
        <div className="flex flex-col justify-center gap-6" style={{ padding: '72px 24px' }}>
          <span className="v2-eyebrow">Launch Giveaway · $250 + Custom Hoodie &amp; Tee</span>
          <h2 className="v2-h2">Lootix Launch Giveaway</h2>
          <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.65 }}>
            One winner takes it all: <strong className="text-parchment">$250 cash</strong> plus a <strong className="text-parchment">custom Lootix hoodie and a custom Lootix tee</strong>. Item values and the total are still being finalized. {ENTRIES_LABEL} — free US shipping at ${FREE_SHIPPING_THRESHOLD}.
          </p>
          <div className="flex flex-col gap-3">
            {PACKS.map((pk) => (
              <Link
                key={pk.name}
                href="/giveaways"
                className="flex items-center justify-between gap-4 text-parchment transition-colors hover:border-brass"
                style={{ background: '#131009', border: `1px solid ${pk.popular ? 'rgba(198,161,91,0.55)' : 'rgba(198,161,91,0.16)'}`, borderRadius: 4, padding: '18px 22px' }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span style={{ fontSize: 16, fontWeight: 800 }}>{pk.name}</span>
                    {pk.popular && (
                      <span className="font-plex uppercase" style={{ background: '#C6A15B', color: '#0C0A07', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', padding: '2px 8px', borderRadius: 2 }}>Most popular</span>
                    )}
                  </div>
                  <span className="text-stone" style={{ fontSize: 12 }}>{pk.sub}</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-plex text-brass hidden sm:inline" style={{ fontSize: 12 }}>◆ {ENTRIES_LABEL.toUpperCase()}</span>
                  <span className="font-plex text-brass-lit" style={{ fontSize: 18, fontWeight: 600 }}>{pk.price}</span>
                </div>
              </Link>
            ))}
          </div>
          <NoPurchaseNotice className="m-0 text-stone" style={{ fontSize: 11, lineHeight: 1.7 }}>
            See the{' '}
            <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>. 18+.
          </NoPurchaseNotice>
        </div>
      </section>

      {/* ───────────── PROOF ───────────── */}
      <section style={{ padding: '88px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 52 }}>
          <span className="v2-eyebrow">No hidden draws. Ever.</span>
          <h2 className="v2-h2">How every draw is proven</h2>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p) => (
            <div key={p.title} className="flex flex-col gap-3" style={{ border: HAIR, borderRadius: 4, padding: '30px 26px', background: '#0C0A07' }}>
              <span className="text-brass" style={{ fontSize: 24 }}>{p.icon}</span>
              <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 16, fontWeight: 800 }}>{p.title}</h3>
              <p className="m-0 text-stone" style={{ fontSize: 13, lineHeight: 1.6 }}>{p.body}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-10 flex-wrap font-plex uppercase text-stone" style={{ marginTop: 44, fontSize: 11, letterSpacing: '0.12em' }}>
          <span>🔒 Secure Stripe checkout</span>
          <span>18+ · Play responsibly</span>
          <span>No purchase necessary</span>
          <span>Ships to the US only</span>
        </div>
      </section>

      {/* ───────────── WINNERS TEASER ───────────── */}
      <section className="grid lg:grid-cols-[1.1fr_1fr]" style={{ borderBottom: HAIR }}>
        <div className="flex flex-col justify-center gap-5" style={{ padding: '80px 24px' }}>
          <span className="v2-eyebrow">The Winners Vault</span>
          <h2 className="v2-h2">The vault is unclaimed</h2>
          <p className="m-0 text-sand" style={{ maxWidth: 480, fontSize: 16, lineHeight: 1.65 }}>
            No one has won yet. The first name ever etched onto the Winners Wall is still open — {ENTRIES_LABEL}, or enter free by mail.
          </p>
          <Link href="/winners" className="btn-ghost-v2 self-start" style={{ fontSize: 13, padding: '15px 28px' }}>Visit the Winners Vault</Link>
        </div>
        <div className="flex items-center justify-center" style={{ padding: '64px 24px', background: 'radial-gradient(circle at 50% 40%, rgba(198,161,91,0.12), rgba(12,10,7,0) 65%)' }}>
          <div
            className="text-center flex flex-col gap-3.5"
            style={{ width: 320, maxWidth: '100%', border: '1px solid rgba(198,161,91,0.4)', borderRadius: 4, background: '#131009', padding: '36px 32px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
          >
            <span className="font-plex uppercase text-brass" style={{ fontSize: 11, letterSpacing: '0.2em' }}>◆ First Winner ◆</span>
            <span className="text-parchment" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '0.04em' }}>— YOUR NAME —</span>
            <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.14em' }}>Drop 1 · Lootix Launch Giveaway</span>
            <div style={{ height: 1, background: 'rgba(198,161,91,0.25)', margin: '6px 0' }} />
            <span className="text-sand" style={{ fontSize: 13, lineHeight: 1.6 }}>The first name ever etched onto the Winners Wall. It could be yours.</span>
          </div>
        </div>
      </section>

      {/* ───────────── GUILD SIGNUP (inverted cream) ───────────── */}
      <section style={{ background: '#E4D5B4', color: '#171208', padding: '80px 24px' }}>
        <div className="mx-auto text-center flex flex-col gap-4 items-center" style={{ maxWidth: 820 }}>
          <span className="font-plex uppercase" style={{ fontSize: 12, letterSpacing: '0.18em', color: '#7A6231' }}>Join the Looters Guild</span>
          <h2 className="m-0 uppercase" style={{ fontSize: 'clamp(30px,4.5vw,44px)', fontWeight: 900, letterSpacing: '-0.01em' }}>
            {windowOpen ? `First access + ${SIGNUP_ENTRIES} free entries` : 'First access to every drop'}
          </h2>
          <p className="m-0" style={{ maxWidth: 540, fontSize: 16, lineHeight: 1.6, color: '#4A3D22' }}>
            {windowOpen
              ? `Drop alerts, early access to limited gear, and ${SIGNUP_ENTRIES} free entries — one sign-up per person, no purchase necessary.`
              : 'Drop alerts and early access to limited gear. We will email you the moment giveaway entries open.'}
          </p>
          <div className="w-full flex justify-center" style={{ marginTop: 8 }}>
            <EmailCapture source="newsletter" />
          </div>
          <span className="font-plex" style={{ fontSize: 10, letterSpacing: '0.08em', color: '#7A6231' }}>
            No spam. Unsubscribe anytime. Free entries subject to the Official Rules.
          </span>
        </div>
      </section>
    </div>
  );
}
