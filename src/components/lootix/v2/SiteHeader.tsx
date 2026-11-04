'use client';

// Store header. ≥1024: logo · SHOP ▾ HOODIES TEES HATS ABOUT · search · ♡ · cart.
// <1024: logo · search icon · ♡ · cart · ☰ (64px tall). No giveaway links here.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TICKER, TICKER_PRE_START } from '@/lib/site';
import { useEntryWindow } from '../useEntryWindow';
import { useCart } from './CartContext';
import { SHOW_GIVEAWAY_TEASERS } from '@/config/flags';
import { useWishlist } from '@/lib/wishlist';
import SearchBox from '@/components/store/header/SearchBox';
import ShopMenu, { MENU_GROUPS } from '@/components/store/header/ShopMenu';

const TICKER_PRE_START_SHOWN = SHOW_GIVEAWAY_TEASERS ? TICKER_PRE_START : TICKER_PRE_START.filter((t) => !/giveaway/i.test(t));
const LINKS = [
  { label: 'Hoodies', href: '/collections/hoodies' },
  { label: 'Tees', href: '/collections/tees' },
  { label: 'Hats', href: '/collections/hats' },
  { label: 'About', href: '/about' },
];
const LOGO = '/brand/lootix-main-logo.svg';

function Ticker() {
  const items = useEntryWindow() ? TICKER : TICKER_PRE_START_SHOWN;
  const Row = () => (
    <div className="inline-flex gap-12 pr-12 font-plex uppercase" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>
      {items.map((t, i) => <span key={i}>{t}</span>)}
    </div>
  );
  return (
    <div style={{ background: '#C6A15B', color: '#0C0A07', overflow: 'hidden', whiteSpace: 'nowrap', padding: '9px 0', borderBottom: '1px solid #0C0A07' }}>
      <div className="inline-flex animate-ticker"><Row /><Row /></div>
    </div>
  );
}

const Icon = {
  search: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" strokeLinecap="round" /></svg>,
  heart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" strokeLinejoin="round" /></svg>,
  bag: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>,
  close: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>,
};

const Badge = ({ n }: { n: number }) => <span className="hdr-badge" data-zero={n === 0 || undefined} aria-hidden="true">{n}</span>;

export default function SiteHeader({ feature = null }: { feature?: { title: string; img: string; href: string } | null }) {
  const pathname = usePathname() || '/';
  const { count } = useCart();
  const { items } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const searchBtn = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); setSearching(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); menuBtn.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const saved = mounted ? items.length : 0;
  const cart = mounted ? count : 0;
  const closeDrawer = () => { setOpen(false); menuBtn.current?.focus(); };

  const drawer = (
    <div ref={drawerRef} className="hdr-drawer lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
      <div className="hdr-drawer-top">
        <img src={LOGO} alt="Lootix" className="hdr-logo" />
        <button type="button" aria-label="Close menu" onClick={closeDrawer} className="hdr-icon">{Icon.close}</button>
      </div>
      <nav aria-label="Menu" className="hdr-drawer-nav">
        {MENU_GROUPS.map((g, k) => (
          <details key={g.title} open={k === 0}>
            <summary>{g.title}</summary>
            <ul>{g.links.map((l) => <li key={l.href}><Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link></li>)}</ul>
          </details>
        ))}
        <Link href="/about" className="hdr-drawer-link" onClick={() => setOpen(false)}>About</Link>
        <Link href="/saved" className="hdr-drawer-link" onClick={() => setOpen(false)}>Saved ({saved})</Link>
      </nav>
    </div>
  );

  return (
    // display:contents so the sticky header is positioned against <body>, not this wrapper.
    <div className="contents">
      <Ticker />
      <header className="hdr">
        <div className="hdr-bar">
          <Link href="/" className="flex-none" aria-label="Lootix home">
            <img src={LOGO} alt="Lootix" className="hdr-logo" />
          </Link>
          <nav aria-label="Main" className="hdr-nav hidden lg:flex">
            <ShopMenu feature={feature} />
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hdr-link" aria-current={active(l.href) ? 'page' : undefined}>{l.label}</Link>
            ))}
          </nav>
          <div className="hidden lg:block hdr-search-wrap"><SearchBox /></div>
          <div className="hdr-actions">
            <button ref={searchBtn} type="button" className="hdr-icon hdr-mobile" aria-label="Search" aria-expanded={searching} onClick={() => setSearching((s) => !s)}>{Icon.search}</button>
            <Link href="/saved" className="hdr-icon" aria-label={`Saved items (${saved})`}>{Icon.heart}<Badge n={saved} /></Link>
            <Link href="/cart" className="hdr-icon" aria-label={`Cart (${cart} items)`}>{Icon.bag}<Badge n={cart} /></Link>
            <button ref={menuBtn} type="button" className="hdr-icon hdr-mobile" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>{Icon.menu}</button>
          </div>
        </div>
        {searching && (
          <div className="hdr-search-row lg:hidden">
            <SearchBox autoFocus onDone={() => { setSearching(false); searchBtn.current?.focus(); }} />
          </div>
        )}
      </header>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
