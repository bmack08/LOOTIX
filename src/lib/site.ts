// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — "Earn it. Wear it. Loot it."
// Content config mirroring the GetLootix Website Evaluation designs.
// ─────────────────────────────────────────────────────────────

// The giveaway has not started — see @/config/sweepstakes. Nothing here may
// claim entries are being earned or that a draw is running.
export const TICKER = [
  '◆ Giveaway coming soon',
  'Drop 1 · Coming soon',
  '◆ Official Rules posted before it opens',
  'No purchase necessary',
  '◆ Winner drawn live & independent',
  'Ships worldwide',
];

/** `soon` renders the "Coming soon" status badge beside the nav label. */
export const NAV: { label: string; href: string; soon?: boolean }[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'Giveaways', href: '/giveaways', soon: true },
  { label: 'Winners', href: '/winners' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

/**
 * The giveaway. Unused while `SWEEPSTAKES_OPEN` is false — the countdown that
 * reads `drawDateISO` is hidden until the sweepstakes actually opens, and the
 * date below is a placeholder that must be reset from the finalized Official
 * Rules before it is shown again.
 *
 * There is deliberately no entries-claimed / goal pair here any more: the old
 * `entriesClaimed: 312` / `entriesGoal: 1000` were hard-coded constants, not a
 * read of real entry data, so the progress bar they fed has been removed.
 */
export const GIVEAWAY = {
  /**
   * Draw close, as a naive wall-clock time in Eastern Time — the zone the
   * Official Rules name as the official timekeeper. Never add an offset or a
   * trailing "Z" here; read it through `etWallClockToEpochMs` in @/lib/time,
   * which resolves it against America/New_York (EDT/EST) for every viewer.
   */
  drawDateISO: '2026-08-01T20:00:00',
};

export const STATS = [
  { value: '$250', label: 'Launch grand prize' },
  { value: 'SOON', label: 'Giveaway opens — entries not open yet' },
  { value: 'FREE', label: 'Entry method · equal odds' },
  // Not "LIVE": a bare LIVE badge reads as "the giveaway is running now".
  { value: 'ON STREAM', label: 'Independent recorded draw' },
];

export type Product = {
  name: string;
  sub: string;
  price: string;
  entries: number;
  edition: string;
  img: string;
};

export const PACKS = [
  { name: 'Starter Pack', sub: '1 tee · ships free over $75', price: '$35', entries: 60, popular: false, cta: 'Grab Starter' },
  { name: 'Hero Bundle', sub: 'Hoodie + tee · free shipping', price: '$75', entries: 150, popular: true, cta: 'Grab Hero' },
  { name: 'Legend Vault', sub: 'Full fit + accessories · best odds', price: '$150', entries: 350, popular: false, cta: 'Grab Legend' },
];

/** Future vaults — unlock only after the current one pays out. No fake countdowns. */
export const UPCOMING = [
  { tag: 'Vault 002', name: '$1,000 Cash Drop', status: 'Unlocks next', desc: 'Opens after the Launch Vault winner is drawn and paid. Every Drop 002 order will enter.' },
  { tag: 'Vault 003', name: 'Battlestation PC', status: 'Locked', desc: 'A full custom build. Unlocks once the guild passes 1,000 members.' },
  { tag: 'Vault 004', name: 'Tokyo Trip for 2', status: 'Locked', desc: 'Flights + hotel. The endgame vault — unlocks at 100 verified winners paid.' },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Cop limited fantasy-streetwear from the current drop. Every piece is numbered — never mass produced.' },
  { n: '02', title: 'Stack entries', body: 'Once the giveaway opens, every item will carry a flat entry count printed on the card, and your total will show at checkout and in your confirmation email. No entries are being earned yet.' },
  { n: '03', title: 'Win the loot', body: 'An independent third party will draw the winner live on stream. Paid fast, announced publicly, verified always.' },
];

export const PROOF = [
  { icon: '⚖', title: 'Independent draw', body: 'A third-party administrator runs the random draw — never us.' },
  { icon: '◉', title: 'Recorded live', body: 'Every draw streams live and stays archived on our channels.' },
  { icon: '◆', title: 'Winners published', body: 'Every winner is named on the Winners page and socials, with payout proof.' },
  { icon: '✉', title: 'Free entry, equal odds', body: 'The mail-in method in the Official Rules carries the same odds as any order.' },
];

export const COMPANY = {
  legalName: 'Lootix LLC',
  location: 'Maryland, USA',
  email: 'hello@getlootix.com',
  socials: {
    instagram: 'https://instagram.com/getlootix',
    tiktok: 'https://tiktok.com/@getlootix',
    discord: 'https://discord.gg/lootix',
  },
};

export const FOOTER_COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'Drop 1', href: '/shop' },
      { label: 'Shop All', href: '/shop' },
      { label: 'Quick Entries', href: '/shop' },
      { label: 'Accessories', href: '/shop' },
    ],
  },
  {
    title: 'Giveaways',
    links: [
      { label: 'Current Giveaway', href: '/giveaways' },
      { label: 'How It Works', href: '/about' },
      { label: 'Winners', href: '/winners' },
      { label: 'Official Rules', href: '/official-rules' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/faq' },
      { label: 'Contact', href: '/faq' },
      { label: 'Privacy & Terms', href: '/official-rules' },
      { label: 'DMCA / Copyright', href: '/dmca' },
    ],
  },
];
