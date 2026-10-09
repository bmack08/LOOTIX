'use client';

import { useEffect, useState } from 'react';
import { GIVEAWAY } from '@/lib/site';
import { etWallClockToEpochMs } from '@/lib/time';

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
type Parts = { dd: string; hh: string; mm: string; ss: string };

/** Live draw countdown — ticks every second to the draw date, zero-padded, floors at 00. */
export default function Countdown({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const [p, setP] = useState<Parts | null>(null);

  useEffect(() => {
    // Pinned to ET — a naive `new Date(...)` here would end the countdown at
    // 8:00 PM in whatever zone the visitor's browser happens to be in.
    const end = etWallClockToEpochMs(GIVEAWAY.drawDateISO);
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setP({
        dd: pad(diff / 86400000),
        hh: pad((diff / 3600000) % 24),
        mm: pad((diff / 60000) % 60),
        ss: pad((diff / 1000) % 60),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const lg = size === 'lg';
  const cells: { k: keyof Parts; label: string }[] = [
    { k: 'dd', label: 'Days' },
    { k: 'hh', label: 'Hrs' },
    { k: 'mm', label: 'Min' },
    { k: 'ss', label: 'Sec' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 text-center" aria-label="Countdown to draw">
      {cells.map(({ k, label }) => (
        <div key={k} style={{ background: '#131009', border: '1px solid rgba(198,161,91,0.2)', borderRadius: 3, padding: lg ? '18px 0' : '10px 0' }}>
          <div className="font-plex text-brass-lit" style={{ fontSize: lg ? 40 : 22, fontWeight: 600, lineHeight: 1 }}>
            {p ? p[k] : '--'}
          </div>
          <div className="uppercase text-stone" style={{ fontSize: 10, letterSpacing: '0.14em', marginTop: lg ? 6 : 2 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}
