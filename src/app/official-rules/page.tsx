import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { GIVEAWAY, COMPANY } from '@/lib/site';
import { currentGiveaway } from '@/config/giveaway';
import {
  LEGAL,
  AMOE,
  CURRENT_SWEEPSTAKES,
  HAS_LEGAL_PLACEHOLDERS,
  formatDrawDate,
  formatETDate,
} from '@/config/legal';

export const metadata: Metadata = {
  title: `Official Rules — ${CURRENT_SWEEPSTAKES.name} | Lootix`,
  description: `Official rules for Lootix sweepstakes, including the ${CURRENT_SWEEPSTAKES.name}. No purchase necessary to enter or win. Open to legal U.S. residents only. Free online and mail-in entry methods available.`,
};

const HAIR = '1px solid rgba(198,161,91,0.16)';
const LINK = 'text-brass hover:text-brass-lit transition-colors';

// ─── Derived facts (no hardcoded duplicates) ───────────────────────────
const SPONSOR = LEGAL.entityName;
const MAIL_TO = `${SPONSOR}, Attn: ${CURRENT_SWEEPSTAKES.name}, ${LEGAL.sponsorAddress}`;
const END = formatDrawDate();
const DRAW_ON = formatETDate(GIVEAWAY.drawDateISO, 7);
const PRIZE_LINES = currentGiveaway.prizeDetails.filter((p) => !/no purchase necessary/i.test(p));
const CASH_LINE = PRIZE_LINES.find((p) => /cash/i.test(p));
const ARV = `$${CURRENT_SWEEPSTAKES.prizeARV.toLocaleString('en-US')}`;
const SUPPORT = (
  <a href={`mailto:${LEGAL.supportEmail}`} className={LINK}>{LEGAL.supportEmail}</a>
);

type Section = { id: string; num: string; title: string; paras: ReactNode[] };
type Part = { id: string; label: string; title: string; intro: string; sections: Section[] };

