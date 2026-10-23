'use client';

import { useEffect, useState } from 'react';
import { isEntryWindowOpen } from '@/lib/site';

/**
 * Is the entry window open, from the client's point of view?
 *
 * Starts `false` so the server-rendered HTML and the first client render always
 * agree (no hydration mismatch), then settles to the real value after mount and
 * re-checks every 30s — so a tab left open across the start or the entry
 * close updates itself instead of showing a stale "Enter" / "Live" state.
 * (The close time as the copy prints it is GIVEAWAY_CLOSE_TIME_LABEL in
 * src/config/giveaway.ts.)
 *
 * `false` is the safe default: it means "Join the list", never "enter to win".
 */
export function useEntryWindow(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => setOpen(isEntryWindowOpen());
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return open;
}
