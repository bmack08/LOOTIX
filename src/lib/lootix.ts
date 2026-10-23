// ─────────────────────────────────────────────────────────────
// LOOTIX · site content + giveaway config
// Single source of truth for the home page. Edit values here —
// components read from this file so copy/data changes never touch JSX.
// ─────────────────────────────────────────────────────────────

import { MAIL_IN_ENTRIES, SIGNUP_ENTRIES, ENTRIES_LABEL } from '@/config/giveaway';
import { COMPANY_ADDRESS } from '@/config/legal';

/**
 * Entries granted per non-purchase action. The numbers themselves live in
 * src/config/giveaway.ts — this map only routes a source name to one of them.
 * Order entries are NOT here: they are per-dollar and computed server-side
 * from the Stripe session (see entriesForSubtotalCents).
 */
export const ENTRY_GRANTS: Record<string, number> = {
  subscribe: SIGNUP_ENTRIES,
  'mail-in': MAIL_IN_ENTRIES,
};

/** The prize label recorded on a draw / shown when the vault unlocks. */
export const GIVEAWAY_PRIZE = '$250 cash + custom Lootix hoodie + custom Lootix tee';

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
  'WIN $250 + CUSTOM HOODIE & TEE',
  '★ NO PURCHASE NECESSARY',
  'SHIPS TO THE US ONLY',
  '★ RANDOM.ORG DRAW, SCREEN-RECORDED',
  ENTRIES_LABEL.toUpperCase(),
];

// Launch-honest stats (no fabricated track record before the first draw).
export const STATS = [
  { value: '$250', label: 'Cash in the Grand Prize', gold: true },
  { value: '1 : $1', label: 'Entries per Dollar', gold: false },
  { value: 'FREE', label: 'Entry by Mail', gold: false },
  { value: 'RANDOM.ORG', label: 'Random Draw', gold: true },
];

export const VAULT = {
  badge: 'Grand Prize',
  value: '$250',
  subtitle: '+ Custom Hoodie & Tee · Launch Drop',
  perks: [
    '$250 cash, paid by PayPal',
    'Custom Lootix hoodie (value TBD)',
    'Custom Lootix tee (value TBD)',
  ],
};

export const ENTRY_TIERS = [
  { name: 'Starter Pack', desc: '1 tee', price: '$45', popular: false },
  { name: 'Hero Bundle', desc: 'Hoodie + tee', price: '$130', popular: true },
  { name: 'Legend Vault', desc: 'Full fit + accessories · ships free over $100', price: '$150', popular: false },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Pick your legendary gear from limited fantasy-streetwear collections. New drops land every month.', warm: false },
  { n: '02', title: 'Earn entries', body: `${ENTRIES_LABEL} — every dollar of your order subtotal is one entry. Free entry is also available by mail.`, warm: true },
  { n: '03', title: 'Win the loot', body: 'The winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted, and payout is public.', warm: false },
];

// Real Lootix product designs (from the MERCH folder). `well` sets the photo
// backdrop tone; `size`/`pos` crop the source (the tee mockups share one 2-up image).
export const DROPS = [
  { name: 'Lord of Flame', meta: 'Fantasy Streetwear · Heavyweight Tee', price: '$45', entries: ENTRIES_LABEL, img: '/brand/products/lord-of-flame.png', well: 'dark', size: 'cover', pos: 'center' },
  { name: 'Nat 20 Tee', meta: 'Fantasy Streetwear · Regular Fit', price: '$45', entries: ENTRIES_LABEL, img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '24% 42%' },
  { name: 'Hoard Dragon Tee', meta: 'Fantasy Streetwear · Camo', price: '$45', entries: ENTRIES_LABEL, img: '/brand/products/tees-2up.png', well: 'light', size: '240%', pos: '77% 42%' },
];

// Locked "achievement" milestones — the Winners Vault hasn't been unlocked yet.
// The first is claimable NOW ("be our first winner"); the rest are future unlocks.
export const MILESTONES = [
  {
    title: 'First Winner',
    state: 'next' as const,
    tag: 'Unclaimed',
    desc: `The first name ever etched onto the Winners Wall. ${ENTRIES_LABEL}, or enter free by mail — it could be yours.`,
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
    hidden: true,
  },
].filter((m) => !m.hidden); // entries flagged hidden: true are not shown; delete the flag to show them again

export const COMPANY = {
  legalName: 'Lootix LLC',
  location: 'Maryland, USA',
  address: COMPANY_ADDRESS,
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
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ] },
];
