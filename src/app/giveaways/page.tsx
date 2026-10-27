import type { Metadata } from 'next';
import Link from 'next/link';
import Countdown from '@/components/lootix/v2/Countdown';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { GIVEAWAY, GIVEAWAY_DATES_SET, isEntryWindowOpen, PACKS, UPCOMING } from '@/lib/site';
import {
  currentGiveaway,
  formatEndDate,
  ENTRIES_LABEL,
  MAIL_IN_ENTRIES,
  SIGNUP_LABEL,
  FREE_SHIPPING_THRESHOLD,
  PRIZE_VALUE_PLACEHOLDER,
  GIVEAWAY_CLOSE_TIME_LABEL,
  ODDS_SHORT,
  ODDS_LONG_MD,
} from '@/config/giveaway';
import { GIVEAWAY_ENABLED, GIVEAWAY_PLACEHOLDER_BODY, SHOW_GIVEAWAY_TEASERS } from '@/config/flags';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Giveaways — Lootix Launch Giveaway | Lootix',
  description: GIVEAWAY_ENABLED
    ? `The Lootix Launch Giveaway: $250 cash plus a custom Lootix hoodie and tee, drawn at random on RANDOM.ORG. ${ODDS_SHORT}`
    : GIVEAWAY_PLACEHOLDER_BODY,
};

