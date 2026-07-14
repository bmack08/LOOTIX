import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'Official Rules — Lootix Sweepstakes',
  description: 'Official sweepstakes rules for the Lootix giveaway. No purchase necessary to enter or win.',
};

export default function OfficialRulesPage() {
  return (
    <ContentPage
      eyebrow="Sweepstakes"
      title="Official Rules"
      subtitle="Lootix [Drop Name] Sweepstakes"
    >
      {/* DRAFT banner — must be finalized by legal counsel before launch */}
      <div className="rounded-tier p-4 mb-8" style={{ background: 'rgba(220,140,60,.08)', border: '1px solid rgba(220,140,60,.4)' }}>
        <p className="m-0 font-mono text-[12px] tracking-[.06em] text-[#e0a86b]">
          DRAFT — pending legal review. Bracketed <strong className="text-cream">[values]</strong> must be finalized by a sweepstakes attorney before this giveaway goes live, including entry mechanics (the free method must carry equal odds).
        </p>
      </div>

      <div className="rounded-tier p-5 mb-6" style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.35)' }}>
        <p className="m-0 text-cream font-bold text-[17px]">NO PURCHASE, DONATION, OR PAYMENT OF ANY KIND IS NECESSARY TO ENTER OR WIN.</p>
        <p className="m-0 text-cream mt-1">A PURCHASE DOES NOT INCREASE YOUR CHANCES OF WINNING.</p>
      </div>

      <h2>1. Sponsor</h2>
      <p>This sweepstakes (&ldquo;Sweepstakes&rdquo;) is sponsored by <strong>Lootix LLC</strong>, located in <strong>Maryland, USA</strong> [full street address to be added] (&ldquo;Sponsor&rdquo;).</p>

      <h2>2. Eligibility</h2>
      <p>Open to legal residents of <strong>[eligible states/region — recommend U.S. 50 states + D.C.]</strong> who are at least eighteen (18) years of age (or the age of majority in their jurisdiction) at the time of entry.</p>
      <p><strong>Void where prohibited.</strong> Employees, officers, and directors of Sponsor and its affiliates, and their immediate family and household members, are not eligible to enter or win.</p>

      <h2>3. Sweepstakes Period</h2>
      <p>The Sweepstakes begins at <strong>[start time]</strong> ET on <strong>[start date]</strong> and ends at <strong>[end time]</strong> ET on <strong>[end date]</strong> (the &ldquo;Sweepstakes Period&rdquo;).</p>

      <h2>4. How to Enter</h2>
      <p>There are two (2) methods of entry, and <strong>all entries have equal odds of winning</strong>:</p>
      <h3>A. Entry with Purchase</h3>
      <p>During the Sweepstakes Period, purchase eligible merchandise from <a href="https://getlootix.com">getlootix.com</a>. Entries are awarded per qualifying order as shown at checkout <strong>[final entry ratio to be confirmed with counsel so the free method carries equal odds]</strong>. Shipping, taxes, and fees do not count toward entries. You&rsquo;ll receive a confirmation email with your entry total.</p>
      <h3>B. Free Alternate Method of Entry (AMOE) — No Purchase Necessary</h3>
      <p>To enter for free, hand-print a 3&quot;×5&quot; card with your full legal name, complete mailing address, email, phone, date of birth, and the phrase &ldquo;LOOTIX [DROP NAME] SWEEPSTAKES ENTRY,&rdquo; and mail it to:</p>
      <p className="font-mono text-[13px] text-muted">LOOTIX [DROP NAME] SWEEPSTAKES<br />Lootix LLC<br />[Street Address]<br />[City, State ZIP]</p>
      <p><strong>Limit:</strong> one (1) free entry per outer mailing envelope, each mailed separately with first-class postage. Entries must be postmarked by <strong>[end date]</strong> and received by <strong>[receipt deadline]</strong>. Mechanically reproduced, faxed, emailed, or automated entries are void.</p>

      <h2>5. Prize</h2>
      <p><strong>Grand Prize (1):</strong> <strong>$250 cash + a full Lootix merch bundle</strong> (winner&rsquo;s pick from the current drop). Approximate Retail Value (ARV): <strong>$[250 + itemized merch value]</strong>. Total ARV of all prizes: <strong>$[total]</strong>.</p>
      <p>Prize is awarded &ldquo;as is.&rdquo; Winner is responsible for all federal, state, and local taxes and may be required to complete an IRS Form W-9. No cash substitution except at Sponsor&rsquo;s discretion; prize is not transferable.</p>

      <h2>6. Winner Selection</h2>
      <p>One (1) potential winner will be selected in a <strong>random drawing conducted by an independent third party</strong> from all eligible entries, on or about <strong>[drawing date]</strong>. Odds of winning depend on the total number of eligible entries received.</p>

      <h2>7. Winner Notification</h2>
      <p>The potential winner will be notified by email and/or phone within <strong>[X] business days</strong>. If they do not respond within <strong>[X] days</strong>, or notification is undeliverable, they may be disqualified and an alternate selected. Before being declared a winner, they may be required to sign an Affidavit of Eligibility, Liability Waiver, and (where legal) Publicity Release, and provide proof of age and residency. The winner&rsquo;s name will be announced publicly on the <a href="/winners">winners page</a> and social channels.</p>

      <h2>8. General Conditions</h2>
      <p>By entering, participants agree to be bound by these Official Rules and Sponsor&rsquo;s decisions, which are final. Sponsor is not responsible for lost, late, or misdirected entries, administrative or technical errors, or damage related to participation. Sponsor may modify, suspend, or terminate the Sweepstakes if its integrity is compromised.</p>

      <h2>9. Release &amp; Limitation of Liability</h2>
      <p>By participating, participants release and hold harmless Sponsor and its affiliates from any liability for injuries, losses, or damages arising from the Sweepstakes or the acceptance, use, or misuse of any prize. In no event will Sponsor be liable for any indirect, incidental, consequential, or punitive damages.</p>

      <h2>10. Disputes &amp; Governing Law</h2>
      <p>This Sweepstakes is governed by the laws of the <strong>State of Maryland</strong>. Disputes shall be resolved in the state or federal courts located in Maryland. Except where prohibited, participants agree disputes shall be resolved individually by arbitration under the rules of the American Arbitration Association, without class actions.</p>

      <h2>11. Privacy</h2>
      <p>Information collected is subject to our <a href="/privacy">Privacy Policy</a>. By entering, participants consent to the use of their personal information as described in these Rules and that policy.</p>

      <h2>12. Winners List</h2>
      <p>For the winner&rsquo;s name, send a self-addressed stamped envelope to the Sponsor address above within sixty (60) days after the Sweepstakes Period. Winners are also announced publicly at <a href="/winners">getlootix.com/winners</a>.</p>

      <h2>13. Sponsor Contact</h2>
      <p><strong>Lootix LLC</strong> · Maryland, USA · <a href="mailto:hello@getlootix.com">hello@getlootix.com</a></p>

      <hr />
      <p className="font-mono text-[11px] text-faint text-center">These Official Rules were last updated on [last updated date].</p>
    </ContentPage>
  );
}
