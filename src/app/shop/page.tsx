'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SHOP_CATEGORIES, SHOP_PRODUCTS } from '@/lib/site';

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default function ShopPage() {
  const [cat, setCat] = useState<string>('All');
  const products = useMemo(
    () => (cat === 'All' ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="text-parchment">
      {/* PAGE HEADER */}
      <header className="flex justify-between items-end gap-8 flex-wrap" style={{ padding: '72px 24px 44px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3">
          <span className="v2-eyebrow">Drop 001 · Summon the Loot · Limited to 500</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Shop the drop</h1>
          <p className="m-0 text-sand" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.6 }}>
            Every item carries a flat entry count into the live giveaway — printed right on the card. You keep the gear either way.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
          <span className="text-brass-lit">◆ LAUNCH VAULT · $250 + MERCH</span>
          <span>Draw closes Aug 1 · <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">view giveaway →</Link></span>
        </div>
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
                <span className="v2-chip absolute" style={{ top: 12, left: 12 }}>◆ {p.entries} ENTRIES</span>
                <span className="font-plex absolute text-sand" style={{ top: 12, right: 12, background: 'rgba(12,10,7,0.85)', fontSize: 10, letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 2 }}>{p.edition}</span>
                {p.soldPct && (
                  <div className="absolute" style={{ left: 12, right: 12, bottom: 12, background: 'rgba(12,10,7,0.85)', borderRadius: 3, padding: '8px 10px' }}>
                    <div className="flex justify-between font-plex text-stone" style={{ fontSize: 10, marginBottom: 4 }}>
                      <span className="text-brass-lit">{p.soldPct} claimed</span><span>{p.edition}</span>
                    </div>
                    <div style={{ height: 4, background: '#1E1810', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: '#C6A15B', width: p.soldPct }} />
                    </div>
                  </div>
                )}
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
        <p className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em' }}>
          No purchase necessary to enter the giveaway; see <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
        </p>
      </section>

      {/* ENTRY BANNER (inverted cream) */}
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '40px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 24, fontWeight: 900 }}>Every cart is a ticket to the vault</span>
          <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
            YOUR ENTRY TOTAL SHOWS AT CHECKOUT · WINNER DRAWN LIVE AUG 1
          </span>
        </div>
        <Link
          href="/giveaways"
          className="uppercase transition-colors whitespace-nowrap"
          style={{ background: '#171208', color: '#E4D5B4', padding: '16px 32px', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}
        >
          See the Prize →
        </Link>
      </section>
    </div>
  );
}
