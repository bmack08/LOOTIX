// -------------------------------------------------------------
// Legal / postal identity for Lootix LLC.
//
// The one place the company's physical mailing address is written. Everything
// that shows an address -- the Official Rules (Sponsor + the free mail-in
// method), the contact page, the footers, email footers (CAN-SPAM) -- reads it
// from here, so a mailbox change is a one-line edit.
//
// Two forms, and they are not interchangeable:
//   MAIL_IN_* -- where an entrant mails a free entry card. Opens with the
//     giveaway addressee line so the mailbox sorts entry cards from business
//     mail. Use it ONLY for the free mail-in entry method.
//   COMPANY_* -- who and where Lootix LLC is. No addressee line. Use it for
//     the Sponsor block, the winners list, contact, privacy, terms, footers
//     and email footers.
//
// This file deliberately has NO imports: both src/lib/site.ts and
// src/config/giveaway.ts read it, and giveaway.ts already imports site.ts, so
// anything with its own imports would risk a cycle.
// -------------------------------------------------------------

/**
 * Mail-in entry address, block form -- render one line per element (<br /> or
 * separate nodes). The first line is the giveaway addressee and the second is
 * the company name the mailbox is registered under; mail without the company
 * name may be refused, so neither line is optional.
 */
export const MAIL_IN_ADDRESS_LINES: string[] = [
  'Lootix Launch Giveaway',
  'Lootix LLC',
  '9 Aberdeen Shopping Plz',
  'Unit B #3017',
  'Aberdeen, MD 21001',
];

/** Mail-in entry address, single line, for running prose and instructions. */
export const MAIL_IN_ADDRESS = MAIL_IN_ADDRESS_LINES.join(', ');

/**
 * Company address, block form. Same mailbox, no addressee line -- this is the
 * business address, not an entry destination. Where a page already prints
 * "Lootix LLC" as a heading, render these lines instead of repeating the name.
 */
export const COMPANY_ADDRESS_LINES: string[] = [
  'Lootix LLC',
  '9 Aberdeen Shopping Plz',
  'Unit B #3017',
  'Aberdeen, MD 21001',
];

/** Company address, single line, for footers, emails and metadata. */
export const COMPANY_ADDRESS = COMPANY_ADDRESS_LINES.join(', ');

/**
 * Winners list address, block form -- where an entrant mails a self-addressed
 * stamped envelope to request the winner's name (Official Rules § 14). Same
 * mailbox again, with its own addressee line so those requests sort apart from
 * entry cards and business mail. Built from COMPANY_ADDRESS_LINES so the
 * street lines stay single-sourced.
 */
export const WINNERS_LIST_ADDRESS_LINES: string[] = [
  'Lootix Launch Giveaway Winners List',
  ...COMPANY_ADDRESS_LINES,
];

/** Winners list address, single line, for running prose and instructions. */
export const WINNERS_LIST_ADDRESS = WINNERS_LIST_ADDRESS_LINES.join(', ');

/**
 * Effective / "Last updated" date for the Terms of Use and Privacy Policy, and the
 * "Last reviewed" date of the Accessibility Statement (end of the Terms page).
 * PLACEHOLDER: set to the real date on the day the site is pushed live.
 */
export const LEGAL_EFFECTIVE_DATE = '[EFFECTIVE DATE - SET ON PUSH DAY]';
