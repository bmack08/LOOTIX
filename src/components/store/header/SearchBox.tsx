'use client';

// ARIA combobox (APG list-autocomplete). 2+ chars, 150ms debounce, up to 5
// products, then "See all N results". Arrows move, Enter opens, Esc closes.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { Card } from '@/config/collections';

type State = { kind: 'idle' } | { kind: 'loading' } | { kind: 'done'; all: Card[] } | { kind: 'error' };

function Mark({ text, q }: { text: string; q: string }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase().trim());
  if (!q.trim() || i < 0) return <>{text}</>;
  const n = q.trim().length;
  return <>{text.slice(0, i)}<u>{text.slice(i, i + n)}</u>{text.slice(i + n)}</>;
}

export default function SearchBox({ autoFocus, onDone }: { autoFocus?: boolean; onDone?: () => void }) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-list`;
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (q.trim().length < 2) { setState({ kind: 'idle' }); return; }
    setState({ kind: 'loading' });
    let live = true;
    const t = setTimeout(async () => {
      try {
        const { searchProducts } = await import('@/lib/search');
        if (live) setState({ kind: 'done', all: searchProducts(q) });
      } catch {
        if (live) setState({ kind: 'error' });
      }
    }, 150);
    return () => { live = false; clearTimeout(t); };
  }, [q]);
  useEffect(() => setActive(-1), [state]);

  const shown = state.kind === 'done' ? state.all.slice(0, 5) : [];
  const total = shown.length + (state.kind === 'done' && state.all.length ? 1 : 0);
  const seeAll = `/search?q=${encodeURIComponent(q.trim())}`;
  const go = (href: string) => { setOpen(false); onDone?.(); router.push(href); };
  const expanded = open && state.kind !== 'idle';

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => (total ? (a + 1) % total : -1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (total ? (a - 1 + total) % total : -1)); }
    else if (e.key === 'Escape') { if (expanded) { e.preventDefault(); setOpen(false); setActive(-1); } else { setQ(''); onDone?.(); } }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && active < shown.length) go(`/products/${shown[active].handle}`);
      else if (q.trim()) go(seeAll);
    }
  };
  const opt = (k: number) => `${id}-opt-${k}`;

  return (
    <div className="hdr-search" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <input
        ref={input}
        type="search"
        role="combobox"
        aria-label="Search products"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? opt(active) : undefined}
        placeholder="Search hoodies, tees, hats"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
      />
      <div id={listId} role="listbox" aria-label="Search suggestions" className="hdr-pop" hidden={!expanded}>
        {state.kind === 'loading' && [0, 1, 2].map((k) => <div key={k} className="hdr-skel" aria-hidden="true" />)}
        {state.kind === 'error' && (
          <div className="hdr-msg">Search isn&apos;t working right now. <Link href="/shop" onClick={() => go('/shop')}>Browse the shop</Link></div>
        )}
        {state.kind === 'done' && !state.all.length && (
          <div className="hdr-msg">
            No results for &lsquo;{q.trim()}&rsquo;. Try &lsquo;hoodie&rsquo; or &lsquo;tee&rsquo;.{' '}
            <Link href="/shop">All products</Link> &middot; <Link href="/collections/hoodies">Hoodies</Link>
          </div>
        )}
        {shown.map((c, k) => (
          <div
            key={c.handle}
            id={opt(k)}
            role="option"
            aria-selected={k === active}
            className="hdr-opt"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => go(`/products/${c.handle}`)}
          >
            <img src={c.img} alt="" width={44} height={44} />
            <span className="hdr-opt-name"><Mark text={c.title} q={q} /></span>
            <span className="hdr-opt-meta">{c.price}<br />{c.colours.length} {c.colours.length === 1 ? 'color' : 'colors'}</span>
          </div>
        ))}
        {state.kind === 'done' && state.all.length > 0 && (
          <div id={opt(shown.length)} role="option" aria-selected={active === shown.length} className="hdr-opt hdr-all" onMouseDown={(e) => e.preventDefault()} onClick={() => go(seeAll)}>
            See all {state.all.length} results for &lsquo;{q.trim()}&rsquo;
          </div>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {state.kind === 'done' ? `${state.all.length} results` : ''}
      </p>
    </div>
  );
}
