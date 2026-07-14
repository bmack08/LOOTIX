'use client';

import { useEffect, useState } from 'react';
import { COUNTDOWN_DAYS, COUNTDOWN_EXTRA } from '@/lib/lootix';

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

type Parts = { d: string; h: string; m: string; s: string };

/**
 * Live draw countdown. Target is fixed on mount (days + extra offset from
 * first load) so server/client render agree until hydration ticks in.
 */
export default function VaultCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target =
      Date.now() +
      COUNTDOWN_DAYS * 86400000 +
      COUNTDOWN_EXTRA.hours * 3600000 +
      COUNTDOWN_EXTRA.minutes * 60000;

    const tick = () => {
      let ms = Math.max(0, target - Date.now());
      const d = Math.floor(ms / 86400000); ms -= d * 86400000;
      const h = Math.floor(ms / 3600000); ms -= h * 3600000;
      const m = Math.floor(ms / 60000); ms -= m * 60000;
      const s = Math.floor(ms / 1000);
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const cells: { k: keyof Parts; label: string; accent?: boolean }[] = [
    { k: 'd', label: 'Days' },
    { k: 'h', label: 'Hrs' },
    { k: 'm', label: 'Min' },
    { k: 's', label: 'Sec', accent: true },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map(({ k, label, accent }) => (
        <div
          key={k}
          className="text-center rounded-[7px] py-[11px] px-1"
          style={{
            background: 'rgba(255,255,255,.035)',
            border: `1px solid ${accent ? 'rgba(212,175,55,.3)' : 'rgba(255,255,255,.08)'}`,
          }}
        >
          <div
            className="font-mono font-bold text-[26px] leading-none"
            style={{ color: accent ? '#F0CE6B' : '#F4F0E6' }}
          >
            {parts ? parts[k] : '--'}
          </div>
          <div className="font-mono text-[9px] tracking-[.14em] uppercase text-muted-2 mt-1.5">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
