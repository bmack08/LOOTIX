import type { Metadata } from 'next';
import Link from 'next/link';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { GIVEAWAY } from '@/lib/site';
import {
  formatEndDate,
  ENTRIES_PER_DOLLAR,
  MAIL_IN_ENTRIES,
  SIGNUP_ENTRIES,
  PRIZE_VALUE_PLACEHOLDER,
} from '@/config/giveaway';
import { MAIL_IN_ADDRESS, MAIL_IN_ADDRESS_LINES } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Official Rules — Launch Vault Sweepstakes | Lootix',
  description: 'Official rules for the Lootix Launch Vault Sweepstakes. No purchase necessary to enter or win. Free mail-in entry method available.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

// The Sponsor sentence names "Lootix LLC" itself, so it takes the street lines
// only; the mail-in paragraph below uses the full address, name line included.
const SPONSOR_STREET_ADDRESS = MAIL_IN_ADDRESS_LINES.slice(1).join(', ');

// Dates come from src/lib/site.ts (GIVEAWAY) — one source for the whole site.
const START_DATE = GIVEAWAY.startISO ? formatEndDate(new Date(GIVEAWAY.startISO)) : '[start date]';
const END_DATE = GIVEAWAY.drawDateISO ? formatEndDate(new Date(GIVEAWAY.drawDateISO)) : '[end date]';

