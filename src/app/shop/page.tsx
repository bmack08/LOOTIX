import Link from 'next/link';
import ShopGrid from '@/components/lootix/v2/ShopGrid';
import { getShopItems } from '@/lib/printful-shop';
import { SWEEPSTAKES_OPEN, COMING_SOON_LABEL } from '@/config/sweepstakes';

// Re-read the Printful store at most every 15 minutes.
export const revalidate = 900;

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default async function ShopPage() {
  const items = await getShopItems();

  return (
    <div className="text-parchment">
      {/* PAGE HEADER */}
      <header className="flex justify-between items-end gap-8 flex-wrap" style={{ padding: '72px 24px 44px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3">
          <span className="v2-eyebrow">Drop 1 · Summon the Loot</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Shop the drop</h1>
          <p className="m-0 text-sand" style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.6 }}>
            {SWEEPSTAKES_OPEN
              ? 'Every item carries a flat entry count into the live giveaway — printed right on the card. You keep the gear either way.'
              : 'Shop the drop for the gear. The Launch Vault giveaway has not started yet, so orders are not earning sweepstakes entries.'}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
          <span className="text-brass-lit">◆ LAUNCH VAULT · $250 + MERCH</span>
          <span>
            {SWEEPSTAKES_OPEN ? 'Draw closes Aug 1' : COMING_SOON_LABEL} ·{' '}
            <Link href="/giveaways" className="text-brass hover:text-brass-lit transition-colors">view giveaway →</Link>
          </span>
        </div>
      </header>

      {/* FILTER BAR + PRODUCT GRID (live from the Printful store) */}
      <ShopGrid items={items} />

      {/* ENTRY BANNER (inverted cream) */}
      <section className="flex items-center justify-between gap-8 flex-wrap" style={{ padding: '40px 24px', background: '#E4D5B4', color: '#171208' }}>
        <div className="flex flex-col gap-1.5">
          <span className="uppercase" style={{ fontSize: 24, fontWeight: 900 }}>
            {SWEEPSTAKES_OPEN ? 'Every cart is a ticket to the vault' : 'The vault opens soon'}
          </span>
          <span className="font-plex" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#7A6231' }}>
            {SWEEPSTAKES_OPEN
              ? 'YOUR ENTRY TOTAL SHOWS AT CHECKOUT · WINNER DRAWN LIVE AUG 1'
              : 'GIVEAWAY NOT STARTED · NO ENTRIES EARNED AT CHECKOUT YET · OFFICIAL RULES POSTED BEFORE IT OPENS'}
          </span>
        </div>
        <Link
          href="/giveaways"
          className="uppercase transition-colors whitespace-nowrap"
          style={{ background: '#171208', color: '#E4D5B4', padding: '16px 32px', fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 2 }}
        >
          See the Prize →
        </Link>
      </section>
    </div>
  );
}
