import Reveal from '@/components/lootix/Reveal';
import VaultCountdown from '@/components/lootix/VaultCountdown';
import EmailCapture from '@/components/lootix/EmailCapture';
import ClaimEntryButton from '@/components/lootix/ClaimEntryButton';
import {
  MULT_LABEL, SHOW_SCARCITY, STATS, VAULT, ENTRY_TIERS,
  HOW_STEPS, DROPS, PRIZES, MILESTONES,
} from '@/lib/lootix';
import { getLatestWinner } from '@/lib/raffle';

export const dynamic = 'force-dynamic';

// Privacy-safe winner handle: "winner@example.com" → "wi•••@example.com"
function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  const head = local.slice(0, 2);
  return `${head}${'•'.repeat(Math.max(3, local.length - 2))}@${domain ?? ''}`;
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = ({ c = '#D4AF37', s = 16 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4">
    <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Lock = ({ c = '#D4AF37', s = 26 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
    <circle cx="12" cy="15.5" r="1.4" fill={c} stroke="none" />
  </svg>
);
const Trophy = ({ c = '#D4AF37', s = 30 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7">
    <path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 01-12 0V4z M6 6H3v1a3 3 0 003 3M18 6h3v1a3 3 0 01-3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function Home() {
  const scarcityPct = Math.min(100, Math.round((VAULT.scarcity.claimed / VAULT.scarcity.goal) * 100));
  const winner = await getLatestWinner();

  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/brand/ref-fantasy-1.jpg')", backgroundSize: 'cover', backgroundPosition: '75% 28%', opacity: 0.32 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#0a0a0b 30%,rgba(10,10,11,.55) 62%,rgba(10,10,11,.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 80% at 18% 50%,rgba(212,175,55,.13),transparent 70%)' }} />

        <div className="relative max-w-site mx-auto px-6 md:px-10 py-24 grid gap-14 lg:grid-cols-[1.15fr_.85fr] items-center">
          {/* Left */}
          <Reveal>
            <div className="inline-flex items-center gap-[9px] rounded-full px-[14px] py-[7px] mb-[26px]" style={{ border: '1px solid rgba(212,175,55,.3)', background: 'rgba(212,175,55,.05)' }}>
              <span className="w-[7px] h-[7px] rounded-full bg-gold" style={{ boxShadow: '0 0 8px rgba(212,175,55,.55)' }} />
              <span className="font-mono text-[11px] tracking-[.22em] uppercase text-gold-label">Live Giveaway · Draw Ends Soon</span>
            </div>
            <h1 className="font-archivo font-black uppercase text-cream m-0 mb-[22px]" style={{ fontSize: 'clamp(48px,6.6vw,92px)', lineHeight: 0.92, letterSpacing: '-.03em' }}>
              Cop the gear.<br />
              <span style={{ background: 'linear-gradient(180deg,#F6D87E,#C99B2C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Win the vault.
              </span>
            </h1>
            <p className="font-archivo text-[18px] leading-[1.62] text-[#B7B2A8] max-w-[480px] m-0 mb-[34px]">
              Legendary fantasy streetwear, forged for the fearless. Every order earns you up to{' '}
              <strong className="text-gold-bright font-extrabold">{MULT_LABEL} entries</strong> into our launch giveaway —{' '}
              <strong className="text-cream font-bold">$250 cash + a free merch bundle</strong>.
            </p>
            <div className="flex gap-[14px] flex-wrap mb-[30px]">
              <a href="#shop" className="btn-gold">Shop the Drop <ArrowRight /></a>
              <a href="#how" className="btn-ghost">How It Works</a>
            </div>
            <div className="flex items-center gap-6 flex-wrap font-archivo text-[13px] text-muted-2">
              <span className="inline-flex items-center gap-[7px]"><span className="text-gold-bright tracking-[1px]">★★★★★</span> 4.9 · 3,800+ reviews</span>
              <span className="inline-flex items-center gap-[7px]"><Check c="#C9A94A" s={15} /> No purchase necessary</span>
              <span className="inline-flex items-center gap-[7px]"><Check c="#C9A94A" s={15} /> Ships worldwide</span>
            </div>
          </Reveal>

          {/* Right — vault card */}
          <Reveal delay={120}>
            <div className="rounded-card p-[26px] shadow-vault" style={{ background: 'linear-gradient(165deg,rgba(28,24,16,.96),rgba(14,13,12,.96))', border: '1px solid rgba(212,175,55,.34)' }}>
              <div className="flex items-center justify-between mb-[18px]">
                <span className="badge-solid">{VAULT.badge}</span>
                <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[.16em] uppercase text-gold-label">
                  <span className="w-[6px] h-[6px] rounded-full bg-gold" />Live
                </span>
              </div>
              <div className="font-archivo font-black text-cream mb-1" style={{ fontSize: 58, lineHeight: 1, letterSpacing: '-.03em' }}>{VAULT.value}</div>
              <div className="font-mono text-[12px] tracking-[.18em] uppercase text-muted mb-5">{VAULT.subtitle}</div>
              <div className="flex flex-col gap-[9px] mb-[22px]">
                {VAULT.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-[11px] font-archivo text-[14px] text-[#D7D2C8]"><Check /> {perk}</div>
                ))}
              </div>
              {SHOW_SCARCITY && (
                <div className="mb-5">
                  <div className="flex justify-between font-mono text-[11px] tracking-[.08em] text-muted mb-[7px]">
                    <span className="text-gold-bright">{VAULT.scarcity.claimed.toLocaleString()} entries claimed</span>
                    <span>Goal {VAULT.scarcity.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-[7px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
                    <div className="h-full rounded-full" style={{ width: `${scarcityPct}%`, background: 'linear-gradient(90deg,#C99B2C,#F6D87E)' }} />
                  </div>
                </div>
              )}
              <div className="mb-[22px]"><VaultCountdown /></div>
              <a href="#giveaways" className="btn-gold w-full !rounded-md">Enter This Giveaway</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── STAT BAND ─────────────── */}
      <section style={{ background: '#0c0c0d', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-site mx-auto px-6 md:px-10 py-[30px] grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center" style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,.07)' } : undefined}>
              <div className="font-archivo font-black text-[32px] tracking-[-.02em]" style={{ color: s.gold ? '#F0CE6B' : '#F4F0E6' }}>{s.value}</div>
              <div className="font-mono text-[11px] tracking-[.14em] uppercase text-muted-2 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how" className="max-w-site mx-auto px-6 md:px-10 py-[104px]">
        <Reveal className="text-center mb-[60px]">
          <div className="lx-eyebrow mb-4">How It Works</div>
          <h2 className="font-archivo font-black uppercase text-cream m-0 mb-[14px]" style={{ fontSize: 'clamp(34px,4.6vw,58px)', lineHeight: 1, letterSpacing: '-.025em' }}>Three steps to legendary</h2>
          <p className="font-archivo text-[17px] text-muted max-w-[540px] mx-auto">No gimmicks. Shop the gear you actually want — the entries come free with every order.</p>
        </Reveal>
        <div className="grid gap-[22px] md:grid-cols-3">
          {HOW_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="rounded-card p-9 h-full" style={{ background: step.warm ? 'linear-gradient(165deg,#1a1610,#0d0d0e)' : 'linear-gradient(165deg,#131210,#0d0d0e)', border: `1px solid ${step.warm ? 'rgba(212,175,55,.28)' : 'rgba(255,255,255,.08)'}` }}>
                <div className="flex items-center justify-between mb-[26px]">
                  <span className="font-mono text-[13px] tracking-[.2em] text-[#5e5a52]">{step.n}</span>
                  <span className="w-[30px] h-[30px] rounded-full grid place-items-center" style={{ border: '1px solid rgba(212,175,55,.35)' }}><Check /></span>
                </div>
                <h3 className="font-archivo font-extrabold text-[23px] uppercase text-cream m-0 mb-3" style={{ letterSpacing: '-.01em' }}>{step.title}</h3>
                <p className="font-archivo text-[15px] leading-[1.6] text-muted m-0" dangerouslySetInnerHTML={{ __html: step.body.replace(`${MULT_LABEL} entries`, `<strong style="color:#F0CE6B">${MULT_LABEL} entries</strong>`) }} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center font-mono text-[12px] tracking-[.06em] text-[#6b675f] mt-[30px]">
          No purchase necessary to enter or win. See Official Rules for the free mail-in entry method. 18+ only.
        </p>
      </section>

      {/* ─────────────── GRAND PRIZE SHOWCASE ─────────────── */}
      <section id="giveaways" style={{ background: 'linear-gradient(180deg,#0c0c0d,#0a0a0b)', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-site mx-auto px-6 md:px-10 py-[104px] grid gap-14 lg:grid-cols-2 items-center">
          <Reveal className="relative">
            <span className="absolute top-[18px] left-[18px] z-[2] badge-solid" style={{ letterSpacing: '.18em', padding: '7px 13px' }}>This Month&rsquo;s Vault</span>
            <img src="/brand/ref-fantasy-3.jpg" alt="This month's grand prize vault" className="w-full h-[480px] object-cover rounded-feature shadow-card" style={{ border: '1px solid rgba(212,175,55,.3)' }} />
          </Reveal>
          <Reveal delay={100}>
            <div className="lx-eyebrow mb-4" style={{ letterSpacing: '.26em' }}>Launch Giveaway · $250 + Free Merch</div>
            <h2 className="font-archivo font-black uppercase text-cream m-0 mb-5" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 0.98, letterSpacing: '-.025em' }}>The Launch Vault</h2>
            <p className="font-archivo text-[16px] leading-[1.62] text-muted m-0 mb-[26px]">One winner takes it all: <strong className="text-cream">$250 cash</strong> plus a <strong className="text-cream">full Lootix merch bundle</strong> — their pick from the launch drop. Grab an entry pack below — bigger packs, better odds, free shipping.</p>
            <div className="flex flex-col gap-[11px] mb-[30px]">
              {ENTRY_TIERS.map((tier) => (
                <label key={tier.name} className="flex items-center justify-between gap-4 rounded-tier px-[18px] py-4 cursor-pointer relative" style={tier.popular ? { background: 'linear-gradient(120deg,rgba(212,175,55,.1),rgba(255,255,255,.03))', border: '1px solid rgba(212,175,55,.45)' } : { background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.1)' }}>
                  {tier.popular && <span className="absolute -top-[10px] left-[18px] font-mono font-bold text-[9.5px] tracking-[.16em] uppercase text-obsidian bg-gold-bright px-[9px] py-[3px] rounded-[4px]">Most Popular</span>}
                  <span className="flex flex-col gap-[3px]">
                    <span className="font-archivo font-extrabold text-[15px] uppercase text-cream tracking-[.02em]">{tier.name}</span>
                    <span className="font-archivo text-[13px] text-muted-2">{tier.desc}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-mono font-bold text-[17px] text-cream">{tier.price}</span>
                    <span className="font-mono text-[11px] text-gold-bright tracking-[.06em]">{tier.entries}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#shop" className="btn-gold">Enter &amp; Shop <ArrowRight /></a>
              <span className="font-mono text-[12px] text-muted tracking-[.06em]">Bigger packs, better odds</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── FEATURED DROPS ─────────────── */}
      <section id="shop" className="max-w-site mx-auto px-6 md:px-10 py-[104px]">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <Reveal>
            <div className="lx-eyebrow mb-[14px]">Featured Drops</div>
            <h2 className="font-archivo font-black uppercase text-cream m-0" style={{ fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-.025em' }}>Gear worth winning in</h2>
          </Reveal>
          <a href="#" className="link-gold">Shop all gear →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {DROPS.map((d, i) => (
            <Reveal key={d.name} delay={i * 80}>
              <a href="#" className="lx-card block no-underline group">
                <div className="relative aspect-square overflow-hidden" style={{ background: d.well === 'light' ? '#ECEAE3' : '#0a0a0b' }}>
                  <div
                    className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${d.img}')`, backgroundSize: d.size, backgroundPosition: d.pos, backgroundRepeat: 'no-repeat' }}
                  />
                  <span className="absolute top-[14px] left-[14px] badge-pill">{d.entries}</span>
                </div>
                <div className="p-5">
                  <div className="font-archivo font-extrabold text-[18px] uppercase text-cream tracking-[-.01em] mb-[5px]">{d.name}</div>
                  <div className="font-archivo text-[13px] text-muted-2 mb-[14px]">{d.meta}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[17px] text-gold-bright">{d.price}</span>
                    <span className="font-archivo text-[12px] text-muted-2">★ {d.rating}</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────── PRIZE VAULT GRID ─────────────── */}
      <section id="vault" style={{ background: '#0c0c0d', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-site mx-auto px-6 md:px-10 py-[104px]">
          <Reveal className="text-center mb-14">
            <div className="lx-eyebrow mb-[14px]">The Prize Vault</div>
            <h2 className="font-archivo font-black uppercase text-cream m-0 mb-[14px]" style={{ fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-.025em' }}>More ways to win</h2>
            <p className="font-archivo text-[17px] text-muted max-w-[520px] mx-auto">Every order enters you across all live giveaways. Stack your entries, chase the loot you want.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {PRIZES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="lx-card">
                  <div className="relative">
                    <span className="absolute top-[14px] left-[14px] z-[2] badge-glass">{p.status}</span>
                    <img src={p.img} alt={p.title} className="w-full h-[220px] object-cover" />
                  </div>
                  <div className="p-[22px]">
                    <div className="font-mono text-[11px] tracking-[.16em] uppercase text-muted-2 mb-2">{p.kind}</div>
                    <div className="font-archivo font-black text-[26px] text-cream tracking-[-.02em] mb-4">{p.title}</div>
                    <div className="flex justify-between font-mono text-[11px] text-muted mb-[18px]">
                      <span className="text-gold-label">{p.meta}</span><span>{p.ends}</span>
                    </div>
                    <a href="#shop" className={p.primary ? 'btn-gold w-full !py-[13px] !text-[13px]' : 'btn-outline-gold w-full !py-[13px]'}>{p.cta}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── WINNERS VAULT (locked achievements) ─────────────── */}
      <section id="winners" className="max-w-site mx-auto px-6 md:px-10 py-[104px]">
        <Reveal className="text-center mb-14">
          <div className="lx-eyebrow mb-[14px]">The Winners Vault</div>
          <h2 className="font-archivo font-black uppercase text-cream m-0 mb-[14px]" style={{ fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-.025em' }}>
            {winner ? 'The vault is claimed' : 'The vault is unclaimed'}
          </h2>
          <p className="font-archivo text-[17px] text-muted max-w-[540px] mx-auto">
            {winner
              ? 'We have our first winner. The next drop resets the vault — get your entries in.'
              : 'No one has won yet. The first Loot Vault drop is still locked — and the first name in it could be yours.'}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {MILESTONES.map((m, i) => {
            const isNext = m.state === 'next';
            const unlocked = isNext && !!winner;
            const highlight = isNext; // gold treatment for the claimable/unlocked slot
            return (
              <Reveal key={m.title} delay={i * 90}>
                <div
                  className="relative rounded-card p-8 h-full text-center overflow-hidden"
                  style={
                    highlight
                      ? { background: 'linear-gradient(165deg,#1a1610,#0d0d0e)', border: '1px solid rgba(212,175,55,.5)', boxShadow: '0 0 0 1px rgba(212,175,55,.15), 0 20px 50px rgba(212,175,55,.08)' }
                      : { background: 'linear-gradient(165deg,#101012,#0b0b0c)', border: '1px dashed rgba(255,255,255,.14)' }
                  }
                >
                  {/* status chip */}
                  <span
                    className="absolute top-4 right-4 inline-flex items-center gap-[5px] font-mono font-bold text-[9.5px] tracking-[.16em] uppercase rounded-[4px] px-[9px] py-[4px]"
                    style={highlight
                      ? { color: '#0a0a0b', background: 'linear-gradient(180deg,#F0CE6B,#D4AF37)' }
                      : { color: '#8E8A82', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)' }}
                  >
                    {unlocked
                      ? <><Check c="#0a0a0b" s={11} /> Unlocked</>
                      : <><Lock c={highlight ? '#0a0a0b' : '#8E8A82'} s={11} /> {m.tag}</>}
                  </span>

                  {/* achievement emblem */}
                  <div
                    className="mx-auto mb-6 mt-2 grid place-items-center rounded-full"
                    style={{
                      width: 74, height: 74,
                      background: highlight ? 'radial-gradient(circle at 50% 35%, rgba(212,175,55,.28), rgba(13,13,14,.9))' : 'rgba(255,255,255,.03)',
                      border: `1px ${highlight ? 'solid rgba(212,175,55,.55)' : 'dashed rgba(255,255,255,.14)'}`,
                      boxShadow: highlight ? '0 0 26px rgba(212,175,55,.25) inset' : 'none',
                    }}
                  >
                    {highlight ? <Trophy c="#F0CE6B" s={34} /> : <Lock c="#5e5a52" s={30} />}
                  </div>

                  {/* name slot */}
                  <div
                    className="font-archivo font-black uppercase tracking-[-.01em] mb-[10px] break-all"
                    style={{ fontSize: unlocked ? 20 : 26, color: highlight ? '#F4F0E6' : '#4f4c46' }}
                  >
                    {unlocked ? maskEmail(winner!.winner_email) : isNext ? '— Your Name —' : '??????'}
                  </div>
                  <div className="font-archivo font-extrabold text-[15px] uppercase tracking-[.02em] mb-3" style={{ color: highlight ? '#F0CE6B' : '#6b675f' }}>
                    {m.title}
                  </div>
                  <p className="font-archivo text-[14px] leading-[1.55] m-0 mx-auto max-w-[280px]" style={{ color: highlight ? '#B7B2A8' : '#6b675f' }}>
                    {unlocked
                      ? `Drawn ${new Date(winner!.created_at).toLocaleDateString()} from ${winner!.total_entries.toLocaleString()} entries. The vault has its first winner.`
                      : m.desc}
                  </p>

                  {isNext && !unlocked && (
                    <ClaimEntryButton className="btn-gold mt-6 !py-[13px] !text-[13px]">
                      Claim It First <ArrowRight />
                    </ClaimEntryButton>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="text-center font-mono text-[12px] tracking-[.06em] text-faint mt-9">
          Every draw is recorded live and every winner announced publicly. No hidden draws, ever.
        </p>
      </section>

      {/* ─────────────── TRUST STRIP ─────────────── */}
      <section style={{ background: '#0c0c0d', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-site mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            'Secure Stripe Checkout', '18+ · Play Responsibly', 'No Purchase Necessary', 'Ships Worldwide', 'Live, Verified Draws',
          ].map((label, i) => (
            <div key={label} className="flex flex-col items-center text-center gap-[10px]" style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,.06)' } : undefined}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="font-archivo font-bold text-[12.5px] text-[#C9C4BA] tracking-[.02em]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── EMAIL CAPTURE ─────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 120% at 50% 0%,rgba(212,175,55,.12),transparent 60%)' }} />
        <div className="relative max-w-[760px] mx-auto px-6 md:px-10 py-24 text-center">
          <div className="lx-eyebrow mb-4">Join the Guild</div>
          <h2 className="font-archivo font-black uppercase text-cream m-0 mb-4" style={{ fontSize: 'clamp(32px,4.4vw,52px)', lineHeight: 1, letterSpacing: '-.025em' }}>Get first access + bonus entries</h2>
          <p className="font-archivo text-[16px] text-muted m-0 mb-[30px]">Drop alerts, early access to limited gear, and 25 free bonus entries on your first order.</p>
          <EmailCapture
            source="newsletter"
            buttonLabel="Claim Entries"
            successMsg="You're in — 25 bonus entries locked. Check your inbox."
            className="max-w-[480px] mx-auto"
          />
        </div>
      </section>
    </>
  );
}
