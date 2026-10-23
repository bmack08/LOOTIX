// ─────────────────────────────────────────────────────────────
// Legal / postal identity for Lootix LLC.
//
// The one place the company's physical mailing address is written. Everything
// that shows an address — the Official Rules (Sponsor + the free mail-in
// method), the contact page, the footers, email footers (CAN-SPAM) — reads it
// from here, so a mailbox change is a one-line edit.
//
// This file deliberately has NO imports: both src/lib/site.ts and
// src/config/giveaway.ts read it, and giveaway.ts already imports site.ts, so
// anything with its own imports would risk a cycle.
// ─────────────────────────────────────────────────────────────

/**
 * Block form — render one line per element (<br /> or separate nodes).
 * The company name is the first line on purpose: it is the name the mailbox
 * is registered under, so mail without it may be refused. Where a page
 * already prints "Lootix LLC" as a heading, drop this first line instead of
 * printing the name twice.
 */
export const MAIL_IN_ADDRESS_LINES: string[] = [
  'Lootix LLC',
  '9 Aberdeen Shopping Plz',
  'Unit B #3017',
  'Aberdeen, MD 21001',
];

/** Single-line form, for running prose, footers, emails and metadata. */
export const MAIL_IN_ADDRESS = MAIL_IN_ADDRESS_LINES.join(', ');
