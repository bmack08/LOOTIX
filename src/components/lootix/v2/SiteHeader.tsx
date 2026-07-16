'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ANNOUNCE, NAV } from '@/lib/site';

const TicketIcon = ({ c = '#14100A' }: { c?: string }) => (
  <svg width="15" height="12" viewBox="0 0 20 14" fill="none" aria-hidden>
    <path d="M1 3h18v2.4a2 2 0 0 0 0 3.2V11H1V8.6a2 2 0 0 0 0-3.2V3Z" stroke={c} strokeWidth="1.6" />
    <path d="M12.5 3v8" stroke={c} strokeWidth="1.6" strokeDasharray="2 2" />
  </svg>
);

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

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  const drawer = (
    <div
      className="lg:hidden fixed inset-0 z-[100] transition-opacity duration-300"
      style={{ background: '#0D0B08', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
    >
      <div className="flex items-center justify-between px-6 h-[72px]" style={{ borderBottom: '1px solid rgba(201,164,92,.14)' }}>
        <img src="/brand/site/logo.png" alt="Lootix" style={{ height: 34 }} />
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-sand p-1">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      </div>
      <nav className="flex flex-col px-6 pt-4">
        {NAV.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-cinzel uppercase text-parchment py-4 transition-colors hover:text-brass"
            style={{ fontSize: 24, fontWeight: 600, borderBottom: '1px solid rgba(201,164,92,.12)' }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="px-6 mt-8">
        <Link href="/giveaway" onClick={() => setOpen(false)} className="btn-brass w-full">
          <TicketIcon /> Enter the Vault
        </Link>
      </div>
    </div>
  );

  return (
    <div className="sticky top-0 z-[60] font-archivo">
      {/* Announce bar */}
      <div
        className="flex justify-center items-center gap-[22px] flex-wrap text-center"
        style={{ background: '#080604', borderBottom: '1px solid rgba(201,164,92,.14)', padding: '9px 24px' }}
      >
        <span className="uppercase text-brass" style={{ fontSize: 11, letterSpacing: '.16em', fontWeight: 600 }}>{ANNOUNCE}</span>
        <span className="hidden sm:block" style={{ width: 3, height: 3, background: 'rgba(201,164,92,.5)', transform: 'rotate(45deg)' }} />
        <span className="hidden sm:block uppercase text-stone" style={{ fontSize: 11, letterSpacing: '.16em' }}>
          Every order earns entries · No purchase necessary
        </span>
        <Link href="/giveaway" className="uppercase text-linen" style={{ fontSize: 11, letterSpacing: '.16em', borderBottom: '1px solid rgba(232,220,194,.4)', paddingBottom: 1 }}>
          Enter now
        </Link>
      </div>

      {/* Nav bar */}
      <div style={{ background: 'rgba(13,11,8,.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,164,92,.14)' }}>
        <div className="max-w-v2 mx-auto flex items-center gap-10 h-[72px]" style={{ padding: '0 32px' }}>
          <Link href="/" className="flex items-center flex-none" aria-label="Lootix — home">
            <img src="/brand/site/logo.png" alt="Lootix Streetwear" style={{ height: 38, display: 'block' }} />
          </Link>

          <nav className="hidden lg:flex gap-[30px] items-center flex-1">
            {NAV.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="uppercase transition-colors"
                  style={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    letterSpacing: '.12em',
                    padding: '6px 0',
                    color: active ? '#E8DCC2' : '#A79878',
                    boxShadow: active ? 'inset 0 -2px 0 #C9A45C' : 'none',
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-[18px] flex-none ml-auto lg:ml-0">
            <Link href="/giveaway" className="hidden sm:inline-flex btn-brass" style={{ padding: '11px 20px', fontSize: 12, letterSpacing: '.14em' }}>
              <TicketIcon /> Enter the Vault
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative flex items-center text-sand hover:text-linen transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>
              <span
                className="absolute flex items-center justify-center"
                style={{ top: -6, right: -8, background: '#C9A45C', color: '#14100A', fontSize: 9.5, fontWeight: 700, width: 15, height: 15, borderRadius: '50%' }}
              >
                2
              </span>
            </Link>
            {/* Mobile menu trigger */}
            <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="lg:hidden flex text-sand p-1 -mr-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
