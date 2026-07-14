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

/** Days from first load until the current draw closes (client countdown). */
export const COUNTDOWN_DAYS = 6;
export const COUNTDOWN_EXTRA = { hours: 14, minutes: 22 };

/** Show the "entries claimed" scarcity bar on the vault card. */
export const SHOW_SCARCITY = true;

export const NAV_LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'Giveaways', href: '#giveaways' },
  { label: 'How It Works', href: '#how' },
  { label: 'Winners', href: '#winners' },
];

export const MARQUEE_ITEMS = [
  '★ EVERY ORDER = ENTRIES',
  'WIN $250 + FREE MERCH',
  '★ NO PURCHASE NECESSARY',
  'SHIPS WORLDWIDE',
  '★ WINNER DRAWN LIVE',
  `${MULT_LABEL} ENTRIES ON ALL ORDERS`,
];

export const STATS = [
  { value: '$240K+', label: 'Prizes Awarded', gold: true },
  { value: '38', label: 'Winners Paid', gold: false },
  { value: '3,800+', label: '5-Star Reviews', gold: false },
  { value: MULT_LABEL, label: 'Entries / Order', gold: true },
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
  scarcity: { claimed: 312, goal: 1000 },
};

export const ENTRY_TIERS = [
  { name: 'Starter Pack', desc: '1 tee · ships free over $75', price: '$35', entries: '60 entries', popular: false },
  { name: 'Hero Bundle', desc: 'Hoodie + tee · free shipping', price: '$75', entries: '150 entries', popular: true },
  { name: 'Legend Vault', desc: 'Full fit + accessories · best odds', price: '$150', entries: '350 entries', popular: false },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Pick your legendary gear from limited fantasy-streetwear collections. New drops land every month.', warm: false },
  { n: '02', title: 'Earn entries', body: `Every order automatically lands you up to ${MULT_LABEL} entries. The more you cop, the bigger your odds.`, warm: true },
  { n: '03', title: 'Win the loot', body: 'Winners drawn live every month. Cash, tech and trips — paid out fast and verified publicly.', warm: false },
];

// Real Lootix product designs (from the MERCH folder). `well` sets the photo
// backdrop tone; `size`/`pos` crop the source (the tee mockups share one 2-up image).
export const DROPS = [
  { name: 'Lord of Flame', meta: 'Fantasy Streetwear · Heavyweight Tee', price: '$42', rating: '4.9', entries: `+${MULT_LABEL} entries`, img: '/brand/products/lord-of-flame.png', well: 'dark', size: 'cover', pos: 'center' },
  { name: 'Nat 20 Tee', meta: 'Fantasy Streetwear · Regular Fit', price: '$38', rating: '5.0', entries: '+150 entries', img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '24% 42%' },
  { name: 'Hoard Dragon Tee', meta: 'Fantasy Streetwear · Camo', price: '$44', rating: '4.8', entries: `+${MULT_LABEL} entries`, img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '77% 42%' },
];

export const PRIZES = [
  { kind: 'Cash', title: '$5,000 Cash Drop', status: 'Live', meta: '3,420 entered', ends: 'Ends in 4 days', cta: 'Enter Now', primary: false, img: '/brand/ref-street-1.jpg' },
  { kind: 'Tech', title: 'Battlestation PC', status: 'Live', meta: '1,890 entered', ends: 'Ends in 9 days', cta: 'Enter Now', primary: false, img: '/brand/cg-1247.png' },
  { kind: 'Travel', title: 'Tokyo Trip for 2', status: 'Soon', meta: 'Opens July 1', ends: 'Get notified', cta: 'Notify Me', primary: true, img: '/brand/cg-1309.png' },
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

export const FOOTER_COLS = [
  { title: 'Shop', links: ['New Drops', 'Hoodies', 'Tees', 'Accessories'] },
  { title: 'Giveaways', links: ['Current Vault', 'How It Works', 'Past Winners', 'Official Rules'] },
  { title: 'Company', links: ['About', 'Contact', 'Shipping & Returns', 'Privacy & Terms'] },
];
