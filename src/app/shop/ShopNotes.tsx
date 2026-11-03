'use client';

// Footnote + giveaway banner under the /shop grid (moved from the old shop
// page). Giveaway parts stay behind the flags; with them off only the
// shipping note shows.

import Link from 'next/link';
import { SHOW_GIVEAWAY_TEASERS } from '@/config/flags';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { useEntryWindow } from '@/components/lootix/useEntryWindow';
import { ENTRIES_LABEL, FREE_SHIPPING_THRESHOLD } from '@/config/giveaway';

const NOTE = { margin: 0, fontSize: 11, letterSpacing: '0.08em', lineHeight: 1.7 } as const;

export default function ShopNotes() {
  const windowOpen = useEntryWindow();
  const body = (
    <>
      Ships to the US only · free shipping on orders of ${FREE_SHIPPING_THRESHOLD}+. See the{' '}
      <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
    </>
  );
  return (
    <>
      <section className="store-notes" style={{ padding: '0 16px 32px' }}>
        {windowOpen ? (
          <NoPurchaseNotice className="font-plex text-stone" style={NOTE}>{body}</NoPurchaseNotice>
        ) : (
          <p className="font-plex text-stone" style={NOTE}>{body}</p>
        )}
      </section>
      {SHOW_GIVEAWAY_TEASERS && (
        <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '40px 24px', background: '#E4D5B4', color: '#171208' }}>
          <div className="flex flex-col gap-1.5">
            <span className="uppercase" style={{ fontSize: 24, fontWeight: 900 }}>{windowOpen ? 'Every dollar is an entry' : 'Lootix Launch Giveaway'}</span>
            {windowOpen ? (
              <>
                <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
                  {ENTRIES_LABEL.toUpperCase()} · YOUR ENTRY TOTAL SHOWS AT CHECKOUT · RANDOM.ORG DRAW
                </span>
                <NoPurchaseNotice className="m-0" style={{ fontSize: 11.5, lineHeight: 1.7, color: '#4A3D22', maxWidth: 560 }} linkClassName="underline" linkStyle={{ color: '#7A6231' }} />
              </>
            ) : (
              <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>{'DATES COMING SOON \u00b7 JOIN THE LIST'}</span>
            )}
          </div>
          <Link href="/giveaways" className="uppercase transition-colors whitespace-nowrap" style={{ background: '#171208', color: '#E4D5B4', padding: '16px 32px', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}>
            {windowOpen ? 'See the Prize \u2192' : 'See the Giveaway \u2192'}
          </Link>
        </section>
      )}
    </>
  );
}
