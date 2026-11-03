'use client';

// Wishlist in localStorage ('lootix:wishlist'): a list of { handle, color }.
// No account. One store shared by every hook via useSyncExternalStore.

import { useCallback, useSyncExternalStore } from 'react';

export type Saved = { handle: string; color: string };
const KEY = 'lootix:wishlist';
const EMPTY: Saved[] = [];
let cache: Saved[] | null = null;
const subs = new Set<() => void>();

function read(): Saved[] {
  if (cache) return cache;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    cache = Array.isArray(v) ? v.filter((x) => x && typeof x.handle === 'string').map((x) => ({ handle: x.handle, color: String(x.color ?? '') })) : [];
  } catch {
    cache = [];
  }
  return cache;
}
function write(next: Saved[]) {
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ }
  subs.forEach((f) => f());
}
function subscribe(f: () => void) {
  subs.add(f);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; f(); } };
  window.addEventListener('storage', onStorage);
  return () => { subs.delete(f); window.removeEventListener('storage', onStorage); };
}

/** Announces wishlist changes to the shared toast/live region. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('lootix:toast', { detail: message }));
}

export function useWishlist() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const has = useCallback((handle: string) => items.some((s) => s.handle === handle), [items]);
  const toggle = useCallback((handle: string, color: string, title: string) => {
    const cur = read();
    if (cur.some((s) => s.handle === handle)) {
      write(cur.filter((s) => s.handle !== handle));
      toast(`Removed ${title} from saved`);
    } else {
      write([...cur, { handle, color }]);
      toast(`Saved ${title}`);
    }
  }, []);
  const remove = useCallback((handle: string) => write(read().filter((s) => s.handle !== handle)), []);
  return { items, has, toggle, remove };
}
