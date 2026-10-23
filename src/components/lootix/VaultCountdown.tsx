'use client';

import { useEffect, useState } from 'react';
import { GIVEAWAY, GIVEAWAY_DATES_SET } from '@/lib/site';

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

type Parts = { d: string; h: string; m: string; s: string };

/**
 * Live countdown to the ENTRY CLOSE in GIVEAWAY.endDateISO - the end of the
 * entry window, not the separate draw date. The close time as the copy prints
 * it is GIVEAWAY_CLOSE_TIME_LABEL in src/config/giveaway.ts.
 *
 * Renders NOTHING until both dates are set (GIVEAWAY_DATES_SET) - no rolling
 * "N days from page load" countdown, which is just a fake deadline. After the
 * close it says "Entries are closed", never zeros.
 */
export default function VaultCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);
  const [closed, setClosed] = useState(false);
  const endDateISO = GIVEAWAY.endDateISO;
  const target = endDateISO ? Date.parse(endDateISO) : NaN;
  const show = GIVEAWAY_DATES_SET && !Number.isNaN(target);

  useEffect(() => {
    if (!show) return;

    const tick = () => {
      let ms = target - Date.now();
      if (ms <= 0) {
        setClosed(true);
        return;
      }
      setClosed(false);
      const d = Math.floor(ms / 86400000); ms -= d * 86400000;
      const h = Math.floor(ms / 3600000); ms -= h * 3600000;
      const m = Math.floor(ms / 60000); ms -= m * 60000;
      const s = Math.floor(ms / 1000);
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [show, target]);

  if (!show) return null;

  if (closed) {
    return (
      <div className="text-center rounded-[7px] py-[11px] px-1 font-mono text-[13px] tracking-[.14em] uppercase " style={{ color: '#F0CE6B', background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.08)' }}>
        Entries are closed
      </div>
    );
  }

  const cells: { k: keyof Parts; label: string; accent?: boolean }[] = [
    { k: 'd', label: 'Days' },
    { k: 'h', label: 'Hrs' },
    { k: 'm', label: 'Min' },
    { k: 's', label: 'Sec', accent: true },
  ];

  return (
    <div>
      <p className="font-mono text-[9px] tracking-[.14em] uppercase text-muted-2 m-0 mb-2">Entries close in</p>
      <div className="grid grid-cols-4 gap-2" aria-label="Entries close in">
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
    </div>
  );
}