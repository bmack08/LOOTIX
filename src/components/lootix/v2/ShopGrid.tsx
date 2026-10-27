'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SWEEPSTAKES_OPEN } from '@/config/sweepstakes';

// Plain data only: this component is client-side and never sees Printful credentials.
export type ShopCardItem = {
  id: number;
  name: string;
  sub: string;
  price: string | null;
  img: string | null;
  category: string;
};

const CATEGORIES = ['All', 'Hoodies', 'Tees'];

export default function ShopGrid({ items }: { items: ShopCardItem[] }) {
  const [cat, setCat] = useState<string>('All');
  const products = useMemo(
    () => (cat === 'All' ? items : items.filter((p) => p.category === cat)),
    [cat, items],
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(198,161,91,0.16)', background: '#0F0C08' }}>
        <div className="flex gap-2.5 flex-wrap">
          {CATEGORIES.map((c) => {
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
        <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>{products.length} items</span>
      </div>

      <section style={{ padding: 24, borderBottom: '1px solid rgba(198,161,91,0.16)' }}>
        {products.length === 0 ? (
          <p className="font-plex text-stone" style={{ fontSize: 13, letterSpacing: '0.08em' }}>
            The drop is loading in. Check back shortly.
          </p>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.id} href="/shop" className="v2-card flex flex-col overflow-hidden text-parchment">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/4.4', background: '#17130C' }}>
                  {p.img && (
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                  )}
                  {!SWEEPSTAKES_OPEN && (
                    <span className="v2-chip absolute" style={{ top: 12, left: 12 }}>◆ ENTRIES COMING SOON</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5" style={{ padding: 18 }}>
                  <div className="flex justify-between items-baseline gap-2">
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                    {p.price ? (
                      <span className="font-plex text-brass-lit whitespace-nowrap" style={{ fontSize: 15, fontWeight: 600 }}>{p.price}</span>
                    ) : (
                      <span className="font-plex text-stone uppercase whitespace-nowrap" style={{ fontSize: 11, letterSpacing: '0.1em' }}>Price coming soon</span>
                    )}
                  </div>
                  <span className="uppercase text-stone" style={{ fontSize: 12, letterSpacing: '0.06em' }}>{p.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <p className="font-plex text-stone" style={{ margin: '28px 0 0', fontSize: 11, letterSpacing: '0.08em' }}>
          {SWEEPSTAKES_OPEN ? 'No purchase necessary to enter the giveaway; see ' : 'The giveaway has not started — no purchase will ever be necessary to enter. See '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
        </p>
      </section>
    </>
  );
}
