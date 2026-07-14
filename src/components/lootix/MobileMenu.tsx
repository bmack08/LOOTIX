'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NAV_LINKS } from '@/lib/lootix';
import LootixWordmark from './LootixWordmark';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Drawer is portaled to <body> so it escapes the header's backdrop-filter
  // containing block (which would otherwise trap position:fixed to the header).
  const drawer = (
    <div
      className="md:hidden fixed inset-0 z-[100] transition-opacity duration-300"
      style={{
        backgroundColor: '#0a0a0b',
        backgroundImage: 'radial-gradient(80% 55% at 100% 0%, rgba(212,175,55,.12), transparent 60%)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 h-[74px]" style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        <span className="text-cream"><LootixWordmark height={30} /></span>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-cream p-1 -mr-1">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col px-6 pt-4">
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-archivo font-black uppercase text-cream text-[30px] tracking-[-.01em] py-4 transition-colors hover:text-gold"
            style={{
              borderBottom: '1px solid rgba(255,255,255,.06)',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity .4s ease ${i * 60 + 120}ms, transform .4s ease ${i * 60 + 120}ms, color .2s`,
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="px-6 mt-8">
        <a href="/giveaways" onClick={() => setOpen(false)} className="btn-gold w-full !py-[18px] !text-[15px]">
          Enter to Win — $250 + Merch
        </a>
        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[.16em] uppercase text-muted">
          <span className="w-[6px] h-[6px] rounded-full bg-gold" /> Live Giveaway · Draw Ends Soon
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden flex">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex text-cream p-1 -mr-1"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
