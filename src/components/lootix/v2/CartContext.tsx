'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { entriesForSubtotal } from '@/config/giveaway';

export type CartLine = {
  slug: string;
  name: string;
  price: number;   // dollars
  img: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (item: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage (client only, avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
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
          const i = cur.findIndex((l) => l.slug === item.slug);
          if (i === -1) return [...cur, { ...item, qty }];
          const next = [...cur];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }),
      remove: (slug) => setLines((cur) => cur.filter((l) => l.slug !== slug)),
      setQty: (slug, qty) =>
        setLines((cur) =>
          qty <= 0 ? cur.filter((l) => l.slug !== slug) : cur.map((l) => (l.slug === slug ? { ...l, qty } : l)),
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