// `id` gives a section a stable anchor. #free-entry is the link target every
// no-purchase notice on the site points at (FREE_ENTRY_HREF), so keep it on
// the section that carries the free mail-in method.
//
// Wording follows Legal's draft (01-official-rules.md, DRAFT 2026-10-21),
// section for section. Entry counts stay interpolated from
// src/config/giveaway.ts so the numbers still live in one place — the spelled
// out word next to each one ("twenty-five (25)") must be updated with it.
const SECTIONS: { num: string; title: string; paras: string[]; id?: string }[] = [
  { num: '01', title: 'Sponsor', paras: [
    `Lootix LLC, a Maryland limited liability company, ${SPONSOR_STREET_ADDRESS} ("Sponsor"). Contact: hello@getlootix.com. Website: https://www.getlootix.com (the "Website").`,
    'This Sweepstakes is in no way sponsored, endorsed, administered by, or associated with Instagram, Meta, TikTok, YouTube, X, Discord, Apple, Google, or any other social media platform. By entering, you release those platforms from all liability related to this Sweepstakes. Questions go to Sponsor, not to any platform.',
  ] },
  // The entry-close wording and the 8:00 PM ET value are an open owner
  // decision (Legal's entry draft says 11:59:59 p.m. ET) — leave them alone.
  { num: '02', title: 'Sweepstakes Period', paras: [
    `The Lootix Launch Vault Sweepstakes (the "Sweepstakes") begins at 12:00 AM ET on ${START_DATE} and ends at 8:00 PM ET on ${END_DATE} (the "Sweepstakes Period"). No entry is created before the start or after the close. Sponsor's server clock is the official timekeeping device for online and purchase entries.`,
  ] },
  { num: '03', title: 'Eligibility', paras: [
    'Open only to legal residents of the 50 United States and D.C. who are at least 18 (19 in AL and NE; 21 in MS) at the time of entry. Void in Puerto Rico, U.S. territories and possessions, outside the United States, and wherever prohibited or restricted by law. Purchases shipped to addresses outside the U.S. do not earn entries.',
    `Not eligible: the owners, members, managers, employees, and contractors of Sponsor; [ADMINISTRATOR NAME]; Sponsor's agencies and fulfillment partners; and the immediate family members (spouse, parents, siblings, children, and each of their spouses) and household members (whether related or not) of any of those people. Persons on the U.S. Treasury OFAC Specially Designated Nationals list are not eligible.`,
  ] },
  { num: '04', title: 'How to Enter', id: 'free-entry', paras: [
    'There are three (3) ways to enter. All entries go into the same drawing. Entries count only if received between the start and the close of the Sweepstakes Period in Section 02.',
    `A. Purchase entry. Each purchase at getlootix.com during the Sweepstakes Period automatically earns one (${ENTRIES_PER_DOLLAR}) entry for every whole U.S. dollar spent, calculated on the merchandise total after discounts, before tax and excluding shipping and handling (fractions rounded down; for example, $129.99 = 129 entries). Entries are credited when the order is paid, and you will receive a confirmation email with your entry total. If an order is refunded, canceled, or charged back, in whole or in part, the matching entries are void. A size or color exchange of equal value keeps its entries. Buying items to obtain entries and then returning them is fraud and will result in disqualification.`,
    `B. Free mail-in entry (no purchase necessary). Hand-print your full name, complete mailing address, email address, phone number, and date of birth on a 3" x 5" card. Mail it in a #10 envelope with proper postage to: Lootix Launch Vault Sweepstakes, ${MAIL_IN_ADDRESS}. Each eligible card earns twenty-five (${MAIL_IN_ENTRIES}) entries. One (1) card per envelope; no limit on the number of envelopes. Cards must be postmarked by ${END_DATE} and received by [RECEIPT DEADLINE]. Mechanically reproduced, illegible, incomplete, postage-due, late, bulk, or third-party-submitted cards are void. Sponsor is not responsible for lost, late, damaged, or misdirected mail. Cards will not be acknowledged or returned. If Sponsor ever offers a bonus multiplier on purchases, mail-in cards postmarked in that period receive the same multiplier.`,
    `C. Free online sign-up (no purchase necessary). Submit a valid email address through the sign-up form on getlootix.com to earn ten (${SIGNUP_ENTRIES}) entries, once per person and email address for the entire Sweepstakes Period. People who join the mailing list before the start date are on the mailing list only; they must confirm after the start date to receive entries. Multiple identities, throwaway addresses, or automated entries are void.`,
    `Entry limit. There is no limit on the number of purchase or mail-in entries per person. Online sign-up is limited to once per person and per email address. Use of multiple identities or email addresses, scripts, bots, or other automated means to obtain entries is prohibited and voids all of that person's entries. In a dispute over who submitted an online entry, the entry is deemed made by the authorized account holder of the email address submitted. Proof of sending is not proof of receipt.`,
  ] },
  { num: '05', title: 'Prize', paras: [`One (1) Grand Prize consisting of: (a) $250.00 USD in cash, paid by PayPal (or by check if the winner cannot receive PayPal); (b) one (1) custom Lootix hoodie ([HOODIE NAME], ARV $[HOODIE ARV]); and (c) one (1) custom Lootix tee ([TEE NAME], ARV $[TEE ARV]). Total Approximate Retail Value ("ARV"): ${PRIZE_VALUE_PLACEHOLDER} — item values and the total are still being finalized and will be stated here before the Sweepstakes Period opens. Merchandise ARV equals the regular Website price of the item on the start date. If the actual value is lower, the difference will not be awarded. Size and color are the winner's choice from available stock. No transfer or substitution, except Sponsor may substitute a prize of equal or greater value if a prize item is unavailable.`] },
  { num: '06', title: 'Odds', paras: ['Odds of winning depend on the total number of eligible entries received from all methods during the Sweepstakes Period. Each entry has the same odds per entry as a purchase entry.'] },
  { num: '07', title: 'Drawing', paras: [`On or about the draw date shown on the Giveaways page, Sponsor will select one (1) potential winner in a random drawing from all eligible entries using RANDOM.ORG. Sponsor will screen-record the drawing and post the recording with the RANDOM.ORG result page on the Website. Mail-in entries are added to the drawing pool before the draw. Each entry occupies one number in the draw, so a purchase worth 129 entries has 129 chances and a mail-in card has ${MAIL_IN_ENTRIES}. Sponsor's decisions are final and binding on all matters relating to the Sweepstakes.`] },
  { num: '08', title: 'Winner Notification and Verification', paras: [
    '1. The person selected is a "potential winner" until the affidavit is signed and verified. The potential winner will be notified by email and phone using the contact information provided with the entry, within five (5) business days after the drawing. Sponsor will make up to three (3) attempts over seven (7) days.',
    '2. The potential winner must sign and return, within seven (7) days of notice, an Affidavit of Eligibility, Liability Release and (where lawful) Publicity Release, and an IRS Form W-9 if required. These documents and any taxpayer ID are collected only through a secure channel identified by Sponsor, never by social media direct message or public comment.',
    '3. Sponsor may verify age, identity, residence, and that the winning entry is valid (e.g., the order was not refunded or charged back; the mail-in card meets these rules). A government-issued photo ID may be requested.',
    '4. The prize is forfeited and an alternate winner drawn from remaining eligible entries if the potential winner: cannot be reached after the attempts above; fails to return the documents on time; is found ineligible or in violation of these rules; or a prize notification is returned undeliverable. Sponsor may draw up to [3] alternates, after which the prize goes unawarded.',
    '5. The prize will be delivered within approximately [30] days after verification is complete. Sponsor will keep proof of delivery.',
  ] },
  { num: '09', title: 'Taxes', paras: [`The winner is solely responsible for all federal, state, and local taxes on the prize. Prizes are reported at ARV. If Sponsor is required by law to report the prize (the federal 1099 threshold is $2,000 for payments made after December 31, 2025), Sponsor will issue an IRS Form 1099 to the winner and may collect a Form W-9. [CPA to confirm whether a W-9 is needed] The prize ARV (${PRIZE_VALUE_PLACEHOLDER}) is expected to be under that threshold, but the winner remains responsible for any tax owed. Failure to provide a requested W-9 results in forfeiture.`] },
  { num: '10', title: 'Publicity', paras: [`Except where prohibited by law, Sponsor may use the winner's first name, last initial and state, and the fact of winning, for promotional purposes in any media without further compensation. Until the winner signs the publicity release in the Affidavit, Sponsor will show nothing more than first name, last initial and state. Any use of city, photo, video, voice or likeness requires the signed publicity release.`] },
  { num: '11', title: 'General Conditions and Release', paras: [
    `By entering, entrants agree to these Official Rules and to Sponsor's decisions. Entrants release and hold harmless Sponsor, the administrator, the platforms named in Section 01, and each of their owners, members, officers, employees, and agents (the "Released Parties") from any liability for injury, loss, or damage of any kind arising from participation in the Sweepstakes or acceptance, possession, or use of the prize. Sponsor may disqualify anyone who tampers with entry, acts fraudulently or disruptively, or violates these rules. If the Sweepstakes cannot run as planned because of fraud, technical failure, virus, or any cause beyond Sponsor's control (including natural disaster, war, pandemic, or government action), Sponsor may cancel, modify, or suspend it and award the prize by random drawing from eligible entries received before the event. Released Parties are not responsible for incorrect or inaccurate entry information, technical malfunctions, or lost, late, or misdirected entries. If any provision is held invalid, the rest remains in effect.`,
    'CAUTION: Any attempt to deliberately damage the Website or undermine the Sweepstakes may violate criminal and civil law; Sponsor reserves the right to seek damages to the fullest extent permitted by law.',
  ] },
  { num: '12', title: 'Disputes; Governing Law', paras: [`These rules are governed by the laws of the State of Maryland, without regard to conflict-of-law principles. Except where prohibited: (a) any dispute arising from or connected to the Sweepstakes will be resolved individually, without resort to any class action, and exclusively in the state or federal courts located in [Harford County], Maryland [COUNSEL: confirm venue county now that the business address is in Harford County, Aberdeen]; (b) any claims, judgments, and awards are limited to actual out-of-pocket costs of entering, and in no event attorneys' fees; and (c) entrants waive any right to punitive, incidental, consequential, or multiplied damages.`] },
  { num: '13', title: 'Privacy', paras: [`Information collected from entrants is used to administer the Sweepstakes, contact the winner, and as described in Sponsor's Privacy Policy at https://www.getlootix.com/privacy. Mail-in cards are kept for [6] months after the drawing and then destroyed. Sponsor does not sell entrant information. Marketing email is sent only to entrants who opt in, and entering does not require opting in.`] },
  { num: '14', title: 'Winners List', paras: [`For the winner's name (first name, last initial, and state), send a self-addressed stamped envelope, received within sixty (60) days after the close of the Sweepstakes Period, to: Lootix Launch Vault Winners List, ${MAIL_IN_ADDRESS}. Winners are also announced publicly at getlootix.com/winners.`] },
  { num: '15', title: 'Official Rules', paras: ['These Official Rules are posted at https://www.getlootix.com/official-rules. In case of conflict between these rules and any advertising, FAQ, or social post, these rules control.'] },
  { num: '16', title: 'Shipping', paras: ['Merchandise ships to addresses in the United States only. Free U.S. shipping on orders of $100 or more.'] },
];

