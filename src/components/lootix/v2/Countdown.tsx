'use client';

import { useEffect, useState } from 'react';
import { GIVEAWAY, GIVEAWAY_DATES_SET } from '@/lib/site';

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
type Parts = { dd: string; hh: string; mm: string; ss: string };

/**
 * Live countdown to the ENTRY CLOSE - GIVEAWAY.endDateISO, the end of the entry
 * window, not the separate draw date. The close time as the copy prints it is
 * GIVEAWAY_CLOSE_TIME_LABEL in src/config/giveaway.ts.
 *
 * Rules (Legal, site-copy-rulings-2026-10-23.md item 1):
 *  - reads GIVEAWAY.endDateISO only (never a rolling or per-visitor timer);
 *  - renders NOTHING until both dates are set (GIVEAWAY_DATES_SET);
 *  - after the close it says "Entries are closed", never 00:00:00:00;
 *  - it is labeled as counting down to the entry close.
 */
export default function Countdown({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const [p, setP] = useState<Parts | null>(null);
  const [closed, setClosed] = useState(false);
  const endDateISO = GIVEAWAY.endDateISO;
  const end = endDateISO ? Date.parse(endDateISO) : NaN;
  const show = GIVEAWAY_DATES_SET && !Number.isNaN(end);

  useEffect(() => {
    if (!show) return;
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        setClosed(true);
        return;
      }
      setClosed(false);
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
  }, [show, end]);

  if (!show) return null;

  const lg = size === 'lg';

  if (closed) {
    return (
      <div
        className="text-center font-plex uppercase text-brass-lit"
        style={{ background: '#131009', border: '1px solid rgba(198,161,91,0.2)', borderRadius: 3, padding: lg ? '18px 0' : '10px 0', fontSize: lg ? 18 : 13, letterSpacing: '0.14em' }}
      >
        Entries are closed
      </div>
    );
  }

  const cells: { k: keyof Parts; label: string }[] = [
    { k: 'dd', label: 'Days' },
    { k: 'hh', label: 'Hrs' },
    { k: 'mm', label: 'Min' },
    { k: 'ss', label: 'Sec' },
  ];

  return (
    <div>
      <p className="font-plex uppercase text-stone" style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.14em' }}>Entries close in</p>
      <div className="grid grid-cols-4 gap-2 text-center" aria-label="Entries close in">
        {cells.map(({ k, label }) => (
          <div key={k} style={{ background: '#131009', border: '1px solid rgba(198,161,91,0.2)', borderRadius: 3, padding: lg ? '18px 0' : '10px 0' }}>
            <div className="font-plex text-brass-lit" style={{ fontSize: lg ? 40 : 22, fontWeight: 600, lineHeight: 1 }}>
              {p ? p[k] : '--'}
            </div>
            <div className="uppercase text-stone" style={{ fontSize: 10, letterSpacing: '0.14em', marginTop: lg ? 6 : 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}