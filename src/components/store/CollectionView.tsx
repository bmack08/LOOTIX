'use client';

// Grid for /shop and /collections/[handle]. Size / Color / Sort live in the
// query (?size=M&color=Black&sort=price-asc) so a filtered view can be
// shared and survives back/forward.

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Card } from '@/config/collections';
import ProductCard from './ProductCard';

type Chip = { handle: string; title: string };
type Props = { handle: string; title: string; cards: Card[]; chips: Chip[]; crumbs: { href?: string; label: string }[] };

const SORTS = [
  { v: 'featured', label: 'Featured' },
  { v: 'price-asc', label: 'Price: low to high' },
  { v: 'price-desc', label: 'Price: high to low' },
  { v: 'name', label: 'Name' },
] as const;

type Q = { size: string; color: string; sort: string };
const EMPTY: Q = { size: '', color: '', sort: 'featured' };

function readQ(): Q {
  const p = new URLSearchParams(window.location.search);
  return { size: p.get('size') ?? '', color: p.get('color') ?? '', sort: p.get('sort') ?? 'featured' };
}

export default function CollectionView({ handle, title, cards, chips, crumbs }: Props) {
  const [q, setQ] = useState<Q>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setQ(readQ());
    setReady(true);
    const on = () => setQ(readQ());
    window.addEventListener('popstate', on);
    return () => window.removeEventListener('popstate', on);
  }, []);

  function update(next: Partial<Q>) {
    const merged = { ...q, ...next };
    setQ(merged);
    const u = new URL(window.location.href);
    for (const k of ['size', 'color', 'sort'] as const) {
      const v = merged[k];
      if (!v || (k === 'sort' && v === 'featured')) u.searchParams.delete(k);
      else u.searchParams.set(k, v);
    }
    window.history.pushState(null, '', u.toString());
  }

  const sizes = useMemo(() => {
    const order = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
    const have = new Set(cards.flatMap((c) => c.sizes));
    return order.filter((s) => have.has(s));
  }, [cards]);
  const colours = useMemo(() => [...new Set(cards.flatMap((c) => c.colours.map((x) => x.colour)))].sort(), [cards]);

  const shown = useMemo(() => {
    const out: { card: Card; colour?: string }[] = [];
    for (const card of cards) {
      const fits = card.colours.filter(
        (c) => (!q.color || c.colour === q.color) && (!q.size || c.inStock.includes(q.size)),
      );
      if (!fits.length) continue;
      out.push({ card, colour: q.color || q.size ? fits[0].key : undefined });
    }
    if (q.sort === 'price-asc') out.sort((a, b) => a.card.priceValue - b.card.priceValue);
    if (q.sort === 'price-desc') out.sort((a, b) => b.card.priceValue - a.card.priceValue);
    if (q.sort === 'name') out.sort((a, b) => a.card.title.localeCompare(b.card.title));
    return out;
  }, [cards, q]);

  const filtered = q.size || q.color;

  return (
    <div className="text-parchment store-collection">
      <nav aria-label="Breadcrumb" className="pdp-crumbs font-plex uppercase text-stone">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex gap-2">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page" className="text-sand">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <header className="store-head">
        <h1 className="m-0 uppercase">{title}</h1>
        <span className="font-plex text-stone" aria-live="polite">{shown.length} product{shown.length === 1 ? '' : 's'}</span>
      </header>

      <div className="store-filters">
        <nav aria-label="Categories" className="store-chips">
          {chips.map((c) => (
            <Link key={c.handle} href={c.handle === 'all' ? '/shop' : `/collections/${c.handle}`} aria-current={c.handle === handle ? 'page' : undefined} className="store-chip">
              {c.title}
            </Link>
          ))}
        </nav>
        <div className="store-selects">
          <label>
            <span className="sr-only">Size</span>
            <select value={q.size} onChange={(e) => update({ size: e.target.value })}>
              <option value="">Size: All</option>
              {sizes.map((s) => <option key={s} value={s}>Size: {s}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Color</span>
            <select value={q.color} onChange={(e) => update({ color: e.target.value })}>
              <option value="">Color: All</option>
              {colours.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <select value={q.sort} onChange={(e) => update({ sort: e.target.value })}>
              {SORTS.map((s) => <option key={s.v} value={s.v}>Sort: {s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {!ready ? (
        <div className="store-grid" aria-busy="true">
          {cards.slice(0, 8).map((c) => <span key={c.handle} className="skel" style={{ aspectRatio: '1 / 1.3' }} />)}
        </div>
      ) : shown.length === 0 ? (
        <div className="store-empty">
          <p className="m-0">{filtered ? 'No products match these filters.' : 'Nothing here yet.'}</p>
          {filtered ? (
            <button type="button" className="btn-brass" onClick={() => update({ size: '', color: '' })}>Clear filters</button>
          ) : (
            <Link href="/shop" className="btn-brass">Back to shop</Link>
          )}
        </div>
      ) : (
        <div className="store-grid">
          {shown.map(({ card, colour }, i) => <ProductCard key={card.handle} card={card} colour={colour} priority={i < 4} />)}
        </div>
      )}
    </div>
  );
}
