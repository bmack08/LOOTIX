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

export const metadata: Metadata = {
  title: 'Official Rules — Launch Vault Sweepstakes | Lootix',
  description: 'Official rules for the Lootix Launch Vault Sweepstakes. No purchase necessary to enter or win. Free mail-in entry method available.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

// Dates come from src/lib/site.ts (GIVEAWAY) — one source for the whole site.
const START_DATE = GIVEAWAY.startISO ? formatEndDate(new Date(GIVEAWAY.startISO)) : '[start date]';
const END_DATE = GIVEAWAY.drawDateISO ? formatEndDate(new Date(GIVEAWAY.drawDateISO)) : '[end date]';

// `id` gives a section a stable anchor. #free-entry is the link target every
// no-purchase notice on the site points at (FREE_ENTRY_HREF), so keep it on
// the section that carries the free mail-in method.
const SECTIONS: { num: string; title: string; paras: string[]; id?: string }[] = [
  { num: '01', title: 'Sponsor', paras: ['This sweepstakes ("Sweepstakes") is sponsored by Lootix LLC, located in Maryland, USA [BUSINESS ADDRESS] ("Sponsor").'] },
  { num: '02', title: 'Eligibility', paras: [
    'Open to legal residents of the 50 United States and D.C. who are at least eighteen (18) years of age (or the age of majority in their jurisdiction) at the time of entry. Void where prohibited.',
    'Employees, officers, and directors of Sponsor and its affiliates, and their immediate family and household members, are not eligible to enter or win.',
  ] },
  { num: '03', title: 'Sweepstakes Period', paras: [`The Sweepstakes begins at 12:00 AM ET on ${START_DATE} and ends at 8:00 PM ET on ${END_DATE} (the "Sweepstakes Period"). No entry is created before the start or after the close.`] },
  { num: '04', title: 'How to Enter', id: 'free-entry', paras: [
    `A. Entry with Purchase — During the Sweepstakes Period, purchase eligible merchandise from getlootix.com. You receive ${ENTRIES_PER_DOLLAR} entry for each U.S. dollar of your order subtotal, calculated after any discounts and before tax and shipping, rounded down to the nearest whole entry (for example, a $129.99 subtotal earns 129 entries). Shipping, taxes, and fees do not earn entries. You will receive a confirmation email with your entry total. A refund or chargeback voids that order's entries; a size exchange does not.`,
    `B. Free Alternate Method of Entry (AMOE) — No purchase necessary. Hand-print a 3"×5" card with your full legal name, complete mailing address, email, phone, and the phrase "LOOTIX LAUNCH VAULT SWEEPSTAKES ENTRY," and mail it to: LOOTIX LAUNCH VAULT SWEEPSTAKES, Lootix LLC, [MAIL-IN ADDRESS]. Each card is worth ${MAIL_IN_ENTRIES} entries. Limit one (1) card per outer envelope, each mailed separately with first-class postage, postmarked within the Sweepstakes Period and received within seven (7) days after it ends. There is no limit on the number of envelopes you may mail. Mechanically reproduced or automated entries are void.`,
    `C. Free Online Sign-Up — No purchase necessary. Submit your email address through the sign-up form on getlootix.com during the Sweepstakes Period to receive ${SIGNUP_ENTRIES} entries. Limit one (1) sign-up entry per person for the entire Sweepstakes; repeat submissions earn nothing.`,
    'Each entry, however earned, has the same chance of being selected as every other entry. Methods A, B, and C are pooled into one drawing.',
  ] },
  { num: '05', title: 'Prize', paras: [`Grand Prize (1): $250 cash (paid by PayPal), plus one (1) custom Lootix hoodie and one (1) custom Lootix tee. Approximate Retail Value (ARV): ${PRIZE_VALUE_PLACEHOLDER} — item values and the total are still being finalized and will be stated here before the Sweepstakes Period opens. Prize is awarded "as is." Winner is responsible for all taxes and may be required to complete an IRS Form W-9. No cash substitution except at Sponsor's discretion; prize is not transferable.`] },
  { num: '06', title: 'Winner Selection', paras: ['One (1) potential winner will be selected at random using RANDOM.ORG from all eligible entries, on or about the draw date shown on the Giveaways page. Each entry occupies one number in the draw, so a purchase worth 129 entries has 129 chances and a mail-in card has 25. The draw is screen-recorded and posted, together with the RANDOM.ORG result page for the drawn number. Odds of winning depend on the total number of eligible entries received.'] },
  { num: '07', title: 'Winner Notification', paras: ['The potential winner will be notified by email and/or phone within five (5) business days. The winner has seven (7) days from the notification date to respond; Sponsor will attempt contact up to three (3) times. If unresponsive by the deadline, or if notification is undeliverable, an alternate may be selected. Before being declared a winner, they may be required to sign an Affidavit of Eligibility, Liability Waiver, and (where legal) Publicity Release, and provide proof of age and residency. The winner\'s name is announced publicly on the Winners page and social channels.'] },
  { num: '08', title: 'General Conditions', paras: ['By entering, participants agree to be bound by these Official Rules and Sponsor\'s decisions, which are final. Sponsor is not responsible for lost, late, or misdirected entries, administrative or technical errors, or damage related to participation. Sponsor may modify, suspend, or terminate the Sweepstakes if its integrity is compromised.'] },
  { num: '09', title: 'Release & Limitation of Liability', paras: ['By participating, participants release and hold harmless Sponsor and its affiliates from any liability for injuries, losses, or damages arising from the Sweepstakes or the acceptance, use, or misuse of any prize. In no event will Sponsor be liable for indirect, incidental, consequential, or punitive damages.'] },
  { num: '10', title: 'Disputes & Governing Law', paras: ['This Sweepstakes is governed by the laws of the State of Maryland. Disputes shall be resolved in the state or federal courts located in Maryland. Except where prohibited, participants agree disputes shall be resolved individually by arbitration under the rules of the American Arbitration Association, without class actions.'] },
  { num: '11', title: 'Privacy', paras: ['Information collected is subject to our Privacy Policy. By entering, participants consent to the use of their personal information as described in these Rules and that policy.'] },
  { num: '12', title: 'Winners List', paras: ['For the winner\'s name, send a self-addressed stamped envelope to the Sponsor address above within sixty (60) days after the Sweepstakes Period. Winners are also announced publicly at getlootix.com/winners.'] },
  { num: '13', title: 'Shipping', paras: ['Merchandise ships to addresses in the United States only. Free U.S. shipping on orders of $100 or more.'] },
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
          <span className="uppercase" style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.02em' }}>
            No purchase, donation, or payment of any kind is necessary to enter or win.
          </span>
          <span style={{ fontSize: 14, color: '#4A3D22' }}>
            Free entry is available by mail — {MAIL_IN_ENTRIES} entries per card, with no limit on envelopes. Every entry has the
            same chance of being drawn, however it was earned.
          </span>
          {/* The standard no-purchase line — identical wording site-wide. */}
          <NoPurchaseNotice
            as="span"
            style={{ fontSize: 13, color: '#4A3D22' }}
            linkClassName="underline"
            linkStyle={{ color: '#7A6231' }}
          />
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
