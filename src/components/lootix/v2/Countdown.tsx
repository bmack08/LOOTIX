'use client';

import { useEffect, useState } from 'react';
import { GIVEAWAY } from '@/lib/site';

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
type Parts = { d: string; h: string; m: string; s: string };

/**
 * Live draw countdown. Ticks every second to the giveaway close datetime,
 * zero-padded, floors at 00. `size`: sm = home hero (52px cells),
 * lg = Giveaway page hero (84px cells).
 */
export default function Countdown({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const [p, setP] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(GIVEAWAY.closesAtISO).getTime();
    const tick = () => {
      let d = Math.max(0, target - Date.now()) / 1000;
      const days = Math.floor(d / 86400); d -= days * 86400;
      const hrs = Math.floor(d / 3600); d -= hrs * 3600;
      const min = Math.floor(d / 60); d -= min * 60;
      setP({ d: pad(days), h: pad(hrs), m: pad(min), s: pad(d) });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const lg = size === 'lg';
  const cells: { k: keyof Parts; label: string; accent?: boolean }[] = [
    { k: 'd', label: 'Days' },
    { k: 'h', label: 'Hrs' },
    { k: 'm', label: 'Min' },
    { k: 's', label: 'Sec', accent: true },
  ];

  return (
    <div className="flex" style={{ gap: lg ? 12 : 8 }} aria-label="Countdown to draw">
      {cells.map(({ k, label, accent }) => (
        <div
          key={k}
          className="text-center"
          style={{
            border: '1px solid rgba(201,164,92,.3)',
            padding: lg ? '18px 0' : '8px 0',
            width: lg ? 84 : 52,
          }}
        >
          <div
            className="font-cinzel"
            style={{ fontSize: lg ? 38 : 19, fontWeight: 700, color: accent ? '#C9A45C' : '#F0E6CE', lineHeight: 1 }}
          >
            {p ? p[k] : '--'}
          </div>
          <div className="uppercase text-stone" style={{ fontSize: lg ? 10 : 9, letterSpacing: '.16em', marginTop: lg ? 6 : 2 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