const PART_A: Part = {
  id: 'part-a',
  label: 'Part A',
  title: 'General Sweepstakes Rules',
  intro: `These general rules apply to every sweepstakes run by ${SPONSOR}. Each giveaway also has its own Current Giveaway Terms (Part B). If Part A and Part B conflict, Part B controls for that giveaway.`,
  sections: [
    {
      id: 'sponsor', num: 'A1', title: 'Sponsor',
      paras: [
        `Each sweepstakes described in these Official Rules (a "Sweepstakes") is sponsored by ${SPONSOR}, ${LEGAL.sponsorAddress} ("Sponsor," "Lootix," "we," or "us"). References to the "Site" mean ${LEGAL.siteUrl} and its pages.`,
        'Lootix promotes its giveaways on social platforms, but no Sweepstakes is sponsored, endorsed, or administered by, or in any way associated with, Instagram, Meta, TikTok, Discord, or any other social media platform. By entering, you fully release each of those platforms from any responsibility or liability relating to the Sweepstakes. Questions or complaints go to Sponsor, not to any platform.',
      ],
    },
    {
      id: 'eligibility', num: 'A2', title: 'Eligibility',
      paras: [
        'Each Sweepstakes is open only to legal residents of the fifty (50) United States and the District of Columbia who, at the time of entry, are at least eighteen (18) years old — nineteen (19) in Alabama and Nebraska, and twenty-one (21) in Mississippi — and who have a valid, working email address.',
        'The following people may not enter or win: employees, officers, directors, and contractors of Sponsor and its affiliates; prize suppliers and anyone else involved in running the Sweepstakes; the immediate family members (spouse, parents, children, siblings, and each of their spouses) and household members of any of those people, whether or not related; and anyone listed on the U.S. Treasury Department Office of Foreign Assets Control (OFAC) Specially Designated Nationals list.',
        'Void outside the United States and wherever prohibited or restricted by law. Entry constitutes your agreement to these Official Rules and to Sponsor\'s decisions, which are final on all matters relating to the Sweepstakes.',
      ],
    },
    {
      id: 'period', num: 'A3', title: 'Sweepstakes Period',
      paras: [
        'Each Sweepstakes runs during the entry window stated in its Current Giveaway Terms (Part B) (the "Sweepstakes Period"). Entries received outside the Sweepstakes Period are not eligible.',
        'All times in these Official Rules are Eastern Time (ET). Sponsor\'s server clock is the official timekeeper for every online entry, purchase, and deadline.',
      ],
    },
    {
      id: 'how-to-enter', num: 'A4', title: 'How to Enter',
      paras: [
        <strong key="npn" className="text-parchment">NO PURCHASE OR PAYMENT OF ANY KIND IS NECESSARY TO ENTER OR WIN. A PURCHASE WILL NOT IMPROVE YOUR CHANCES OF WINNING.</strong>,
        'Entries earned through a purchase and entries earned through a free method go into the same drawing. Every individual entry has exactly the same chance of being selected, no matter how it was obtained. There are four ways to earn entries:',
        <>
          <strong className="text-parchment">(a) Entries with purchase.</strong> Each eligible product sold on the Site carries a fixed entry count, displayed on its product page and product card. Your entry total is added up at checkout and confirmed in your order confirmation email. Shipping, taxes, and fees earn no entries. Entries are credited only after your payment has cleared. If an order is refunded, cancelled, or charged back, the entries from that order are forfeited. Buying products in order to collect entries and then requesting a refund or filing a chargeback is fraud, and Sponsor may disqualify anyone who does so.
        </>,
        <>
          <strong className="text-parchment">(b) Free online entry.</strong> Submit a valid email address through the email sign-up form on the Site during the Sweepstakes Period to receive {AMOE.onlineFreeEntries} entries. Limit one (1) free online entry per person and per email address for each Sweepstakes.
        </>,
        <>
          <strong className="text-parchment">(c) Free mail-in entry.</strong> By hand, print the following on a 4&quot; x 6&quot; card: your full name; complete mailing address; the email address you use (or will use) with Lootix; phone number; date of birth; the phrase &ldquo;{CURRENT_SWEEPSTAKES.mailInPhrase}&rdquo;; and the statement &ldquo;I have read and agree to the Official Rules,&rdquo; followed by your signature. Place the card in a stamped envelope and mail it to: <span className="text-parchment">{MAIL_TO}</span>.
        </>,
        `Each complete, eligible mail-in card earns ${AMOE.entriesPerCard} entries. Limit ${AMOE.maxCardsPerDay} card per person per calendar day (as shown by postmark), and one (1) card per envelope. Cards must be postmarked no later than the last day of the Sweepstakes Period and received within ${AMOE.receiptWindowDays} days after it ends. Cards that are mechanically reproduced, illegible, incomplete, mailed in bulk, or submitted by anyone other than the entrant are void. Sponsor is not responsible for mail that is lost, late, damaged, misdirected, or postage-due. Mail-in entries are placed in the same drawing pool as all other entries.`,
        <>
          <strong className="text-parchment">(d) Bonus entry offers.</strong> From time to time, Sponsor may announce additional ways to earn free bonus entries. Any such offer will be free to take part in, and its specific terms will be posted alongside the offer.
        </>,
      ],
    },
    {
      id: 'conduct', num: 'A5', title: 'Entry Limits & Conduct',
      paras: [
        'Each person may hold only one (1) Lootix account. Entries belong to the entrant who earned them: they cannot be transferred, sold, or traded, and they have no cash value.',
        'Sponsor may void any or all entries of, and disqualify, anyone it reasonably believes has: used bots, scripts, or any other automated means; created multiple accounts or used aliases or other people\'s identities; provided false information; exploited a bug or error; tampered with the entry process or the operation of the Site; sold or offered to sell entries; or harassed, threatened, or defamed Sponsor, its staff, or members of the Lootix community, including on social channels. Sponsor reserves the right to pursue all available legal remedies against anyone who attempts to undermine a Sweepstakes.',
        'Sponsor may audit entry balances at any time and adjust them to correct errors. If entries you earned were not credited because of an error, your sole remedy is reinstatement of those entries.',
      ],
    },
    {
      id: 'odds', num: 'A6', title: 'Odds',
      paras: ['The odds of winning depend on the total number of eligible entries received during the Sweepstakes Period.'],
    },
    {
      id: 'winner-selection', num: 'A7', title: 'Winner Selection',
      paras: [
        'On or about the draw date stated in Part B, Sponsor or its designated administrator will select the winner(s) in a random drawing from all eligible entries received, using an independent random-number service. Each eligible entry counts as one chance in the drawing.',
        'The drawing will be recorded and the result published. Sponsor\'s decisions about the drawing and the Sweepstakes are final and binding.',
      ],
    },
    {
      id: 'notification', num: 'A8', title: 'Notification & Verification',
      paras: [
        'Each potential winner will be contacted by email and/or phone within five (5) business days after the drawing and must respond within seven (7) days of that notice.',
        'Within seven (7) days of Sponsor\'s request, the potential winner must sign and return an Affidavit of Eligibility, a Liability Release, and (where lawful) a Publicity Release; provide a government-issued photo ID so Sponsor can verify identity, age, and residency; and provide a completed IRS Form W-9.',
        'If a potential winner does not respond or comply on time, if a notice is returned as undeliverable, or if the potential winner is found ineligible, the prize is forfeited and Sponsor may draw an alternate winner from the remaining eligible entries. Sponsor will draw no more than three (3) alternates for any prize; after that, the prize may go unawarded.',
      ],
    },
    {
      id: 'prizes', num: 'A9', title: 'Prizes — General Terms',
      paras: [
        'Prizes are awarded "as is." Sponsor makes no warranty of any kind regarding a prize; any warranty is limited to the one provided by the manufacturer, if any. Prizes may not be transferred. No substitution is allowed, except that Sponsor may substitute a prize (or part of one) of equal or greater value if the stated prize becomes unavailable.',
        'Cash prizes are paid to the verified winner by electronic transfer or check. Merchandise is provided in the winner\'s choice of size and color, subject to availability.',
        'Each winner is solely responsible for all federal, state, and local taxes on a prize. Sponsor will issue an IRS Form 1099-MISC where the value of the prize meets the IRS reporting threshold. If a prize\'s actual value is lower than its stated approximate retail value (ARV), the difference will not be awarded.',
      ],
    },
    {
      id: 'publicity', num: 'A10', title: 'Publicity',
      paras: ['Except where prohibited by law, each winner agrees that Sponsor may use the winner\'s name, city and state, likeness, voice, and statements about the Sweepstakes for advertising and promotional purposes, in any media, without further compensation or approval.'],
    },
    {
      id: 'communications', num: 'A11', title: 'Communications',
      paras: ['By entering, you agree that Sponsor may email you about your entries, the drawing, and winner notices. You may unsubscribe from marketing emails at any time; unsubscribing does not void entries you have already earned.'],
    },
    {
      id: 'general-conditions', num: 'A12', title: 'General Conditions',
      paras: [
        'If fraud, technical failure, a computer virus, tampering, or any other event beyond Sponsor\'s reasonable control (including force majeure) compromises the security, fairness, or proper operation of a Sweepstakes, Sponsor may cancel, suspend, or modify that Sweepstakes. In that case, Sponsor may select the winner(s) from the eligible entries received before the event occurred.',
        'Sponsor is not responsible for technical, network, hardware, or software failures of any kind; for lost, late, incomplete, or misdirected entries; or for printing or typographical errors in any Sweepstakes materials. An incorrect entry count shown anywhere on the Site, in an email, or elsewhere does not entitle anyone to entries they did not actually earn under these Official Rules.',
      ],
    },
    {
      id: 'release', num: 'A13', title: 'Release & Limitation of Liability',
      paras: [
        'By entering, you release and hold harmless Sponsor, its affiliates, the social platforms named in Section A1, Sponsor\'s service providers, and each of their officers, directors, employees, and agents from any and all claims, injuries, losses, or damages arising out of your participation in a Sweepstakes or the acceptance, use, or misuse of any prize.',
        'To the fullest extent permitted by law, any recovery is limited to your actual out-of-pocket costs of entering, and in no event will you be entitled to punitive, incidental, or consequential damages or to attorneys\' fees.',
      ],
    },
    {
      id: 'disputes', num: 'A14', title: 'Disputes & Governing Law',
      paras: [
        <>
          These Official Rules are governed by the laws of the State of {LEGAL.governingState}. All disputes must be brought individually — not as a plaintiff or class member in any class, collective, or representative action. Where permitted by law, disputes will be resolved by binding individual arbitration as described in the{' '}
          <Link href="/terms#disputes" className={LINK}>Terms of Service</Link>. Where arbitration is not permitted, disputes will be resolved exclusively in the state or federal courts located in {LEGAL.governingState}.
        </>,
      ],
    },
    {
      id: 'privacy', num: 'A15', title: 'Privacy',
      paras: [
        <>
          Personal information collected in connection with a Sweepstakes is handled as described in our{' '}
          <Link href="/privacy" className={LINK}>Privacy Policy</Link>. Each winner&apos;s name and city/state may be published, and may be disclosed to government regulators where required by law.
        </>,
      ],
    },
    {
      id: 'winners-list', num: 'A16', title: 'Winners List & Copy of Rules',
      paras: [
        <>
          To request the winner&apos;s name or a copy of these Official Rules, mail a self-addressed stamped envelope to Sponsor at the address in Section A1, or email {SUPPORT}, within sixty (60) days after the drawing. These Official Rules are always available at{' '}
          <Link href="/official-rules" className={LINK}>{LEGAL.siteUrl.replace(/^https?:\/\//, '')}/official-rules</Link>, and we will provide them in an accessible format on request.
        </>,
      ],
    },
    {
      id: 'registration', num: 'A17', title: 'Registration & Bonding',
      paras: ['Sponsor keeps the total prize value of each giveaway at or below $5,000, so our giveaways do not require the registration or bonding that New York and Florida mandate for larger sweepstakes. If a future giveaway ever exceeds that amount, Sponsor will register and bond it as required by law before it launches.'],
    },
  ],
};

const PART_B: Part = {
  id: 'part-b',
  label: 'Part B',
  title: 'Current Giveaway Terms',
  intro: `These terms apply to the ${CURRENT_SWEEPSTAKES.name} and supplement the General Sweepstakes Rules in Part A.`,
  sections: [
    {
      id: 'current-name', num: 'B1', title: 'Sweepstakes Name',
      paras: [`${CURRENT_SWEEPSTAKES.name} (mail-in phrase: "${CURRENT_SWEEPSTAKES.mailInPhrase}").`],
    },
    {
      id: 'current-dates', num: 'B2', title: 'Dates',
      paras: [
        `Sweepstakes Period: begins at 12:00 AM ET on ${CURRENT_SWEEPSTAKES.startDate} and ends at ${END}.`,
        `Mail-in cards must be postmarked by the end of the Sweepstakes Period and received within ${AMOE.receiptWindowDays} days after it ends.`,
        `Drawing: on or about ${DRAW_ON}.`,
      ],
    },
    {
      id: 'current-prize', num: 'B3', title: 'Prize',
      paras: [
        <>
          One (1) Grand Prize, consisting of:
          <ul className="m-0 mt-2 pl-5 list-disc flex flex-col gap-1">
            {PRIZE_LINES.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </>,
        `Total approximate retail value (ARV) of the prize: ${ARV}.${CASH_LINE ? ` The cash portion (${CASH_LINE}) is awarded as stated and cannot be substituted or increased.` : ''}`,
      ],
    },
    {
      id: 'current-winners', num: 'B4', title: 'Number of Winners & Odds',
      paras: [
        'One (1) winner will be selected.',
        'Odds of winning depend on the total number of eligible entries received during the Sweepstakes Period.',
      ],
    },
  ],
};

const PARTS = [PART_A, PART_B];

export default function OfficialRulesPage() {
  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header className="text-center" style={{ padding: '88px 24px 56px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 760 }}>
          <span className="v2-eyebrow">Sweepstakes · Drop 1</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Official Rules</h1>
          <span className="font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            {CURRENT_SWEEPSTAKES.name} · Effective {LEGAL.effectiveDate}
          </span>
        </div>
      </header>

      {/* NO PURCHASE BANNER */}
      <section style={{ padding: '32px 24px', borderBottom: HAIR, background: '#E4D5B4', color: '#171208' }}>
        <div className="mx-auto text-center flex flex-col gap-2" style={{ maxWidth: 880 }}>
          <span className="uppercase" style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.02em' }}>
            No purchase, donation, or payment of any kind is necessary to enter or win.
          </span>
          <span style={{ fontSize: 14, color: '#4A3D22' }}>
            A purchase does not increase your chances of winning. Every entry has the same chance of being drawn. Open to legal U.S. residents only.
          </span>
        </div>
      </section>

      {/* PLACEHOLDER NOTICE — shown only while [BRACKET] values remain in src/config/legal.ts */}
      {HAS_LEGAL_PLACEHOLDERS && (
        <section style={{ padding: '20px 24px 0' }}>
          <p
            className="font-plex mx-auto m-0"
            style={{ maxWidth: 880, fontSize: 11, lineHeight: 1.6, color: '#e0a86b', letterSpacing: '0.04em', border: '1px solid rgba(220,140,60,.3)', borderRadius: 4, padding: '10px 14px' }}
          >
            Some details on this page (shown in [brackets]) are still being finalized and will be completed before this giveaway opens.
          </p>
        </section>
      )}

      {/* TABLE OF CONTENTS */}
      <nav aria-label="Official Rules contents" style={{ padding: '40px 24px 0' }}>
        <div className="mx-auto grid gap-8 sm:grid-cols-2" style={{ maxWidth: 880, border: HAIR, borderRadius: 4, padding: '24px 24px' }}>
          {PARTS.map((part) => (
            <div key={part.id} className="flex flex-col gap-2">
              <a href={`#${part.id}`} className="font-plex text-brass hover:text-brass-lit transition-colors uppercase" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
                {part.label} · {part.title}
              </a>
              <ol className="m-0 p-0 list-none flex flex-col gap-1">
                {part.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sand hover:text-parchment transition-colors" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                      <span className="font-plex text-stone" style={{ fontSize: 11.5, marginRight: 8 }}>{s.num}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </nav>

      {/* PARTS + NUMBERED SECTIONS */}
      <section style={{ padding: '56px 24px 80px' }}>
        <div className="flex flex-col gap-16 mx-auto" style={{ maxWidth: 880 }}>
          {PARTS.map((part) => (
            <div key={part.id} id={part.id} className="flex flex-col gap-10 scroll-mt-24">
              <div className="flex flex-col gap-2">
                <span className="v2-eyebrow">{part.label}</span>
                <h2 className="m-0 uppercase text-parchment" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.01em' }}>{part.title}</h2>
                <p className="m-0 text-stone" style={{ fontSize: 13.5, lineHeight: 1.7 }}>{part.intro}</p>
              </div>
              {part.sections.map((s) => (
                <div key={s.id} id={s.id} className="flex gap-6 scroll-mt-24" style={{ borderTop: HAIR, paddingTop: 28 }}>
                  <span className="font-plex text-brass flex-none" style={{ fontSize: 14, letterSpacing: '0.1em', width: 34 }}>{s.num}</span>
                  <div className="flex flex-col gap-3 min-w-0">
                    <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.02em' }}>{s.title}</h3>
                    {s.paras.map((p, i) => (
                      <div key={i} className="m-0 text-sand" style={{ fontSize: 14.5, lineHeight: 1.8 }}>{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-center text-stone mx-auto" style={{ margin: '48px auto 0', maxWidth: 720, fontSize: 12, lineHeight: 1.7 }}>
          Questions? Email {SUPPORT} · See the{' '}
          <Link href="/faq" className={LINK}>FAQ</Link> for plain-English answers. {COMPANY.legalName} · {COMPANY.location}
        </p>
      </section>
    </div>
  );
}
