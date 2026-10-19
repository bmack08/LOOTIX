import { redirect } from 'next/navigation';

/**
 * RETIRED — the Quick Entries page is gone.
 *
 * It sold the idea that you could buy or grind extra entries, which is no
 * longer true (and was never actually implemented): one order earns exactly
 * one entry, one mail-in card one entry, one email sign-up one entry. The page
 * also hosted BonusEntryActions — "follow us on Twitter for 5 entries" — which
 * awarded nothing at all. It was entirely client-side state: refreshing the
 * page reset it, and no entry ever reached the ledger. Advertising entries the
 * system cannot grant is the kind of claim that invalidates a sweepstakes.
 *
 * next.config.js also 301s /quick-entries → /giveaways. This redirect is the
 * belt-and-braces copy so the route cannot render if that rule is removed.
 *
 * DEAD CODE LEFT BEHIND (delete these — this session lacked permission to):
 *   src/components/quick-entries/QuickEntriesHero.tsx
 *   src/components/quick-entries/ActiveGiveawayGrid.tsx
 *   src/components/quick-entries/BonusEntryActions.tsx
 *   src/components/quick-entries/QuickEntryForm.tsx
 * Nothing imports them any more, so they are not shipped in the bundle.
 */
export default function QuickEntriesPage() {
  redirect('/giveaways');
}
