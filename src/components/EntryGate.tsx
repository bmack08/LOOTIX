'use client';

import type { ReactNode } from 'react';
import { useEntryWindow } from '@/components/lootix/useEntryWindow';

/**
 * Shows `children` only while the giveaway entry window is open (LIVE), and
 * `fallback` (default: nothing) in every other state, including PRE-START.
 *
 * Use it around any per-dollar entry cue (ENTRIES_LABEL, "N entries", "earn
 * entries") on pages that are not themselves re-rendered by the clock. It
 * starts closed on the server and on first client render, so the markup is
 * hydration-safe and the default is the PRE-START wording; it then settles to
 * the real value after mount (see useEntryWindow). Server pages that already
 * call isEntryWindowOpen() (home, giveaways, winners, past-winners) branch
 * directly instead.
 */
export default function EntryGate({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const open = useEntryWindow();
  return <>{open ? children : fallback}</>;
}