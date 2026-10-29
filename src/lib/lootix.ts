// ─────────────────────────────────────────────────────────────
// LOOTIX · site content + giveaway config
// Single source of truth for the home page. Edit values here —
// components read from this file so copy/data changes never touch JSX.
// ─────────────────────────────────────────────────────────────

import { MAIL_IN_ENTRIES, SIGNUP_ENTRIES, ENTRIES_LABEL } from '@/config/giveaway';
import { COMPANY_ADDRESS } from '@/config/legal';
import { PRINTFUL_CATALOG } from '@/config/printful-catalog';

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
  { name: 'Legend Vault', desc: 'Full fit + accessories · free U.S. shipping on orders of $100+', price: '$150', popular: false },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Pick your legendary gear from fantasy-streetwear collections. New drops land every month.', warm: false },
  { n: '02', title: 'Earn entries', body: `${ENTRIES_LABEL} — every dollar of your order subtotal is one entry. Free entry is also available by mail.`, warm: true },
  { n: '03', title: 'Win the loot', body: 'The winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted. Winners are listed by first name and last initial.', warm: false },
];

// PRE-START (dates not both set): same shape as HOW_STEPS, no per-dollar cue, no 'win' step.
export const HOW_STEPS_PRE_START = [
  HOW_STEPS[0],
  { n: '02', title: 'Join the list', body: 'Sign up to hear first when the dates for the Lootix Launch Giveaway are set.', warm: true },
  { n: '03', title: 'Watch the draw', body: 'When a giveaway runs, the winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted. The winner is listed by first name and last initial.', warm: false },
];

// Featured Lootix products: Printful mockups of the store's Mark/Wordmark pieces.
export const DROPS = ['mark-oversized-hoodie-bone-on-black', 'mark-box-tee-bone-on-black', 'wordmark-box-tee-white-on-black'].map((slug) => {
  const e = PRINTFUL_CATALOG.find((p) => p.slug === slug);
  if (!e) throw new Error(`lootix.ts: featured product '${slug}' is not in PRINTFUL_CATALOG`);
  return { name: e.name, meta: e.sub, price: e.price, entries: ENTRIES_LABEL, img: e.img, well: 'light', size: 'contain', pos: 'center' };
});

// Locked "achievement" milestones — the Winners Vault hasn't been unlocked yet.
// The first is claimable NOW ("be our first winner"); the rest are future unlocks.
export const MILESTONES = [
  {
    title: 'First Winner',
    state: 'next' as const,
    tag: 'Unclaimed',
    desc: 'No one has won yet. The first winner will be listed on the Winners page after the drawing.',
  },
  {
    title: 'The $1K Club',
    state: 'locked' as const,
    tag: 'Locked',
    desc: 'Unlocks once the Vault has awarded its first $1,000 in prizes.',
    hidden: true,
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
    instagram: 'https://www.instagram.com/wearlootix',
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
{ label: 'DMCA', href: '/dmca' },
  ] },
];