// isEntryWindowOpen() is wall-clock dependent, so this page must not be
// frozen at build time: revalidate so the window state refreshes on its own.
export const revalidate = 60;

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default function GiveawaysPage() {
  if (!SHOW_GIVEAWAY_TEASERS) redirect('/');
  // Giveaway off: placeholder only - no prize, ARV, countdown or dates.
  if (!GIVEAWAY_ENABLED) {
    return (
      <div className="text-parchment">
        <section className="text-center" style={{ padding: '96px 24px', borderBottom: HAIR }}>
          <div className="mx-auto flex flex-col gap-5 items-center" style={{ maxWidth: 640 }}>
            <span className="v2-eyebrow">Launch Giveaway</span>
            <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(36px,6vw,56px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1 }}>Lootix Launch Giveaway</h1>
            <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.65 }}>{GIVEAWAY_PLACEHOLDER_BODY}</p>
            <Link href="/shop" className="btn-brass">Shop the Drop</Link>
          </div>
        </section>
      </div>
    );
  }
  const windowOpen = isEntryWindowOpen();
  // Two different dates: entries close on endDateISO, the draw happens on
  // drawDateISO. Official Rules § 07 points at the draw date shown below.
  const closeDate = GIVEAWAY.endDateISO ? formatEndDate(new Date(GIVEAWAY.endDateISO)) : null;
  const drawDate = GIVEAWAY.drawDateISO ? formatEndDate(new Date(GIVEAWAY.drawDateISO)) : null;
  return (
    <div className="text-parchment">
      {/* CURRENT GIVEAWAY HERO */}
      <section className="grid lg:grid-cols-[1.05fr_1fr]" style={{ borderBottom: HAIR }}>
        <div className="relative overflow-hidden" style={{ minHeight: 440 }}>
          <img src="/brand/v2/unboxing.png" alt="Lootix Launch Giveaway kit" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #0C0A07 0%, rgba(12,10,7,0) 28%)' }} />
          <span
            className="font-plex absolute flex items-center gap-2 uppercase"
            style={{ top: 24, left: 24, background: '#C6A15B', color: '#0C0A07', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', padding: '6px 12px', borderRadius: 2 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0C0A07' }} />
            {windowOpen ? 'Live now' : 'Opening soon'}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-6" style={{ padding: '64px 24px' }}>
          <span className="v2-eyebrow">Launch Giveaway</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,60px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1 }}>Lootix Launch Giveaway</h1>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-brass-lit" style={{ fontSize: 52, fontWeight: 900 }}>$250</span>
            <span className="text-sand" style={{ fontSize: 16 }}>cash + a custom Lootix hoodie and tee</span>
          </div>

          {/* The prize list and its value — the total is a placeholder on purpose. */}
          <ul className="m-0 flex flex-col gap-1.5" style={{ listStyle: 'none', padding: 0 }}>
            {/* Legal 2026-10-24: no ARV / dollar value of the prize items pre-start. */}
            {currentGiveaway.prizeDetails.map((d) => (windowOpen ? d : d.replace(/\s*\(ARV [^)]*\)/, ''))).map((d) => (
              <li key={d} className="text-sand" style={{ fontSize: 14.5 }}>◆ {d}</li>
            ))}
          </ul>
          {windowOpen && (
            <span className="font-plex text-stone" style={{ fontSize: 11.5, letterSpacing: '0.06em' }}>
              Approximate retail value: {PRIZE_VALUE_PLACEHOLDER} — item values and the total are still being finalized.
            </span>
          )}

          <div style={{ maxWidth: 420 }}><Countdown size="lg" /></div>
          {drawDate && (
            <span className="font-plex text-stone" style={{ fontSize: 11.5, letterSpacing: '0.06em' }}>
              Draw date: {drawDate}. The winner is selected on or about that date, after entries close.
            </span>
          )}
          {!GIVEAWAY_DATES_SET && (
            <span className="font-plex text-stone" style={{ fontSize: 11.5, letterSpacing: '0.06em' }}>
              Start and end dates are not set yet. Join the list and we will email you the moment entries open.
            </span>
          )}

          {/* How to earn entries — three methods, one place. */}
          <div className="flex flex-col gap-1.5">
            {windowOpen ? (
              <>
              <span className="font-plex uppercase text-brass" style={{ fontSize: 11, letterSpacing: '0.14em' }}>How to enter</span>
              <span className="text-sand" style={{ fontSize: 14.5 }}>◆ Order — {ENTRIES_LABEL} of your subtotal</span>
              <span className="text-sand" style={{ fontSize: 14.5 }}>◆ Free by mail — {MAIL_IN_ENTRIES} entries per card, no purchase necessary</span>
              <span className="text-sand" style={{ fontSize: 14.5 }}>◆ {SIGNUP_LABEL}</span>
              </>
            ) : (
              <>
                <span className="font-plex uppercase text-brass" style={{ fontSize: 11, letterSpacing: '0.14em' }}>Opening soon</span>
                <span className="text-sand" style={{ fontSize: 14.5 }}>Join the list to hear when entries open.</span>
              </>
            )}
          </div>

          <div className="flex gap-3.5 flex-wrap">
            <Link href="/shop" className="btn-brass">{windowOpen ? 'Enter & Shop' : 'Shop the Drop'}</Link>
            {windowOpen && <Link href="/official-rules" className="btn-ghost-v2">Free Entry Method</Link>}
          </div>
          {!windowOpen && (
            <span className="text-sand" style={{ fontSize: 14.5 }}>Free ways to enter will be in the Official Rules when the giveaway opens.</span>
          )}
          {windowOpen ? (
            <NoPurchaseNotice as="span" className="font-plex text-stone" style={{ fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 }}>
              18+ · US only · winner selected at random using RANDOM.ORG, from all eligible entries.
            </NoPurchaseNotice>
          ) : (
            <span className="font-plex text-stone" style={{ fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 }}>
              18+ · US only · winner selected at random using RANDOM.ORG from all eligible entries.
            </span>
          )}
        </div>
      </section>

      {/* SHOP BUNDLES (Legal: renamed from 'Entry packs' - entries come from the merchandise purchase, none are sold) */}
      <section style={{ padding: '80px 24px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-2.5 items-center text-center" style={{ marginBottom: 48 }}>
          <span className="v2-eyebrow">Shop bundles</span>
          <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(30px,4.5vw,44px)', fontWeight: 900 }}>Pick your pack</h2>
          <p className="m-0 text-sand" style={{ maxWidth: 520, fontSize: 16, lineHeight: 1.6 }}>
            {windowOpen
              ? <>Real gear, {ENTRIES_LABEL}. Spend more and you earn more entries — free U.S. shipping on orders of $100+.</>
              : <>Real gear, limited and numbered — free U.S. shipping on orders of $100+.</>}
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
              {windowOpen && (
                <span className="font-plex text-brass" style={{ fontSize: 13, letterSpacing: '0.08em' }}>◆ {ENTRIES_LABEL.toUpperCase()}</span>
              )}
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
        {windowOpen && (
          <NoPurchaseNotice line={ODDS_LONG_MD} className="text-center text-stone" style={{ margin: '32px auto 0', maxWidth: 680, fontSize: 12, lineHeight: 1.7 }}>
            A mail-in card is worth {MAIL_IN_ENTRIES} entries. See the{' '}
            <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for
            the address and instructions. 18+, US only.
          </NoPurchaseNotice>
        )}
      </section>

      {/* COMING LATER - UPCOMING is filtered on hidden:true (site.ts); the whole section,
          heading included, renders only if something is visible. */}
      {UPCOMING.length > 0 && (
      <section style={{ padding: '80px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex flex-col gap-2.5" style={{ marginBottom: 40 }}>
          <span className="v2-eyebrow">The road ahead</span>
          <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900 }}>Future giveaways unlock as the guild grows</h2>
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
      </section>
      )}

      {/* Real-deadlines note - always shown (outside the hideable section above). */}
      <section style={{ padding: '32px 24px', background: '#0F0C08' }}>
        <p className="font-plex text-stone" style={{ margin: 0, fontSize: 11, letterSpacing: '0.08em' }}>
          {GIVEAWAY_DATES_SET && closeDate
            ? `Real deadlines only: any countdown on this site counts down to the entry close time in the Official Rules. Entries close ${closeDate} at ${GIVEAWAY_CLOSE_TIME_LABEL}.`
            : 'Dates for the Lootix Launch Giveaway are not set yet. Any countdown on this site will count down to the entry close time in the Official Rules once the dates are set.'}
        </p>
      </section>
    </div>
  );
}
