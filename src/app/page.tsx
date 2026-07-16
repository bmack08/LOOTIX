import Link from 'next/link';
import Countdown from '@/components/lootix/v2/Countdown';
import EmailCapture from '@/components/lootix/v2/EmailCapture';
import { GIVEAWAY, STATS, HOW_STEPS, ENTRY_PACKS } from '@/lib/site';

const HAIR = '1px solid rgba(201,164,92,.14)';
const Tick = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A45C" strokeWidth="2" className="flex-none" aria-hidden>
    <path d="m4 12 5 5L20 7" />
  </svg>
);

const FEATURED = [
  { name: 'Lord of Flame Tee', meta: 'Heavyweight · Drop 001', price: '$42', entries: 60, img: '/brand/products/lord-of-flame.png', pos: 'center', size: 'cover', slug: 'lord-of-flame-tee' },
  { name: 'Nat 20 Tee', meta: 'Regular fit · Drop 001', price: '$38', entries: 60, img: '/brand/products/tees-2up.png', pos: '24% 42%', size: '240%', slug: 'nat-20-tee' },
  { name: 'Hoard Dragon Tee', meta: 'Camo · Drop 001', price: '$44', entries: 60, img: '/brand/products/tees-2up.png', pos: '77% 42%', size: '240%', slug: 'hoard-dragon-tee' },
  { name: 'Legendary Drops Hoodie', meta: 'Heavyweight fleece · Drop 001', price: '$75', entries: 150, img: '/brand/site/hero-models.png', pos: 'top', size: 'cover', slug: 'emberwitch-hoodie' },
];

const QUICK_LOOT = [
  { name: 'Sigil Sticker Pack', meta: '+10 entries · $8' },
  { name: 'Looter Beanie', meta: '+40 entries · $28' },
  { name: 'Quest Cap', meta: '+45 entries · $32' },
  { name: 'Guild Keytag', meta: '+15 entries · $12' },
];

const PROOF = [
  { n: '1', title: 'Draw recorded live', body: 'Full video published with every result' },
  { n: '2', title: 'Independent selection', body: 'Random draw run by a third party — never by us' },
  { n: '3', title: 'Winner announced & paid fast', body: 'Named publicly (with permission) and paid within days' },
];

