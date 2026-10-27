'use client';
import { GIVEAWAY_ENABLED, PRE_START_ORDER_NOTE, SHOW_GIVEAWAY_TEASERS } from '@/config/flags';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SHOP_CATEGORIES, SHOP_PRODUCTS, GIVEAWAY } from '@/lib/site';
import AddToCart from '@/components/lootix/v2/AddToCart';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { useEntryWindow } from '@/components/lootix/useEntryWindow';
import { ENTRIES_LABEL, FREE_SHIPPING_THRESHOLD, formatEndDate, GIVEAWAY_CLOSE_TIME_LABEL } from '@/config/giveaway';

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default function ShopPage() {
  // LIVE only: per-dollar cues and the prize pitch. PRE-START (default) shows none of them.
  const windowOpen = useEntryWindow();
  const [cat, setCat] = useState<string>('All');
  const closeDate = GIVEAWAY.endDateISO ? formatEndDate(new Date(GIVEAWAY.endDateISO)) : null;
  const products = useMemo(
    () => (cat === 'All' ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="text-parchment">
      {/* PAGE HEADER */}
      <header className="flex justify-between items-end gap-8 flex-wrap" style={{ padding: '72px 24px 44px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3">
          <span className="v2-eyebrow">Launch Collection · Summon the Loot · Limited to 500</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Shop the launch</h1>
          {windowOpen ? (
            <p className="m-0 text-sand" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.6 }}>
              {ENTRIES_LABEL} — every dollar of your order subtotal is one entry into the giveaway. You keep the gear either way, and
              free entry is always available by mail (see the{' '}
              <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>).
            </p>
          ) : (
            <p className="m-0 text-sand" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.6 }}>
              {SHOW_GIVEAWAY_TEASERS ? 'Limited, numbered gear. Join the list to hear when the Lootix Launch Giveaway opens.' : 'Limited, numbered gear.'}
            </p>
          )}
          {!GIVEAWAY_ENABLED && SHOW_GIVEAWAY_TEASERS && (
            <p className="m-0 font-plex text-stone" style={{ maxWidth: 560, fontSize: 12, lineHeight: 1.6 }}>{PRE_START_ORDER_NOTE}</p>
          )}
        </div>
        {SHOW_GIVEAWAY_TEASERS && (
        <div className="flex flex-col items-start md:items-end gap-2 font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
          <span className="text-brass-lit">{windowOpen ? '\u25c6 LOOTIX LAUNCH GIVEAWAY \u00b7 $250 CASH PLUS A CUSTOM HOODIE & TEE' : '\u25c6 LOOTIX LAUNCH GIVEAWAY'}</span>
          <span>
            {closeDate ? `Draw closes ${closeDate} (${GIVEAWAY_CLOSE_TIME_LABEL}) · ` : 'Draw date coming soon · '}
            <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">view giveaway →</Link>
          </span>
        </div>
        )}
      </header>

      {/* FILTER BAR */}
      <div className="flex items-center justify-between gap-4 flex-wrap" style={{ padding: '20px 24px', borderBottom: HAIR, background: '#0F0C08' }}>
        <div className="flex gap-2.5 flex-wrap">
          {SHOP_CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="font-archivo uppercase transition-colors"
                style={{
                  background: active ? '#C6A15B' : 'transparent',
                  color: active ? '#0C0A07' : '#B4A88C',
                  border: active ? 'none' : '1px solid rgba(198,161,91,0.25)',
                  borderRadius: 2,
                  padding: '9px 18px',
                  fontSize: 12,
                  fontWeight: active ? 700 : 600,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
        <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>{products.length} items · Sort: Newest</span>
      </div>

      {/* PRODUCT GRID */}
      <section style={{ padding: 24, borderBottom: HAIR }}>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link key={p.name} href="/shop" className="v2-card flex flex-col overflow-hidden text-parchment">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/4.4', background: '#17130C' }}>
                <img src={p.img} alt={p.name} className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                {windowOpen && (
                  <span className="v2-chip absolute" style={{ top: 12, left: 12 }}>◆ {ENTRIES_LABEL.toUpperCase()}</span>
                )}
                <span className="font-plex absolute text-sand" style={{ top: 12, right: 12, background: 'rgba(12,10,7,0.85)', fontSize: 10, letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 2 }}>{p.edition}</span>
              </div>
              <div className="flex flex-col gap-1.5" style={{ padding: 18 }}>
                <div className="flex justify-between items-baseline gap-2">
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                  <span className="font-plex text-brass-lit" style={{ fontSize: 15, fontWeight: 600 }}>{p.price}</span>
                </div>
                <span className="uppercase text-stone" style={{ fontSize: 12, letterSpacing: '0.06em' }}>{p.sub}</span>
                <div style={{ marginTop: 10 }}><AddToCart product={p} full /></div>
              </div>
            </Link>
          ))}
        </div>
        {windowOpen ? (
          <NoPurchaseNotice className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 }}>
            Ships to U.S. addresses only · free shipping on orders of $100+. See the{' '}
            <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
          </NoPurchaseNotice>
        ) : (
          <p className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 }}>
            Ships to U.S. addresses only · free shipping on orders of $100+. See the{' '}
            <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
          </p>
        )}
      </section>

      {/* ENTRY BANNER (inverted cream) */}
      {SHOW_GIVEAWAY_TEASERS && (
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '40px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 24, fontWeight: 900 }}>{windowOpen ? 'Every dollar is an entry' : 'Lootix Launch Giveaway'}</span>
          {windowOpen ? (
            <>
            <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
              {ENTRIES_LABEL.toUpperCase()} · YOUR ENTRY TOTAL SHOWS AT CHECKOUT · RANDOM.ORG DRAW
            </span>
            <NoPurchaseNotice
              className="m-0"
              style={{ fontSize: 11.5, lineHeight: 1.7, color: '#4A3D22', maxWidth: 560 }}
              linkClassName="underline"
              linkStyle={{ color: '#7A6231' }}
            />
            </>
          ) : (
            <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>{'DATES COMING SOON \u00b7 JOIN THE LIST'}</span>
          )}
        </div>
        <Link
          href="/giveaways"
          className="uppercase transition-colors whitespace-nowrap"
          style={{ background: '#171208', color: '#E4D5B4', padding: '16px 32px', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}
        >
          {windowOpen ? 'See the Prize \u2192' : 'See the Giveaway \u2192'}
        </Link>
      </section>
      )}
    </div>
  );
}
