// ─────────────────────────────────────────────────────────────
// Sweepstakes status — one switch for the whole site.
//
// The Launch Vault sweepstakes has NOT started. Until it does the site must
// not say it is live, must not run a countdown to a draw, and must not tell
// anyone that an order or a signup earns entries.
//
// Flip SWEEPSTAKES_OPEN to true only once the finalized Official Rules are
// published on /official-rules and the start date has passed. Everything
// gated on it (countdown, entry packs, entry counts, the draft rules text)
// comes back on when it flips.
// ─────────────────────────────────────────────────────────────

/**
 * False until the sweepstakes opens.
 * Typed `boolean`, not the literal `false`, so both branches stay live code
 * and the compiler does not prune the "open" paths.
 */
export const SWEEPSTAKES_OPEN: boolean = false;

/** Status label shown wherever the giveaway used to be badged "Live now". */
export const COMING_SOON_LABEL = 'Coming soon';

/** The only sweepstakes text /official-rules may show before the start date. */
export const RULES_NOT_STARTED =
  'This sweepstakes has not started yet. Official Rules will be posted before it opens.';