export default function Home() {
  const pct = Math.round((GIVEAWAY.entriesClaimed / GIVEAWAY.entriesGoal) * 100);

  return (
    <div className="text-linen">
      {/* ───────────── HERO ───────────── */}
      <section style={{ borderBottom: HAIR }}>
        <div className="max-w-v2 mx-auto grid lg:grid-cols-[1.05fr_1fr] min-h-[640px]" style={{ padding: '0 32px' }}>
          <div className="flex flex-col justify-center gap-7 py-[72px] lg:pr-14">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 uppercase text-brass" style={{ border: '1px solid rgba(201,164,92,.4)', padding: '7px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '.18em' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A45C', boxShadow: '0 0 8px #C9A45C' }} />
                Live giveaway · Drop 001
              </span>
            </div>
            <h1 className="font-cinzel m-0 text-parchment" style={{ fontWeight: 600, fontSize: 'clamp(48px,4.6vw,68px)', lineHeight: 1.06, letterSpacing: '.01em' }}>
              Cop the gear.<br /><span className="text-brass">Win the vault.</span>
            </h1>
            <p className="m-0 text-sand" style={{ fontSize: 16.5, lineHeight: 1.75, maxWidth: 480 }}>
              Legendary fantasy streetwear, forged for the fearless. Every piece you cop earns entries into the Launch Vault — <strong className="text-linen" style={{ fontWeight: 600 }}>$250 cash plus a full Lootix merch bundle</strong>, drawn live.
            </p>
            <div className="flex gap-3.5 items-center flex-wrap">
              <Link href="/shop" className="btn-brass" style={{ fontSize: 13, padding: '16px 32px' }}>Shop the drop</Link>
              <Link href="/how-it-works" className="btn-ghost-v2" style={{ fontSize: 13, fontWeight: 600 }}>How it works</Link>
            </div>
            <div className="flex gap-6 flex-wrap" style={{ paddingTop: 6 }}>
              {['Drawn live & independent', 'No purchase necessary', 'Ships worldwide'].map((t) => (
                <span key={t} className="flex items-center gap-2 text-stone" style={{ fontSize: 12, letterSpacing: '.06em' }}><Tick />{t}</span>
              ))}
            </div>
          </div>

          {/* Brand photo + overlaid prize card */}
          <div className="relative min-h-[420px] lg:min-h-0" style={{ borderLeft: HAIR }}>
            <img src="/brand/site/hero-models.png" alt="Lootix hoodies — Legendary Drops" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(13,11,8,.88) 0%,rgba(13,11,8,.1) 45%,rgba(13,11,8,0) 70%)' }} />
            <div
              className="absolute flex flex-col gap-4"
              style={{ left: 28, right: 28, bottom: 28, background: 'rgba(10,8,5,.86)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(201,164,92,.35)', padding: '24px 26px' }}
            >
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <div>
                  <div className="uppercase text-stone" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.2em', marginBottom: 6 }}>Launch Vault · Grand Prize</div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-cinzel text-parchment" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>$250</span>
                    <span className="text-brass" style={{ fontSize: 13, fontWeight: 600 }}>+ full merch bundle</span>
                  </div>
                </div>
                <Countdown />
              </div>
              <div>
                <div className="flex justify-between uppercase text-stone" style={{ fontSize: 11, letterSpacing: '.1em', marginBottom: 8 }}>
                  <span className="text-brass" style={{ fontWeight: 600 }}>{GIVEAWAY.entriesClaimed} entries claimed</span>
                  <span>Goal {GIVEAWAY.entriesGoal.toLocaleString()}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(201,164,92,.15)' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#8a6c33,#C9A45C)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── STATS STRIP ───────────── */}
      <section style={{ borderBottom: HAIR, background: '#0A0806' }}>
        <div className="max-w-v2 mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ padding: '0 32px' }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center" style={{ padding: '28px 12px', borderRight: i < STATS.length - 1 ? '1px solid rgba(201,164,92,.12)' : undefined }}>
              <div className="font-cinzel" style={{ fontSize: 26, fontWeight: 700, color: i === STATS.length - 1 ? '#C9A45C' : '#F0E6CE' }}>{s.value}</div>
              <div className="uppercase text-stone" style={{ fontSize: 11, letterSpacing: '.18em', marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── FEATURED DROP ───────────── */}
      <section className="max-w-v2 mx-auto" style={{ padding: '88px 32px 0' }}>
        <div className="flex justify-between items-end gap-6 flex-wrap" style={{ marginBottom: 36 }}>
          <div>
            <div className="uppercase text-brass" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.24em', marginBottom: 12 }}>Drop 001 · Summon the Loot</div>
            <h2 className="font-cinzel m-0 text-parchment" style={{ fontSize: 36, fontWeight: 600 }}>Gear worth winning in</h2>
          </div>
          <Link href="/shop" className="uppercase text-brass hover:text-linen transition-colors" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '.14em', borderBottom: '1px solid rgba(201,164,92,.4)', paddingBottom: 3 }}>Shop all gear →</Link>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p) => (
            <Link key={p.name} href={`/product/${p.slug}`} className="v2-card flex flex-col gap-3.5" style={{ padding: '10px 10px 20px', color: 'inherit' }}>
              <div className="relative" style={{ aspectRatio: '4/5', background: '#0A0806' }}>
                <div className="absolute inset-0" style={{ backgroundImage: `url('${p.img}')`, backgroundSize: p.size, backgroundPosition: p.pos, backgroundRepeat: 'no-repeat' }} />
                <span className="absolute pointer-events-none" style={{ top: 10, left: 10, background: 'rgba(10,8,5,.85)', border: '1px solid rgba(201,164,92,.4)', color: '#C9A45C', fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', padding: '6px 10px' }}>
                  ⛨ Earns {p.entries} entries
                </span>
              </div>
              <div className="flex flex-col gap-1.5" style={{ padding: '0 8px' }}>
                <div className="font-cinzel text-parchment" style={{ fontSize: 16, fontWeight: 600 }}>{p.name}</div>
                <div className="uppercase text-stone" style={{ fontSize: 12, letterSpacing: '.08em' }}>{p.meta}</div>
                <div className="text-brass" style={{ fontSize: 15, fontWeight: 600, marginTop: 3 }}>{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── QUICK LOOT ───────────── */}
      <section className="max-w-v2 mx-auto" style={{ padding: '72px 32px 88px' }}>
        <div style={{ border: '1px solid rgba(201,164,92,.2)', background: '#0A0806', padding: '36px 36px 40px' }}>
          <div className="flex justify-between items-baseline gap-4 flex-wrap" style={{ marginBottom: 26 }}>
            <div className="flex items-baseline gap-4 flex-wrap">
              <h3 className="font-cinzel m-0 text-parchment" style={{ fontSize: 22, fontWeight: 600 }}>Quick loot</h3>
              <span className="text-stone" style={{ fontSize: 12.5 }}>Small adds, instant entries — every item counts toward the draw.</span>
            </div>
            <Link href="/shop" className="uppercase text-brass hover:text-linen transition-colors" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '.14em' }}>View all →</Link>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LOOT.map((q) => (
              <Link key={q.name} href="/shop" className="flex items-center gap-3.5 transition-colors hover:bg-[rgba(201,164,92,.05)]" style={{ border: '1px solid rgba(201,164,92,.16)', padding: 16, color: 'inherit' }}>
                <img src="/brand/site/monogram.png" alt="" style={{ width: 44, height: 44, opacity: 0.9 }} />
                <div className="flex-1">
                  <div className="text-linen" style={{ fontSize: 13.5, fontWeight: 600 }}>{q.name}</div>
                  <div className="uppercase text-brass" style={{ fontSize: 11, letterSpacing: '.1em', marginTop: 3 }}>{q.meta}</div>
                </div>
                <span className="text-brass" style={{ fontSize: 18 }}>+</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section style={{ borderTop: HAIR, borderBottom: HAIR, background: '#0A0806' }}>
        <div className="max-w-v2 mx-auto" style={{ padding: '88px 32px' }}>
          <div className="text-center" style={{ marginBottom: 52 }}>
            <div className="uppercase text-brass" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.24em', marginBottom: 12 }}>How it works</div>
            <h2 className="font-cinzel m-0 text-parchment" style={{ fontSize: 36, fontWeight: 600 }}>Three steps to legendary</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 1, background: 'rgba(201,164,92,.14)', border: HAIR }}>
            {HOW_STEPS.map((s) => (
              <div key={s.n} className="flex flex-col gap-4" style={{ background: '#0D0B08', padding: '40px 36px' }}>
                <div className="font-cinzel text-brass" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '.2em' }}>{s.n}</div>
                <div className="font-cinzel text-parchment" style={{ fontSize: 20, fontWeight: 600 }}>{s.title}</div>
                <p className="m-0 text-stone" style={{ fontSize: 14, lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-ash" style={{ margin: '24px 0 0', fontSize: 12 }}>
            No purchase necessary to enter or win. See the <Link href="/official-rules" className="text-stone" style={{ borderBottom: '1px solid rgba(143,129,104,.4)' }}>Official Rules</Link> for the free entry method. 18+ only.
          </p>
        </div>
      </section>

      {/* ───────────── THE VAULT / ENTRY PACKS ───────────── */}
      <section className="max-w-v2 mx-auto" style={{ padding: '88px 32px' }}>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="relative" style={{ aspectRatio: '4/4.4', border: '1px solid rgba(201,164,92,.25)' }}>
            <img src="/brand/site/unbox.png" alt="Lootix welcome box — Welcome Looter" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover' }} />
            <div className="absolute uppercase text-brass" style={{ left: 16, bottom: 16, background: 'rgba(10,8,5,.85)', border: '1px solid rgba(201,164,92,.35)', padding: '10px 16px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.2em' }}>
              This month&rsquo;s vault
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="uppercase text-brass" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.24em', marginBottom: 12 }}>Launch giveaway · $250 + merch bundle</div>
              <h2 className="font-cinzel text-parchment" style={{ margin: '0 0 14px', fontSize: 36, fontWeight: 600 }}>The Launch Vault</h2>
              <p className="m-0 text-sand" style={{ fontSize: 15, lineHeight: 1.75 }}>
                One winner takes it all: <strong className="text-linen" style={{ fontWeight: 600 }}>$250 cash</strong> plus a full Lootix merch bundle — their pick from the launch drop. Bigger packs, better odds.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {ENTRY_PACKS.map((p) => (
                <Link
                  key={p.name}
                  href="/shop"
                  className="relative flex items-center gap-[18px] transition-colors"
                  style={
                    p.popular
                      ? { border: '1px solid #C9A45C', background: 'rgba(201,164,92,.06)', padding: '18px 22px', color: 'inherit' }
                      : { border: '1px solid rgba(201,164,92,.2)', padding: '18px 22px', color: 'inherit' }
                  }
                >
                  {p.popular && (
                    <span className="absolute uppercase" style={{ top: -9, left: 20, background: '#C9A45C', color: '#14100A', fontSize: 9.5, fontWeight: 700, letterSpacing: '.16em', padding: '3px 10px' }}>Most popular</span>
                  )}
                  <div className="flex-1">
                    <div style={{ fontSize: 15, fontWeight: 600, color: p.popular ? '#F0E6CE' : '#E8DCC2' }}>{p.name}</div>
                    <div className="text-stone" style={{ fontSize: 12.5, marginTop: 3 }}>{p.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-cinzel text-parchment" style={{ fontSize: 19, fontWeight: 700 }}>${p.price}</div>
                    <div className="uppercase text-brass" style={{ fontSize: 11, letterSpacing: '.12em', marginTop: 2 }}>{p.entries} entries</div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="m-0 text-ash" style={{ fontSize: 11.5, lineHeight: 1.7 }}>
              No purchase necessary — a purchase does not increase your chances of winning over the free method. Free entry via the <Link href="/official-rules" className="text-stone" style={{ borderBottom: '1px solid rgba(143,129,104,.4)' }}>Official Rules</Link>. 18+.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── PROOF / FIRST WINNER ───────────── */}
      <section style={{ borderTop: HAIR, background: '#0A0806' }}>
        <div className="max-w-v2 mx-auto grid gap-14 lg:grid-cols-2 items-center" style={{ padding: '88px 32px' }}>
          <div>
            <div className="uppercase text-brass" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.24em', marginBottom: 12 }}>The Winners Vault</div>
            <h2 className="font-cinzel text-parchment" style={{ margin: '0 0 16px', fontSize: 36, fontWeight: 600 }}>The first name is still unclaimed</h2>
            <p className="text-sand" style={{ margin: '0 0 26px', fontSize: 15, lineHeight: 1.75, maxWidth: 460 }}>
              No one has won yet — the first name etched into the Loot Vault could be yours. Every draw is recorded live, run by an independent third party, and announced publicly. No hidden draws, ever.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/giveaway" className="btn-brass" style={{ fontSize: 12.5, padding: '14px 28px' }}>Claim it first</Link>
              <Link href="/winners" className="btn-ghost-v2" style={{ fontSize: 12.5, fontWeight: 600, padding: '13px 26px' }}>How draws are verified</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5" style={{ border: '1px solid rgba(201,164,92,.3)', background: '#0D0B08', padding: 36 }}>
            {PROOF.map((p, i) => (
              <div key={p.n} className="flex items-center gap-4" style={i < PROOF.length - 1 ? { paddingBottom: 20, borderBottom: HAIR } : undefined}>
                <div className="font-cinzel flex items-center justify-center flex-none text-brass" style={{ width: 44, height: 44, border: '1px solid #C9A45C', fontWeight: 700 }}>{p.n}</div>
                <div>
                  <div className="text-parchment" style={{ fontSize: 14.5, fontWeight: 600 }}>{p.title}</div>
                  <div className="text-stone" style={{ fontSize: 12.5, marginTop: 2 }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── EMAIL ───────────── */}
      <section style={{ borderTop: HAIR }}>
        <div className="mx-auto text-center" style={{ maxWidth: 820, padding: '88px 32px' }}>
          <img src="/brand/site/monogram.png" alt="" style={{ width: 52, height: 52, marginBottom: 22, display: 'inline-block' }} />
          <h2 className="font-cinzel text-parchment" style={{ margin: '0 0 12px', fontSize: 32, fontWeight: 600 }}>Join the Guild</h2>
          <p className="text-sand" style={{ margin: '0 0 30px', fontSize: 15, lineHeight: 1.7 }}>
            Drop alerts, early access to limited gear, and 25 bonus entries on your first order.
          </p>
          <EmailCapture source="newsletter" />
        </div>
      </section>
    </div>
  );
}
