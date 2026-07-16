'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NAV, TICKER } from '@/lib/site';

const HAIR = '1px solid rgba(198,161,91,0.16)';

function Ticker() {
  const Row = () => (
    <div className="inline-flex gap-12 pr-12 font-plex uppercase" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>
      {TICKER.map((t, i) => <span key={i}>{t}</span>)}
    </div>
  );
  return (
    <div style={{ background: '#C6A15B', color: '#0C0A07', overflow: 'hidden', whiteSpace: 'nowrap', padding: '9px 0', borderBottom: '1px solid #0C0A07' }}>
      <div className="inline-flex animate-ticker"><Row /><Row /></div>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  const LiveBadge = () => (
    <span className="font-plex" style={{ background: '#C6A15B', color: '#0C0A07', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 2 }}>LIVE</span>
  );

  const drawer = (
    <div
      className="lg:hidden fixed inset-0 z-[100] transition-opacity duration-300"
      style={{ background: '#0C0A07', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
    >
      <div className="flex items-center justify-between px-6" style={{ height: 76, borderBottom: HAIR }}>
        <img src="/brand/v2/logo-clean.png" alt="Lootix Streetwear" style={{ height: 38 }} />
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-parchment p-1">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      </div>
      <nav className="flex flex-col px-6 pt-4">
        {NAV.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 uppercase text-parchment py-4 hover:text-brass-lit transition-colors"
            style={{ fontSize: 24, fontWeight: 900, borderBottom: HAIR }}
          >
            {l.label} {l.live && <LiveBadge />}
          </Link>
        ))}
      </nav>
      <div className="px-6 mt-8">
        <Link href="/shop" onClick={() => setOpen(false)} className="btn-brass w-full">Shop Drop 001</Link>
      </div>
    </div>
  );

  return (
    <div>
      <Ticker />
      <nav
        className="sticky top-0 z-50 flex items-center justify-between"
        style={{ padding: '0 24px', height: 76, background: 'rgba(12,10,7,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: HAIR }}
      >
        <Link href="/" className="flex items-center flex-none" aria-label="Lootix — home">
          <img src="/brand/v2/logo-clean.png" alt="Lootix Streetwear" style={{ height: 44, display: 'block' }} />
        </Link>

        <div className="hidden lg:flex items-center gap-9 uppercase" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em' }}>
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-2 transition-colors hover:text-brass-lit"
              style={{ color: active(l.href) ? '#E6C57E' : '#EFE5CF' }}
            >
              {l.label} {l.live && <LiveBadge />}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5 flex-none">
          {/* CTA is contextual, per the designs: Shop page pushes the giveaway, everywhere else pushes the drop */}
          {pathname.startsWith('/shop') ? (
            <Link href="/giveaways" className="hidden sm:inline-flex btn-brass" style={{ padding: '11px 22px', fontSize: 12 }}>Enter Giveaway</Link>
          ) : (
            <Link href="/shop" className="hidden sm:inline-flex btn-brass" style={{ padding: '11px 22px', fontSize: 12 }}>Shop Drop 001</Link>
          )}
          <Link href="/shop" aria-label="Cart" className="relative text-parchment hover:text-brass-lit transition-colors" style={{ fontSize: 20 }}>
            ⌾
            <span
              className="font-plex absolute grid place-items-center"
              style={{ top: -6, right: -10, background: '#C6A15B', color: '#0C0A07', fontSize: 10, fontWeight: 600, width: 16, height: 16, borderRadius: '50%' }}
            >
              2
            </span>
          </Link>
          <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden flex text-parchment p-1 -mr-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
          </button>
        </div>
      </nav>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
