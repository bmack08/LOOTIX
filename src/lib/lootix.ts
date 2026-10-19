// ─────────────────────────────────────────────────────────────
// LOOTIX · site content + giveaway config
// Single source of truth for the home page. Edit values here —
// components read from this file so copy/data changes never touch JSX.
// ─────────────────────────────────────────────────────────────

/** Entries earned per order (drives the "60×" multiplier label everywhere). */
export const ENTRY_MULTIPLIER = 60;
export const MULT_LABEL = `${ENTRY_MULTIPLIER}×`;

/** Free entries granted per action. Email signup is the "no purchase necessary" path. */
export const ENTRY_GRANTS: Record<string, number> = {
  newsletter: 25,
  'giveaway-first-winner': 25,
  'enter-to-win': 25,
  'mail-in': 25,
  order: ENTRY_MULTIPLIER, // × quantity, applied at checkout (Phase 4)
};

/** The prize label recorded on a draw / shown when the vault unlocks. */
export const GIVEAWAY_PRIZE = '$250 + Free Merch Bundle';

/**
 * There is deliberately no countdown offset here any more. `COUNTDOWN_DAYS = 6`
 * and `COUNTDOWN_EXTRA = { hours: 14, minutes: 22 }` were invented constants
 * measured from whenever the visitor happened to load the page, so every
 * visitor saw a different "draw closes in" clock and it never reached zero.
 * The real draw date lives in `GIVEAWAY.drawDateISO` (@/lib/site) and is read
 * through `etWallClockToEpochMs`; the countdown stays hidden until
 * `SWEEPSTAKES_OPEN` is true.
 */

/**
 * The "entries claimed" scarcity bar is gone. It rendered `VAULT.scarcity`,
 * which was a pair of hard-coded constants (`claimed: 312`, `goal: 1000`) and
 * not a read of real entry data from @/lib/raffle — so it has been removed
 * rather than switched off.
 */

// `boxed` = outlined/emphasized nav tab (draws the eye to conversion pages,
// per the 80Eighty pattern of boxing the giveaway tabs).
export const NAV_LINKS = [
  { label: 'Shop', href: '/shop', boxed: false },
  { label: 'Giveaways', href: '/giveaways', boxed: true },
  { label: 'How It Works', href: '/how-it-works', boxed: false },
  { label: 'Winners', href: '/winners', boxed: true },
];

export const MARQUEE_ITEMS = [
  '★ EVERY ORDER = ENTRIES',
  'WIN $250 + FREE MERCH',
  '★ NO PURCHASE NECESSARY',
  'SHIPS WORLDWIDE',
  '★ WINNER DRAWN LIVE',
  `${MULT_LABEL} ENTRIES ON ALL ORDERS`,
];

// Launch-honest stats (no fabricated track record before the first draw).
// Note "ON STREAM" rather than a bare "LIVE", which reads as "the giveaway is
// running right now" — the same correction already documented in @/lib/site.
export const STATS = [
  { value: '$250', label: 'Launch Grand Prize', gold: true },
  { value: MULT_LABEL, label: 'Entries / Order', gold: false },
  { value: 'FREE', label: 'Entry Available', gold: false },
  { value: 'ON STREAM', label: 'Independent Draw', gold: true },
];

export const VAULT = {
  badge: 'Grand Prize',
  value: '$250',
  subtitle: '+ Free Merch Bundle · Launch Drop',
  perks: [
    '$250 cash, paid instantly',
    'Full Lootix merch bundle',
    "Winner's pick from the launch drop",
  ],
};

export const ENTRY_TIERS = [
  { name: 'Starter Pack', desc: '1 tee · ships free over $75', price: '$35', entries: '60 entries', popular: false },
  { name: 'Hero Bundle', desc: 'Hoodie + tee · free shipping', price: '$75', entries: '150 entries', popular: true },
  { name: 'Legend Vault', desc: 'Full fit + accessories · best odds', price: '$150', entries: '350 entries', popular: false },
];

