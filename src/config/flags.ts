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
