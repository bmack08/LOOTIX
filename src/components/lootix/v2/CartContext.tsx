'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { entriesForSubtotal } from '@/config/giveaway';

export type CartLine = {
  slug: string;
  name: string;
  price: number;   // dollars
  img: string;
  qty: number;
  /**
   * Apparel size (S–2XL) for sized products; absent for products that
   * have no size, and for lines stored before sizes existed. A line is
   * identified by slug + size, so a hoodie in M and the same hoodie in L
   * are two separate lines.
   */
  size?: string;
};

type CartCtx = {
  lines: CartLine[];
  add: (item: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (slug: string, size?: string) => void;
  setQty: (slug: string, qty: number, size?: string) => void;
  clear: () => void;
  count: number;        // total units
  subtotal: number;     // dollars
  /**
   * Estimated entries: 1 per $1 of subtotal. An estimate only — the real
   * count is computed server-side by the Stripe webhook from the paid session.
   */
  totalEntries: number;
  ready: boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'lootix.cart.v1';

/** One line per slug + size. Missing and empty sizes are the same thing. */
function sameLine(line: CartLine, slug: string, size?: string): boolean {
  return line.slug === slug && (line.size || '') === (size || '');
}

/**
 * Read the stored cart defensively. The key is unchanged, so carts saved
 * before sizes existed still load — those lines simply have no size.
 * Anything unrecognisable is dropped instead of crashing the app.
 */
function parseStored(raw: string): CartLine[] {
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) return [];
  const lines: CartLine[] = [];
  for (const entry of data) {
    if (!entry || typeof entry !== 'object') continue;
    const l = entry as Partial<CartLine>;
    if (typeof l.slug !== 'string' || !l.slug) continue;
    if (typeof l.price !== 'number' || !Number.isFinite(l.price)) continue;
    if (typeof l.qty !== 'number' || !Number.isFinite(l.qty) || l.qty <= 0) continue;
    lines.push({
      slug: l.slug,
      name: typeof l.name === 'string' ? l.name : l.slug,
      price: l.price,
      img: typeof l.img === 'string' ? l.img : '',
      qty: Math.floor(l.qty),
      size: typeof l.size === 'string' && l.size ? l.size : undefined,
    });
  }
  return lines;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage (client only, avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(parseStored(raw));
    } catch { /* ignore corrupt cart */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const api = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
    const totalEntries = entriesForSubtotal(subtotal);

    return {
      lines,
      count,
      subtotal,
      totalEntries,
      ready,
      add: (item, qty = 1) =>
        setLines((cur) => {
          const i = cur.findIndex((l) => sameLine(l, item.slug, item.size));
          if (i === -1) return [...cur, { ...item, qty }];
          const next = [...cur];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }),
      remove: (slug, size) => setLines((cur) => cur.filter((l) => !sameLine(l, slug, size))),
      setQty: (slug, qty, size) =>
        setLines((cur) =>
          qty <= 0
            ? cur.filter((l) => !sameLine(l, slug, size))
            : cur.map((l) => (sameLine(l, slug, size) ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, ready]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