// Written so nothing claims a track record or a cadence that does not exist.
// Step 03 previously read "Winners drawn live every month" — there has never
// been a draw, and no monthly cadence is promised in the Official Rules. Step
// 02 asserted in the present tense that every order "lands you" entries, which
// is false while SWEEPSTAKES_OPEN is false.
export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Pick your legendary gear from limited fantasy-streetwear collections. Every piece is numbered — never mass produced.', warm: false },
  { n: '02', title: 'Earn entries', body: 'Once the giveaway opens, every item will carry a flat entry count printed on the card, and your total will show at checkout. The sweepstakes has not started yet, so no order is earning entries.', warm: true },
  { n: '03', title: 'Win the loot', body: 'An independent third party will draw the winner live on stream. Paid fast, announced publicly, verified always.', warm: false },
];

// Real Lootix product designs (from the MERCH folder). `well` sets the photo
// backdrop tone; `size`/`pos` crop the source (the tee mockups share one 2-up image).
//
// No `rating` field: the old `'4.9'` / `'5.0'` / `'4.8'` star ratings were
// invented. There is no review system and no order history to average, so the
// star line they fed has been removed rather than given a placeholder value.
export const DROPS = [
  { name: 'Lord of Flame', meta: 'Fantasy Streetwear · Heavyweight Tee', price: '$42', entries: `+${MULT_LABEL} entries`, img: '/brand/products/lord-of-flame.png', well: 'dark', size: 'cover', pos: 'center' },
  { name: 'Nat 20 Tee', meta: 'Fantasy Streetwear · Regular Fit', price: '$38', entries: '+150 entries', img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '24% 42%' },
  { name: 'Hoard Dragon Tee', meta: 'Fantasy Streetwear · Camo', price: '$44', entries: `+${MULT_LABEL} entries`, img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '77% 42%' },
];

/**
 * Future vaults. None of these is running, so none carries an entrant count or
 * a closing date: the old rows claimed `'3,420 entered'` / `'1,890 entered'`
 * and `'Ends in 4 days'` / `'Ends in 9 days'` on giveaways badged "Live" that
 * had never opened. Those strings were invented — there is no entries table to
 * count — so the status is now the honest lock state and the entrant/deadline
 * fields are gone. Mirrors `UPCOMING` in @/lib/site.
 */
export const PRIZES = [
  { kind: 'Cash', title: '$1,000 Cash Drop', status: 'Unlocks next', desc: 'Opens after the Launch Vault winner is drawn and paid.', cta: 'See the Giveaway', primary: false, img: '/brand/ref-street-1.jpg' },
  { kind: 'Tech', title: 'Battlestation PC', status: 'Locked', desc: 'A full custom build. Unlocks once the guild passes 1,000 members.', cta: 'See the Giveaway', primary: false, img: '/brand/cg-1247.png' },
  { kind: 'Travel', title: 'Tokyo Trip for 2', status: 'Locked', desc: 'Flights + hotel. The endgame vault — unlocks at 100 verified winners paid.', cta: 'Notify Me', primary: true, img: '/brand/cg-1309.png' },
];

// Locked "achievement" milestones — the Winners Vault hasn't been unlocked yet.
// The first is claimable NOW ("be our first winner"); the rest are future unlocks.
export const MILESTONES = [
  {
    title: 'First Winner',
    state: 'next' as const,
    tag: 'Unclaimed',
    desc: 'The first name ever etched into the Loot Vault. Every order is an entry — it could be yours.',
  },
  {
    title: 'The $1K Club',
    state: 'locked' as const,
    tag: 'Locked',
    desc: 'Unlocks once the Vault has awarded its first $1,000 in prizes.',
  },
  {
    title: 'Legend Status',
    state: 'locked' as const,
    tag: 'Locked',
    desc: 'Unlocks at 100 verified winners paid. The guild has a long quest ahead.',
  },
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
  { title: 'Shop', links: [
    { label: 'New Drops', href: '/new-drops' },
    { label: 'Shop All', href: '/shop' },
    { label: 'Mens', href: '/mens' },
    { label: 'Womens', href: '/womens' },
  ] },
  { title: 'Giveaways', links: [
    { label: 'Current Giveaway', href: '/giveaways' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Past Winners', href: '/winners' },
    { label: 'Official Rules', href: '/official-rules' },
  ] },
  { title: 'Company', links: [
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ] },
];
