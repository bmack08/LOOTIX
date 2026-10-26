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
