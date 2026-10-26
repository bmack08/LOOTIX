// Giveaway master switch.
//
// GIVEAWAY_ENABLED is false unless NEXT_PUBLIC_GIVEAWAY_ENABLED is exactly
// "true" at build time. While false:
//   - isEntryWindowOpen() always returns false, so no entries are granted
//     (orders, sign-ups, mail-in) and every countdown / entry UI stays hidden;
//   - the "Enter Giveaway" CTAs and entry-earning lines are not rendered;
//   - /api/subscribe still saves the email as a plain list sign-up.
// No imports here on purpose: src/lib/site.ts depends on this file.
export const GIVEAWAY_ENABLED: boolean = process.env.NEXT_PUBLIC_GIVEAWAY_ENABLED === 'true';

/** Pre-start note under the home 'Join the list' line and giveaway card (shown only while off). */
export const JOIN_LIST_NOTE =
  'Joining the list does not enter you in the giveaway. Entries open when it starts. No purchase necessary.';

/** Pre-start note on store surfaces and above the checkout button (shown only while off). */
export const PRE_START_ORDER_NOTE = 'Orders placed before the giveaway starts do not earn entries.';

/** /giveaways body while off: no prize, ARV or dates. */
export const GIVEAWAY_PLACEHOLDER_BODY =
  'Coming soon. Official Rules will be posted before entries open. Open to legal U.S. and D.C. residents 18+. No purchase necessary.';

// Teaser switch. GIVEAWAY_TEASERS_ENABLED is true unless NEXT_PUBLIC_GIVEAWAY_TEASERS
// is exactly "false" at build time. When it is false AND the giveaway is off, every
// giveaway teaser is hidden (ticker line, nav/footer links, home giveaway sections,
// store/cart giveaway links and notes, footer no-purchase line) and /giveaways and
// /winners redirect to / (so do /current-giveaway and /past-winners, which redirect
// to them in next.config).
export const GIVEAWAY_TEASERS_ENABLED: boolean = process.env.NEXT_PUBLIC_GIVEAWAY_TEASERS !== 'false';

/** True when any giveaway mention may render: giveaway on, or teasers on. */
export const SHOW_GIVEAWAY_TEASERS: boolean = GIVEAWAY_ENABLED || GIVEAWAY_TEASERS_ENABLED;