export default function OfficialRulesPage() {
  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header className="text-center" style={{ padding: '88px 24px 56px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 760 }}>
          <span className="v2-eyebrow">Sweepstakes · Drop 1</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Official Rules</h1>
          <span className="font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            Lootix &ldquo;Launch Vault&rdquo; Sweepstakes · Last updated October 22, 2026
          </span>
        </div>
      </header>

      {/* NO PURCHASE BANNER */}
      <section style={{ padding: '32px 24px', borderBottom: HAIR, background: '#E4D5B4', color: '#171208' }}>
        <div className="mx-auto text-center flex flex-col gap-2" style={{ maxWidth: 880 }}>
          {/* The standard no-purchase line — identical wording site-wide, and
              the banner headline Legal's draft opens with. */}
          <NoPurchaseNotice
            as="span"
            className="uppercase"
            style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.02em' }}
            linkClassName="underline"
            linkStyle={{ color: '#7A6231' }}
          />
          <span style={{ fontSize: 14, color: '#4A3D22' }}>
            Free entry is available by mail — {MAIL_IN_ENTRIES} entries per card, with no limit on envelopes, and with the
            same odds per entry as a purchase entry.
          </span>
          <span className="uppercase" style={{ fontSize: 13, color: '#4A3D22' }}>
            Void where prohibited or restricted by law. Open only to legal residents of the 50 United States and the
            District of Columbia who are 18 or older (19 in Alabama and Nebraska; 21 in Mississippi) at the time of entry.
          </span>
        </div>
      </section>

      {/* ATTORNEY NOTICE — placeholder copy, must be reviewed before launch */}
      <section style={{ padding: '28px 24px 0' }}>
        <div
          className="mx-auto flex gap-3"
          style={{ maxWidth: 880, border: '1px solid rgba(220,140,60,.4)', background: 'rgba(220,140,60,.07)', borderRadius: 4, padding: '16px 20px' }}
        >
          <span style={{ fontSize: 16 }}>⚠</span>
          <p className="font-plex m-0" style={{ fontSize: 11.5, lineHeight: 1.7, color: '#e0a86b', letterSpacing: '0.04em' }}>
            DRAFT — structural placeholder. Bracketed <strong className="text-parchment">[values]</strong> and the full legal language must be reviewed and finalized by a sweepstakes attorney before this giveaway goes live.
          </p>
        </div>
      </section>

      {/* NUMBERED SECTIONS */}
      <section style={{ padding: '56px 24px 80px' }}>
        <div className="flex flex-col gap-10 mx-auto" style={{ maxWidth: 880 }}>
          {SECTIONS.map((s) => (
            <div key={s.num} id={s.id} className="flex gap-6" style={{ borderTop: HAIR, paddingTop: 28, scrollMarginTop: 96 }}>
              <span className="font-plex text-brass flex-none" style={{ fontSize: 14, letterSpacing: '0.1em', width: 34 }}>{s.num}</span>
              <div className="flex flex-col gap-3">
                <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.02em' }}>{s.title}</h2>
                {s.paras.map((p, i) => (
                  <p key={i} className="m-0 text-sand" style={{ fontSize: 14.5, lineHeight: 1.8 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-stone mx-auto" style={{ margin: '48px auto 0', maxWidth: 720, fontSize: 12, lineHeight: 1.7 }}>
          Questions? Email <a href="mailto:hello@getlootix.com" className="text-brass hover:text-brass-lit transition-colors">hello@getlootix.com</a> · See the{' '}
          <Link href="/faq" className="text-brass hover:text-brass-lit transition-colors">FAQ</Link> for plain-English answers.
        </p>
      </section>
    </div>
  );
}
