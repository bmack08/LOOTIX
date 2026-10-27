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
  PRIZE_HOODIE_ARV,
  PRIZE_TEE_ARV,
  GIVEAWAY_CLOSE_TIME_LABEL,
  ODDS_SHORT,
  ODDS_LONG,
  MARYLAND_ODDS_LINE,
} from '@/config/giveaway';
import { MAIL_IN_ADDRESS, COMPANY_ADDRESS, WINNERS_LIST_ADDRESS } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Official Rules — Lootix Launch Giveaway | Lootix',
  description: 'Official rules for the Lootix Launch Giveaway. No purchase necessary to enter or win. Free mail-in entry method available.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

// Dates come from src/lib/site.ts (GIVEAWAY) — one source for the whole site.
const START_DATE = GIVEAWAY.startISO ? formatEndDate(new Date(GIVEAWAY.startISO)) : '[start date]';
const END_DATE = GIVEAWAY.endDateISO ? formatEndDate(new Date(GIVEAWAY.endDateISO)) : '[end date]';

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
    // COMPANY_ADDRESS opens with "Lootix LLC", so the sentence must not name
    // the company again ahead of it.
    `${COMPANY_ADDRESS} ("Sponsor"), a Maryland limited liability company. Contact: hello@getlootix.com. Website: https://www.getlootix.com (the "Website").`,
    'This Sweepstakes is in no way sponsored, endorsed, administered by, or associated with Instagram, Meta, TikTok, YouTube, X, Discord, Apple, Google, or any other social media platform. By entering, you release those platforms from all liability related to this Sweepstakes. Questions go to Sponsor, not to any platform.',
  ] },
  // The entry-close wording is still an open owner decision (Legal's entry
  // draft says 11:59:59 p.m. ET). It is printed from
  // GIVEAWAY_CLOSE_TIME_LABEL in src/config/giveaway.ts — change it there,
  // not here.
  { num: '02', title: 'Sweepstakes Period', paras: [
    `The Lootix Launch Giveaway (the "Sweepstakes") begins at 12:00 AM ET on ${START_DATE} and ends at ${GIVEAWAY_CLOSE_TIME_LABEL} on ${END_DATE} (the "Sweepstakes Period"). No entry is created before the start or after the close. Sponsor's server clock is the official timekeeping device for online and purchase entries.`,
  ] },
  { num: '03', title: 'Eligibility', paras: [
    'Open only to legal residents of the 50 United States and D.C. who are at least 18 (19 in AL and NE; 21 in MS) at the time of entry. Void in Puerto Rico, U.S. territories and possessions, outside the United States, and wherever prohibited or restricted by law. Purchases shipped to addresses outside the U.S. do not earn entries.',
    // There is no separate administrator to name: Lootix runs the drawing
    // itself and RANDOM.ORG is the tool it uses, not a party to the
    // Sweepstakes. So the rules name Sponsor and nobody else.
    `Not eligible: the owners, members, managers, employees, and contractors of Sponsor; Sponsor's agencies and fulfillment partners; and the immediate family members (spouse, parents, siblings, children, and each of their spouses) and household members (whether related or not) of any of those people. Persons on the U.S. Treasury OFAC Specially Designated Nationals list are not eligible.`,
  ] },
  { num: '04', title: 'How to Enter', id: 'free-entry', paras: [
    'There are three (3) ways to enter. All entries go into the same drawing. Entries count only if received between the start and the close of the Sweepstakes Period in Section 02.',
    `A. Purchase entry. Each purchase at getlootix.com during the Sweepstakes Period automatically earns one (${ENTRIES_PER_DOLLAR}) entry for every whole U.S. dollar spent, calculated on the merchandise total after discounts, before tax and excluding shipping and handling (fractions rounded down; for example, $129.99 = 129 entries). Entries are credited when the order is paid, and you will receive a confirmation email with your entry total. If an order is refunded, canceled, or charged back, in whole or in part, the matching entries are void. A size or color exchange of equal value keeps its entries. Buying items to obtain entries and then returning them is fraud and will result in disqualification. Before you dispute a charge with your bank, please email hello@getlootix.com so we can try to fix the problem first; this does not limit any right you have with your card issuer. If a refund or chargeback is reversed or resolved in your favor and the order stands, the entries are restored. [DRAFT - counsel to review]`,
    `B. Free mail-in entry (no purchase necessary). Hand-print your full name, complete mailing address, email address, phone number, and date of birth on a 3" x 5" card. Mail it in a #10 envelope with proper postage to: ${MAIL_IN_ADDRESS}. Each eligible card earns twenty-five (${MAIL_IN_ENTRIES}) entries. One (1) card per envelope; no limit on the number of envelopes. Cards must be postmarked by ${END_DATE} and received by [RECEIPT DEADLINE]. Mechanically reproduced, illegible, incomplete, postage-due, late, bulk, or third-party-submitted cards are void. Sponsor is not responsible for lost, late, damaged, or misdirected mail. Cards will not be acknowledged or returned. If Sponsor ever offers a bonus multiplier on purchases, mail-in cards postmarked in that period receive the same multiplier.`,
    `C. Free online sign-up (no purchase necessary). Submit a valid email address through the sign-up form on getlootix.com to earn twenty-five (${SIGNUP_ENTRIES}) entries, once per person and email address for the entire Sweepstakes Period. People who join the mailing list before the start date are on the mailing list only; they must confirm after the start date to receive entries. Multiple identities, throwaway addresses, or automated entries are void.`,
    `Entry limit. There is no limit on the number of purchase or mail-in entries per person. Online sign-up is limited to once per person and per email address. Use of multiple identities or email addresses, scripts, bots, or other automated means to obtain entries is prohibited and voids all of that person's entries. In a dispute over who submitted an online entry, the entry is deemed made by the authorized account holder of the email address submitted. Proof of sending is not proof of receipt.`,
  ] },
  // The merchandise ARVs and the total come from src/config/giveaway.ts, which
  // derives them from the shop prices in src/lib/site.ts — so a price change
  // before the start date moves these numbers with it. Only the item NAMES are
  // still blanks for the owner to fill in.
  { num: '05', title: 'Prize', paras: [`One (1) Grand Prize consisting of: (a) $250.00 USD in cash, paid by PayPal (or by check if the winner cannot receive PayPal); (b) one (1) custom Lootix hoodie ([HOODIE NAME], ARV $${PRIZE_HOODIE_ARV}); and (c) one (1) custom Lootix tee ([TEE NAME], ARV $${PRIZE_TEE_ARV}). Total Approximate Retail Value ("ARV"): ${PRIZE_VALUE_PLACEHOLDER} — item values and the total are still being finalized and will be stated here before the Sweepstakes Period opens. Merchandise ARV equals the regular Website price of the item on the start date; if shop prices change before the start date, the ARV and the total are recalculated accordingly. If the actual value is lower, the difference will not be awarded. Size and color are the winner's choice from available stock. No transfer or substitution, except Sponsor may substitute a prize of equal or greater value if a prize item is unavailable.`] },
  // Option B odds wording (owner decision Oct 23, 2026 2:31 PM ET), copied from
  // Legal's 01-official-rules.md. The long form and the Maryland line live in
  // src/config/giveaway.ts so the Rules, Terms and FAQ print the same words.
  { num: '06', title: 'Odds and Required Disclosures', paras: [
    '[DRAFT - counsel to review. Option B decided by owner Oct 23, 2026 2:31 PM ET.]',
    `${ODDS_LONG} Every eligible entry, from any method, has the same chance of being selected; a person with more entries has more chances. ${MARYLAND_ODDS_LINE}`,
    `Maryland disclosures (Md. Code, Com. Law Sec. 13-305(g)) [DRAFT - counsel to review]: (1) One (1) Grand Prize will be offered (Section 05). (2) Its approximate retail value is stated in Section 05. (3) Odds: ${MARYLAND_ODDS_LINE} (4) The Grand Prize will be awarded unless the Sweepstakes is canceled or no eligible winner can be confirmed (Section 08, item 4, and Section 11); the drawing is on or about the draw date referred to in Section 07. (5) Conditions to receive the prize are in Section 08. (6) A winner's name can be requested as stated in Section 14. (7) You are not required to purchase anything or pay any money to receive the prize.`,
  ] },
  { num: '07', title: 'Drawing', paras: [`On or about the draw date shown on the Giveaways page, Sponsor will select one (1) potential winner in a random drawing from all eligible entries using RANDOM.ORG. Sponsor will screen-record the drawing and post the recording with the RANDOM.ORG result page on the Website. Mail-in entries are added to the drawing pool before the draw. Each entry occupies one number in the draw, so a purchase worth 129 entries has 129 chances and a mail-in card has ${MAIL_IN_ENTRIES}. Sponsor's decisions are final and binding on all matters relating to the Sweepstakes.`] },
  { num: '08', title: 'Winner Notification and Verification', paras: [
    '1. The person selected is a "potential winner" until the affidavit is signed and verified. The potential winner will be notified by email and phone using the contact information provided with the entry, within five (5) business days after the drawing. Sponsor will make up to three (3) attempts over seven (7) days.',
    '2. The potential winner must sign and return, within seven (7) days of notice (counted from the date of the first notification attempt), an Affidavit of Eligibility, Liability Release and (where lawful) Publicity Release, and an IRS Form W-9 if required. These documents and any taxpayer ID are collected only through a secure channel identified by Sponsor, never by social media direct message or public comment.',
    '3. Sponsor may verify age, identity, residence, and that the winning entry is valid (e.g., the order was not refunded or charged back; the mail-in card meets these rules). A government-issued photo ID may be requested.',
    '4. The prize is forfeited and an alternate winner drawn from remaining eligible entries if the potential winner: cannot be reached after the attempts above; fails to return the documents on time; is found ineligible or in violation of these rules; or a prize notification is returned undeliverable. Sponsor may draw up to [3] alternates, after which the prize goes unawarded.',
    '5. The prize will be delivered within approximately [30] days after verification is complete. Sponsor will keep proof of delivery.',
  ] },
  // Winner review (Legal's 8A). Item 5 is Legal's stand-alone text (no Section 12
  // dependency), so it reads the same whether or not the arbitration clause is
  // ever published.
  { num: '08A', title: 'Winner Questions and Review [DRAFT - counsel to review]', paras: [
    '1. If Sponsor tells a potential winner that they are disqualified or that the prize is forfeited, the notice will say why in plain words.',
    '2. The potential winner may reply to hello@getlootix.com within [5] business days after the notice with the subject "Winner Review Request," a short explanation, and any documents that help (for example ID, an order confirmation, or proof of address).',
    '3. Sponsor will review the request and send a written decision by email within [10] business days after it arrives. If Sponsor finds it made a mistake, it will fix it, including awarding the prize if the disqualification was wrong. [COUNSEL/OWNER: consider having someone other than the first decision-maker do the review.]',
    '4. Sponsor will not award the prize to an alternate winner until the [5] business days in item 2 have passed with no request, or until a request that arrived in time has been decided. Sponsor may contact and verify an alternate in the meantime. If a review is not finished within [30] days after the request arrives, Sponsor may proceed. [COUNSEL/OWNER: confirm timing; this fits the Section 08 deadlines: 5 + 10 business days is under 30 calendar days.]',
    '5. Please use this review first, before you start any other claim or dispute process under these Official Rules, for any disagreement about a disqualification or forfeiture. It does not limit any right that the law does not allow to be waived.',
  ] },
  // TODO(CPA): confirm whether a W-9 is needed.
  { num: '09', title: 'Taxes', paras: [`The winner is solely responsible for all federal, state, and local taxes on the prize. Prizes are reported at ARV. If Sponsor is required by law to report the prize (the federal 1099 threshold is $2,000 for payments made after December 31, 2025), Sponsor will issue an IRS Form 1099 to the winner, and a Form W-9 may be requested for payments at or above that threshold. The prize ARV (${PRIZE_VALUE_PLACEHOLDER}) is expected to be under that threshold, but the winner remains responsible for any tax owed. Failure to provide a requested W-9 results in forfeiture.`] },
  { num: '10', title: 'Publicity', paras: [`Except where prohibited by law, Sponsor may use the winner's first name, last initial and state, and the fact of winning, for promotional purposes in any media without further compensation. Until the winner signs the publicity release in the Affidavit, Sponsor will show nothing more than first name, last initial and state. Any use of city, photo, video, voice or likeness requires the signed publicity release.`] },
  { num: '11', title: 'General Conditions and Release', paras: [
    `By entering, entrants agree to these Official Rules and to Sponsor's decisions. Entrants release and hold harmless Sponsor, the platforms named in Section 01, and each of their owners, members, officers, employees, and agents (the "Released Parties") from any liability for injury, loss, or damage of any kind arising from participation in the Sweepstakes or acceptance, possession, or use of the prize. Sponsor may disqualify anyone who tampers with entry, acts fraudulently or disruptively, or violates these rules. If the Sweepstakes cannot run as planned because of fraud, technical failure, virus, or any cause beyond Sponsor's control (including natural disaster, war, pandemic, or government action), Sponsor may cancel, modify, or suspend it and award the prize by random drawing from eligible entries received before the event. Released Parties are not responsible for incorrect or inaccurate entry information, technical malfunctions, or lost, late, or misdirected entries. If any provision is held invalid, the rest remains in effect.`,
    'CAUTION: Any attempt to deliberately damage the Website or undermine the Sweepstakes may violate criminal and civil law; Sponsor reserves the right to seek damages to the fullest extent permitted by law.',
  ] },
  // Entry records, errors, disqualification, prize terms (Legal's 11A). Legal's
  // "Promotion Period" is "Sweepstakes Period" on this page, and section
  // references use the page's zero-padded numbers.
  { num: '11A', title: 'Entry Records, Errors, Disqualification and Prize Terms [DRAFT - counsel to review]', paras: [
    `11A.1 Entry records. Sponsor's electronic records of orders and online sign-ups, and its log of mail-in cards received, are the official record of the Sweepstakes. Absent manifest error, they are conclusive on how many entries an entrant earned. An entrant who thinks a record is wrong may email hello@getlootix.com within [14] days after the drawing with proof (order confirmation, receipt, postal receipt, or screenshot). Sponsor will review it in good faith and correct any error it confirms. [COUNSEL: "conclusive" can read as one-sided; the review step is there to balance it.]`,
    `11A.2 Entry count on request. Until the end of the Sweepstakes Period, an entrant may email hello@getlootix.com to ask how many entries Sponsor has recorded for that entrant. Sponsor will reply by email, normally within [3] business days, with the entry count shown in its records at the time of the reply. Sponsor may first ask the entrant to confirm identity, for example by name and an order number, the email address used to enter, or the mail-in card mailing date. The count is a snapshot and does not change the records under Section 11A.1. Sponsor does not provide an automated count or an account dashboard.`,
    `11A.3 Errors. If a typing, pricing, counting, system, or posting error affects the Sweepstakes, Sponsor may correct it. Sponsor is not bound by a mistaken statement of entries, dates, or odds. If an error cannot be fixed fairly, Sponsor may act under Section 11 (cancel, modify, or suspend and draw from eligible entries received before the event).`,
    `11A.4 Drawing problems and ties. The drawing selects one entry, so a tie is not expected. If the RANDOM.ORG result cannot be used (for example the service is down or the result is invalid), Sponsor will repeat the drawing from the same entry list as soon as practical and record it.`,
    `11A.5 Disqualification and decisions. Sponsor may disqualify an entrant who breaks these Official Rules, tampers with the entry process or the Website, uses false information, or acts in a fraudulent or abusive way. Sponsor will act reasonably and in good faith. Sponsor's decisions on entry validity, disqualification, and the meaning of these Official Rules are final and binding, subject to Section 08A and any right that the law does not allow to be waived.`,
    `11A.6 Technical failure, cancellation, and changes. If Sponsor cancels, modifies, or suspends the Sweepstakes under Section 11, it will post notice at https://www.getlootix.com/official-rules and, where it can, email affected entrants. A change will not take away entries already earned under these Official Rules. Sponsor is not responsible for technical, network, email, or mail failures of any kind, but will work in good faith to fix problems it causes.`,
    `11A.7 Age and eligibility checks. Sponsor may verify an entrant's age, identity, residence, and eligibility at any time before the prize is awarded. An entrant who cannot or will not be verified is disqualified.`,
    `11A.8 Prize substitution and condition. Sponsor may substitute a prize item of equal or greater value if an item is unavailable, and will tell the winner in writing before delivery. Prize merchandise comes with any manufacturer or production-partner warranty and any warranty that the law requires, and no other warranty from Sponsor. If an item arrives damaged or wrong, email hello@getlootix.com within [14] days after delivery and Sponsor will fix it, replace it, or tell you why it cannot.`,
    `11A.9 What these Rules do not limit. Nothing in these Official Rules limits or releases liability that the law does not allow to be limited or released, including liability for fraud, intentional wrongdoing, or gross negligence, or any consumer right that cannot be waived under Maryland law. [COUNSEL: confirm.]`,
    `11A.10 Notices; no waiver; entire agreement. Notices to Sponsor go by email to hello@getlootix.com (and by mail to the address in Section 01 where these Rules say so). Notices to an entrant go to the email address used to enter or are posted at the Official Rules page. If Sponsor does not enforce a term, that is not a waiver of it. These Official Rules, the affidavit a winner signs, and (for the Website) the Terms of Use and Privacy Policy are the entire agreement about the Sweepstakes; if they conflict about the Sweepstakes, these Official Rules control. Questions about entry counts, mail-in cards, or the winner: hello@getlootix.com (Sponsor aims to reply within [3] business days).`,
  ] },
  { num: '12', title: 'Disputes; Governing Law; Small Claims and Maryland Courts', paras: [
    "In plain words: if something goes wrong with the Sweepstakes, tell Sponsor first and give it 60 days to fix it. After that, either side can use small-claims court, or bring an individual case in the Maryland courts listed below. No class actions and no jury. There is no arbitration in these Official Rules, so there is nothing to opt out of; the class-action and jury waivers apply in court.",
    "12.1 Maryland law. These Official Rules and any dispute arising out of or relating to the Sweepstakes, these Official Rules, any entry, the drawing, or the prize (a \"Dispute\") are governed by Maryland law, without regard to conflict-of-law rules. For a Dispute about the Sweepstakes, this Section 12 applies instead of the Terms of Use Section 12, including for entrants who also accepted the Terms of Use.",
    "12.2 Step 1: Contact Sponsor first. Before anyone files anything, the side with the complaint sends a written Dispute Notice. An entrant sends it by email to hello@getlootix.com (subject \"Sweepstakes Dispute Notice\") or by mail to Lootix LLC, Attn: Sweepstakes Dispute Notice, 9 Aberdeen Shopping Plz, Unit B #3017, Aberdeen, MD 21001. Sponsor sends its notice to the email or mailing address it has for the entrant. The notice must include: (a) the entrant's name and how to reach them (email, mailing address, and phone if they want a call); (b) how they entered (order number, email used to enter, or mail-in card mailing date); (c) what happened; and (d) what they want Sponsor to do. Sponsor will reply within 5 business days to confirm it has the notice and say who is handling it.",
    "12.3 Step 2: Good-faith resolution window. For 60 days after the Dispute Notice is received (the \"Resolution Window\"), both sides will try in good faith to resolve the Dispute. Either side may ask for a phone or video call, and the other side will take part at a reasonable time. During the Resolution Window: (a) all statutes of limitation and filing deadlines are paused, from the day the notice is received until the window ends; and (b) neither side may file in any court, except to stop a deadline from running out if the pause above is not honored, or to ask a court for urgent relief to prevent immediate harm. The two sides may agree in writing to extend the window.",
    "12.4 Step 3: Small-claims court. After the Resolution Window, either side may bring an individual claim in small-claims court if it qualifies (in Maryland, the District Court small-claims limit is $5,000, Md. Code, Cts. & Jud. Proc. \u00a74-405). The entrant may file in the small-claims court for the county where they live or in Harford County, Maryland. If Sponsor files a small-claims case, it will file in the small-claims court for the county where the entrant lives.",
    "12.5 Step 4: Maryland courts. A Dispute that is not resolved in Steps 1 and 2 and is not brought in small-claims court will be brought only in the state courts located in Harford County, Maryland, or the U.S. District Court for the District of Maryland, and each side consents to those courts' jurisdiction.",
    "12.6 No class actions; jury waiver. ENTRANTS AND SPONSOR MAY BRING CLAIMS ONLY IN AN INDIVIDUAL CAPACITY, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION. A request for public injunctive relief (relief that mainly benefits the general public), where the law does not allow it to be waived, may be decided by a court under Section 12.5 after the individual claims are decided. ENTRANTS AND SPONSOR EACH WAIVE THE RIGHT TO A JURY TRIAL TO THE EXTENT ALLOWED BY LAW.",
    "12.7 Court orders to stop misuse (both sides). Either side may go to court at any time to get an injunction or other equitable relief to stop tampering with the Website or the Sweepstakes, misuse of intellectual property, or misuse of personal information.",
    "12.8 Remedies. Nothing in these Official Rules limits any remedy, including attorneys' fees and costs, that the law does not allow to be limited (for example under the Maryland Consumer Protection Act, Md. Code, Com. Law \u00a713-408).",
    "12.9 Changes to this Section. A change to this Section 12 does not apply to any Dispute for which a Dispute Notice was already sent, or to any claim already filed. Sponsor will post any material change on the Website at least 30 days before it takes effect, and an entrant may reject it by emailing hello@getlootix.com within 30 days of the posting, in which case the version they last agreed to keeps applying to them.",
    "12.10 If part is invalid. If any part of this Section 12 is unenforceable, that part is cut out and the rest stays in effect.",
  ] },
  { num: '13', title: 'Privacy', paras: [`Information collected from entrants is used to administer the Sweepstakes, contact the winner, and as described in Sponsor's Privacy Policy at https://www.getlootix.com/privacy. Mail-in cards are kept for [6] months after the drawing and then destroyed. Sponsor does not sell entrant information. Marketing email is sent only to entrants who opt in, and entering does not require opting in.`] },
  { num: '14', title: 'Winners List', paras: [`For the winner's name (first name, last initial, and state), send a self-addressed stamped envelope, received within sixty (60) days after the close of the Sweepstakes Period, to: ${WINNERS_LIST_ADDRESS}. Winners are also announced publicly at getlootix.com/winners.`] },
  { num: '15', title: 'Official Rules', paras: ['These Official Rules are posted at https://www.getlootix.com/official-rules. In case of conflict between these rules and any advertising, FAQ, or social post, these rules control.'] },
  // Threshold comes from src/config/giveaway.ts so the Rules, the FAQ, the
  // shipping page and the cart can never quote different numbers.
  { num: '16', title: 'Shipping', paras: [`Merchandise ships to addresses in the United States only. Shipping charges, if any, do not earn entries. Entries are earned only on orders shipped to eligible U.S. addresses.`] },
];

export default function OfficialRulesPage() {
  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header className="text-center" style={{ padding: '88px 24px 56px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 760 }}>
          <span className="v2-eyebrow">Sweepstakes · Launch Giveaway</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Official Rules</h1>
          <span className="font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            Lootix Launch Giveaway · Last updated October 23, 2026
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
            line={ODDS_SHORT}
            className="uppercase"
            style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.02em' }}
            linkClassName="underline"
            linkStyle={{ color: '#7A6231' }}
          />
          <span style={{ fontSize: 14, color: '#4A3D22' }}>
            Free entry is available by mail — {MAIL_IN_ENTRIES} entries per card, with no limit on envelopes.
            [DRAFT - counsel to review. Option B decided by owner Oct 23, 2026 2:31 PM ET.]
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
              <span className="font-plex text-brass flex-none" style={{ fontSize: 14, letterSpacing: '0.1em', width: 42 }}>{s.num}</span>
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
