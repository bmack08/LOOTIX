'use client';

// "Shop ▾" collections menu (APG disclosure). Click toggles; hover opens
// after 150ms on desktop. Esc closes and returns focus to the trigger.

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export const MENU_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: 'Shop', links: [
    { label: 'All', href: '/shop' }, { label: 'New', href: '/collections/new' }, { label: 'Hoodies', href: '/collections/hoodies' },
    { label: 'Tees', href: '/collections/tees' }, { label: 'Hats', href: '/collections/hats' },
  ] },
  { title: 'Fit', links: [
    { label: "Men's", href: '/collections/mens' }, { label: "Women's", href: '/collections/womens' }, { label: 'Cropped', href: '/collections/cropped' },
  ] },
  { title: 'Collections', links: [
    { label: 'Launch collection', href: '/collections/launch' }, { label: 'Lootix Wordmark', href: '/collections/wordmark' }, { label: 'Lootix Mark', href: '/collections/mark' },
  ] },
];

export default function ShopMenu({ feature }: { feature: { title: string; img: string; href: string } | null }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const hover = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [open]);

  const enter = () => { clearTimeout(hover.current); hover.current = setTimeout(() => setOpen(true), 150); };
  const leave = () => { clearTimeout(hover.current); hover.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div
      ref={wrap}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <button ref={btn} type="button" className="hdr-link" aria-expanded={open} aria-controls="hdr-shop-menu" onClick={() => setOpen((o) => !o)}>
        Shop <span aria-hidden="true">&#9662;</span>
      </button>
      <div id="hdr-shop-menu" className="hdr-mega" hidden={!open}>
        <div className="hdr-mega-inner">
          {MENU_GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="hdr-mega-h">{g.title}</h2>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          {feature && (
            <Link href={feature.href} className="hdr-feature" onClick={() => setOpen(false)}>
              <img src={feature.img} alt="" loading="lazy" />
              <span>New in &middot; {feature.title}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
