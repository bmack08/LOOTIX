import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Official Rules — Launch Vault Sweepstakes | Lootix',
  description: 'Official rules for the Lootix Launch Vault Sweepstakes. No purchase necessary to enter or win. Free entry method with equal odds.',
};

const HAIR = '1px solid rgba(198,161,91,0.16)';

const SECTIONS: { num: string; title: string; paras: string[] }[] = [
  { num: '01', title: 'Sponsor', paras: ['This sweepstakes ("Sweepstakes") is sponsored by Lootix LLC, located in Maryland, USA [full street address] ("Sponsor").'] },
  { num: '02', title: 'Eligibility', paras: [
    'Open to legal residents of the 50 United States and D.C. who are at least eighteen (18) years of age (or the age of majority in their jurisdiction) at the time of entry. Void where prohibited.',
    'Employees, officers, and directors of Sponsor and its affiliates, and their immediate family and household members, are not eligible to enter or win.',
  ] },
  { num: '03', title: 'Sweepstakes Period', paras: ['The Sweepstakes begins at 12:00 AM ET on [start date] and ends at 8:00 PM ET on August 1, 2026 (the "Sweepstakes Period").'] },
  { num: '04', title: 'How to Enter', paras: [
    'A. Entry with Purchase — During the Sweepstakes Period, purchase eligible merchandise from getlootix.com. Each product carries a flat entry count shown on its product card and totaled at checkout. Shipping, taxes, and fees do not earn entries. You will receive a confirmation email with your entry total.',
    'B. Free Alternate Method of Entry (AMOE) — No purchase necessary. Hand-print a 3"×5" card with your full legal name, complete mailing address, email, phone, date of birth, and the phrase "LOOTIX LAUNCH VAULT SWEEPSTAKES ENTRY," and mail it to: LOOTIX LAUNCH VAULT SWEEPSTAKES, Lootix LLC, [Street Address], [City, State ZIP]. Limit one (1) free entry per outer envelope, each mailed separately with first-class postage, postmarked by the end date and received within seven (7) days after. All entries have equal odds; mechanically reproduced or automated entries are void.',
  ] },
  { num: '05', title: 'Prize', paras: ['Grand Prize (1): $250 cash plus a full Lootix merch bundle (winner\'s pick from Drop 001). Approximate Retail Value (ARV): $[total]. Prize is awarded "as is." Winner is responsible for all taxes and may be required to complete an IRS Form W-9. No cash substitution except at Sponsor\'s discretion; prize is not transferable.'] },
  { num: '06', title: 'Winner Selection', paras: ['One (1) potential winner will be selected in a random drawing conducted by an independent third-party administrator from all eligible entries, on or about the draw date shown on the Giveaways page. The draw is streamed live and archived. Odds of winning depend on the total number of eligible entries received.'] },
  { num: '07', title: 'Winner Notification', paras: ['The potential winner will be notified by email and/or phone within five (5) business days. If unresponsive within ten (10) days, or if notification is undeliverable, an alternate may be selected. Before being declared a winner, they may be required to sign an Affidavit of Eligibility, Liability Waiver, and (where legal) Publicity Release, and provide proof of age and residency. The winner\'s name is announced publicly on the Winners page and social channels.'] },
  { num: '08', title: 'General Conditions', paras: ['By entering, participants agree to be bound by these Official Rules and Sponsor\'s decisions, which are final. Sponsor is not responsible for lost, late, or misdirected entries, administrative or technical errors, or damage related to participation. Sponsor may modify, suspend, or terminate the Sweepstakes if its integrity is compromised.'] },
  { num: '09', title: 'Release & Limitation of Liability', paras: ['By participating, participants release and hold harmless Sponsor and its affiliates from any liability for injuries, losses, or damages arising from the Sweepstakes or the acceptance, use, or misuse of any prize. In no event will Sponsor be liable for indirect, incidental, consequential, or punitive damages.'] },
  { num: '10', title: 'Disputes & Governing Law', paras: ['This Sweepstakes is governed by the laws of the State of Maryland. Disputes shall be resolved in the state or federal courts located in Maryland. Except where prohibited, participants agree disputes shall be resolved individually by arbitration under the rules of the American Arbitration Association, without class actions.'] },
  { num: '11', title: 'Privacy', paras: ['Information collected is subject to our Privacy Policy. By entering, participants consent to the use of their personal information as described in these Rules and that policy.'] },
  { num: '12', title: 'Winners List', paras: ['For the winner\'s name, send a self-addressed stamped envelope to the Sponsor address above within sixty (60) days after the Sweepstakes Period. Winners are also announced publicly at getlootix.com/winners.'] },
];

export default function OfficialRulesPage() {
  return (
    <div className="text-parchment">
      {/* HEADER */}
      <header className="text-center" style={{ padding: '88px 24px 56px', borderBottom: HAIR }}>
        <div className="flex flex-col gap-3.5 items-center mx-auto" style={{ maxWidth: 760 }}>
          <span className="v2-eyebrow">Sweepstakes · Drop 001</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, letterSpacing: '-0.01em' }}>Official Rules</h1>
          <span className="font-plex text-stone" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            Lootix &ldquo;Launch Vault&rdquo; Sweepstakes · Last updated July 15, 2026
          </span>
        </div>
      </header>

      {/* NO PURCHASE BANNER */}
      <section style={{ padding: '32px 24px', borderBottom: HAIR, background: '#E4D5B4', color: '#171208' }}>
        <div className="mx-auto text-center flex flex-col gap-2" style={{ maxWidth: 880 }}>
          <span className="uppercase" style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.02em' }}>
            No purchase, donation, or payment of any kind is necessary to enter or win.
          </span>
          <span style={{ fontSize: 14, color: '#4A3D22' }}>A purchase does not increase your chances of winning. All entries have equal odds.</span>
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
            <div key={s.num} className="flex gap-6" style={{ borderTop: HAIR, paddingTop: 28 }}>
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
