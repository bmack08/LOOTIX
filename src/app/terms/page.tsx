import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { LEGAL } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — Lootix',
  description:
    'The terms that govern your use of the Lootix website, purchases, giveaways, and memberships — including a binding arbitration agreement and class action waiver.',
};

const SECTIONS = [
  { id: 'acceptance', title: 'Acceptance & Who We Are' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'accounts', title: 'Accounts' },
  { id: 'license', title: 'License to Use the Site' },
  { id: 'acceptable-use', title: 'Acceptable Use' },
  { id: 'orders', title: 'Orders, Pricing & Payment' },
  { id: 'shipping-returns', title: 'Shipping & Returns' },
  { id: 'giveaways', title: 'Giveaways' },
  { id: 'memberships', title: 'Memberships & Auto-Renewal' },
  { id: 'chargebacks', title: 'Chargebacks & Billing Disputes' },
  { id: 'communications', title: 'Communications' },
  { id: 'user-content', title: 'User Content, Reviews & Feedback' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'dmca', title: 'Copyright Complaints (DMCA)' },
  { id: 'third-parties', title: 'Third-Party Links & Services' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'disputes', title: 'Dispute Resolution — Binding Arbitration' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'governing-law', title: 'Governing Law & Venue' },
  { id: 'termination', title: 'Termination' },
  { id: 'changes', title: 'Changes to These Terms' },
  { id: 'general', title: 'General' },
  { id: 'contact', title: 'Contact Us' },
] as const;

/** Numbered section heading; id + title come from SECTIONS so the TOC never drifts. */
function H({ n }: { n: number }) {
  const s = SECTIONS[n - 1];
  return (
    <h2 id={s.id} className="scroll-mt-28">
      {n}. {s.title}
    </h2>
  );
}

const boxBase = 'rounded-lg p-5 md:p-6 my-8 [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0';

function Mail({ to }: { to: string }) {
  return <a href={`mailto:${to}`}>{to}</a>;
}

export default function TermsPage() {
  const support = LEGAL.supportEmail;
  const state = LEGAL.governingState;

  return (
    <ContentPage eyebrow="Legal" title="Terms of Service" updated={LEGAL.effectiveDate}>
      <p className="lead">
        These Terms of Service (the “Terms”) are a binding agreement between you and {LEGAL.entityName}. They
        explain how you may use our website, buy our products, enter our giveaways, and — if and when we offer
        them — join paid memberships.
      </p>

      {/* Conspicuous arbitration notice */}
      <div className={`${boxBase} border-2 border-[rgba(212,175,55,.55)] bg-[rgba(212,175,55,.08)]`} role="note" aria-label="Arbitration notice">
        <p className="!text-cream font-bold uppercase tracking-[.01em]">
          Important: Section 17 contains a binding arbitration agreement and class action waiver. It requires most
          disputes between you and {LEGAL.entityName} to be resolved through individual arbitration rather than in
          court, and it waives your right to a jury trial and to take part in a class action.
        </p>
        <p>
          You may opt out of the arbitration agreement within 30 days by following the steps in{' '}
          <a href="#arbitration-opt-out">Section 17(h)</a>. Please read it carefully.
        </p>
      </div>

      {/* Plain-English summary */}
      <div className={`${boxBase} border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.03)]`}>
        <h3>The short version</h3>
        <ul>
          <li>You must be 18+ and live in the United States to use Lootix.</li>
          <li>Our apparel is made to order after you buy it, so returns work differently — see our Returns Policy.</li>
          <li>No purchase is ever necessary to enter or win a giveaway. Each giveaway follows its Official Rules.</li>
          <li>Entries have no cash value and can’t be sold or transferred. Refunded or charged-back orders lose their entries.</li>
          <li>Don’t cheat: no bots, no duplicate accounts, no scraping, no reselling entries.</li>
          <li>If something goes wrong, email us first — we’d rather fix it than fight about it.</li>
          <li>Disputes go to individual arbitration unless you opt out within 30 days.</li>
        </ul>
        <p className="text-[14px]">
          This summary is only a guide. The full Terms below are what legally govern our relationship.
        </p>
      </div>

      {/* Table of contents */}
      <nav aria-label="Table of contents" className="my-8">
        <h3 className="!mt-0">Contents</h3>
        <ol className="md:columns-2 md:gap-8 md:!block [&>li]:mb-2 [&>li]:break-inside-avoid">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <hr />

      {/* 1 */}
      <H n={1} />
      <p>
        {LEGAL.entityName} (“Lootix,” “we,” “us,” or “our”) is a {state} limited liability company that designs and
        sells limited-run streetwear and runs promotional giveaways through <a href={LEGAL.siteUrl}>{LEGAL.siteUrl.replace(/^https?:\/\//, '')}</a>{' '}
        and related pages, emails, and services (together, the “Site”).
      </p>
      <p>
        By visiting the Site, creating an account, placing an order, or entering a giveaway, you agree to these Terms
        and to our <a href="/privacy">Privacy Policy</a>, which explains how we handle your personal information. If
        you do not agree, please do not use the Site.
      </p>

      {/* 2 */}
      <H n={2} />
      <p>
        To use the Site, make a purchase, or enter a giveaway, you must be at least 18 years old and a legal resident
        of the United States (the 50 states and the District of Columbia). The Site is not directed to children, and we
        do not knowingly collect information from anyone under 18. By using the Site, you confirm that you meet these
        requirements. Individual giveaways may have additional eligibility limits described in their Official Rules.
      </p>

      {/* 3 */}
      <H n={3} />
      <ul>
        <li>
          <strong>Accurate information.</strong> Give us true, current, and complete information and keep it up to
          date.
        </li>
        <li>
          <strong>One account per person.</strong> Each person may hold only one account. Accounts are personal and
          may not be shared, sold, or transferred.
        </li>
        <li>
          <strong>Your credentials.</strong> You are responsible for keeping your login secure and for activity that
          happens under your account. Tell us promptly at <Mail to={support} /> if you believe your account has been
          accessed without permission.
        </li>
        <li>
          <strong>Suspension and termination.</strong> We may suspend or close an account, and void any associated
          giveaway entries, if we reasonably believe it was used to violate these Terms or the Official Rules, to
          commit fraud, or in a way that puts other users or Lootix at risk.
        </li>
        <li>
          <strong>Inactive accounts.</strong> We may close accounts that have been inactive for 12 months or more.
          Before we do, we will email you at the address on file and give you at least 30 days to log in and keep the
          account open.
        </li>
      </ul>

      {/* 4 */}
      <H n={4} />
      <p>
        Subject to these Terms, we give you a limited, non-exclusive, non-transferable, revocable license to access
        and use the Site for your own personal, non-commercial purposes. We keep all rights we don’t expressly grant
        you. We may add, change, suspend, or remove any part of the Site or its features at any time, and we may
        revoke this license if you violate these Terms.
      </p>

      {/* 5 */}
      <H n={5} />
      <p>When using the Site, you agree that you will not:</p>
      <ul>
        <li>use the Site for any unlawful purpose or in violation of any applicable law or regulation;</li>
        <li>commit or attempt fraud, including payment fraud or fraudulent giveaway entries;</li>
        <li>access, or try to access, another person’s account or information;</li>
        <li>probe, test, bypass, or circumvent any security, access control, rate limit, or entry limit;</li>
        <li>use bots, scrapers, crawlers, spiders, scripts, or other automated means to access the Site, place orders, or earn entries;</li>
        <li>copy, decompile, disassemble, or reverse engineer any part of the Site, except where the law expressly permits it;</li>
        <li>use any content from the Site — including our designs, images, and text — to train, fine-tune, or build any artificial intelligence or machine learning model or dataset;</li>
        <li>create or use multiple accounts, identities, or email addresses to obtain more giveaway entries than you are allowed;</li>
        <li>buy, sell, trade, or transfer giveaway entries, or offer to do so;</li>
        <li>harass, threaten, impersonate, or abuse any person, including our team, other customers, or winners;</li>
        <li>upload malware or anything that interferes with, overloads, or disrupts the Site or the networks and services it relies on; or</li>
        <li>help or encourage anyone else to do any of the above.</li>
      </ul>

      {/* 6 */}
      <H n={6} />
      <ul>
        <li>
          <strong>Currency and pricing.</strong> All prices are in U.S. dollars. Prices, products, and availability
          may change at any time, but a change will not affect an order we have already accepted.
        </li>
        <li>
          <strong>How an order becomes a contract.</strong> When you check out, you are making an offer to buy the
          items in your cart. The order confirmation email you receive after checkout only confirms we got your
          order. A contract is formed when we accept your offer, which happens when we send you a shipment
          confirmation.
        </li>
        <li>
          <strong>Our right to refuse or cancel.</strong> We may decline or cancel any order — for example, if an item
          is sold out, if we suspect fraud or a violation of these Terms, or if a product was listed with an obvious
          error in price, description, or availability. If we cancel after you have been charged, we will refund the
          full amount you paid to your original payment method.
        </li>
        <li>
          <strong>Taxes.</strong> You are responsible for applicable sales and use taxes, which are calculated and
          shown at checkout.
        </li>
        <li>
          <strong>Payment processing.</strong> Payments are processed by our payment provider, Stripe. You authorize
          us and Stripe to charge your chosen payment method for the total shown at checkout. We never see or store
          your full card number; Stripe handles that information under its own terms and privacy policy.
        </li>
        <li>
          <strong>Title and risk of loss.</strong> Ownership of, and risk of loss for, the products you buy pass to
          you when we deliver them to the shipping carrier. This does not limit any help we provide for lost or
          damaged packages under our <a href="/shipping">Shipping Policy</a>.
        </li>
        <li>
          <strong>Limited editions.</strong> Many of our drops are produced in limited quantities. Adding an item to
          your cart does not reserve it, and we may limit how many units of a product one customer can buy.
        </li>
      </ul>

      {/* 7 */}
      <H n={7} />
      <p>
        Our products are made to order: each item is printed and produced by our print-on-demand production
        partners (such as Printify and the print providers it works with) after you order it. Production and delivery
        times, shipping costs, and what to do if a package is late, lost, or damaged are described in our{' '}
        <a href="/shipping">Shipping Policy</a>.
      </p>
      <p>
        Because every item is produced specifically for you, we generally cannot accept returns or exchanges for a
        change of mind or wrong size. If your item arrives defective, misprinted, or damaged, we’ll make it right as
        described in our <a href="/returns">Returns Policy</a>. The Shipping Policy and Returns Policy are part of
        these Terms.
      </p>

      {/* 8 */}
      <H n={8} />
      <p>
        Every Lootix giveaway is governed by its <a href="/official-rules">Official Rules</a>, which are incorporated
        into these Terms. If these Terms and the Official Rules conflict about a giveaway, the Official Rules control.
      </p>
      <ul>
        <li>
          <strong>No purchase necessary.</strong> No purchase or payment of any kind is necessary to enter or win.
          The Official Rules describe free ways to enter.
        </li>
        <li>
          <strong>Entries are not property.</strong> Entries have no cash value, are not redeemable for cash or
          merchandise, and cannot be sold, bought, traded, or transferred. They exist only for the purpose of
          participating in the giveaway they were issued for.
        </li>
        <li>
          <strong>Refunds and chargebacks.</strong> If an order that earned bonus entries is refunded, cancelled, or
          charged back, the entries earned from that order are forfeited and removed.
        </li>
        <li>
          <strong>Integrity.</strong> We may disqualify entries, entrants, or winners who violate these Terms or the
          Official Rules, including by using automation or multiple accounts.
        </li>
      </ul>

      {/* 9 */}
      <H n={9} />
      <p>
        Lootix memberships are currently waitlist-only, and we are not selling any subscriptions right now. This
        section describes the terms that will apply if and when we offer paid memberships or other recurring
        subscriptions (each, a “Membership”).
      </p>
      <ul>
        <li>
          <strong>Clear disclosure and your consent.</strong> Before you buy a Membership, we will clearly show you
          the price, how often you will be billed, that the Membership renews automatically, and how to cancel. We
          will not charge you until you affirmatively agree to those terms, and we will send you an acknowledgment
          that includes them and explains how to cancel.
        </li>
        <li>
          <strong>Automatic renewal.</strong> A Membership renews automatically at the end of each billing period, and
          your payment method will be charged the then-current price, until you cancel.
        </li>
        <li>
          <strong>Cancel anytime.</strong> You can cancel online at any time from your account settings, or by
          emailing <Mail to={support} />. Cancellation takes effect at the end of your current billing period, and you
          keep your Membership perks until then.
        </li>
        <li>
          <strong>Refunds.</strong> We do not provide refunds or credits for partial billing periods, except where
          required by law.
        </li>
        <li>
          <strong>Price changes.</strong> We will email you at least 30 days before any price change takes effect.
          If you don’t want to pay the new price, you can cancel before it applies.
        </li>
        <li>
          <strong>Free trials and promotional pricing.</strong> If a Membership starts with a free trial or
          discounted period, we will tell you when it converts to a paid Membership and at what price, and we will
          send you any reminder notice required by state law before the conversion.
        </li>
        <li>
          <strong>State auto-renewal laws.</strong> We will follow applicable state automatic-renewal laws, including
          California Business and Professions Code § 17600 et seq. If your state gives you additional rights, those
          rights apply.
        </li>
      </ul>

      {/* 10 */}
      <H n={10} />
      <p>
        If you think a charge is wrong, please contact us first at <Mail to={support} /> — most issues can be fixed
        quickly. Please tell us about any billing error within 60 days after the statement showing the charge first
        becomes available to you.
      </p>
      <p>
        If you file a chargeback or payment dispute for a charge that was valid, we may suspend your account and
        forfeit any giveaway entries associated with that charge while the dispute is pending and after it is
        resolved. Nothing in these Terms limits any rights you have under the Fair Credit Billing Act, the Electronic
        Fund Transfer Act, or other consumer protection laws, including your right to dispute a charge with your card
        issuer.
      </p>

      {/* 11 */}
      <H n={11} />
      <ul>
        <li>
          <strong>Electronic communications.</strong> You agree that we may provide notices, disclosures, receipts,
          and other records to you electronically — by email or by posting them on the Site — and that these satisfy
          any legal requirement that they be in writing. You can ask for a paper copy by emailing us.
        </li>
        <li>
          <strong>Marketing email.</strong> If you sign up for our emails, we may send you news about drops, offers,
          and giveaways. Every marketing email includes a working unsubscribe link, and we honor opt-outs as required
          by the CAN-SPAM Act. Unsubscribing from marketing does not stop transactional messages, such as order and
          shipping confirmations.
        </li>
        <li>
          <strong>Text messages.</strong> We do not currently send marketing text messages. If we launch an SMS
          program in the future, we will not text you unless you separately give us your express consent for that
          program.
        </li>
      </ul>

      {/* 12 */}
      <H n={12} />
      <p>
        <strong>Your content.</strong> If you post or send us content — such as reviews, photos, comments, or social
        media posts tagged to Lootix (“User Content”) — you keep ownership of it. You grant us a non-exclusive,
        worldwide, royalty-free, sublicensable license to host, use, reproduce, display, adapt, and share that User
        Content in connection with operating and promoting Lootix. You confirm that you have the rights needed to
        grant this license and that your User Content does not infringe anyone’s rights or break the law. We may
        remove or decline to display User Content that violates these Terms or the law.
      </p>
      <p>
        <strong>Reviews.</strong> Reviews must reflect your honest, first-hand experience with the product. We follow
        the Federal Trade Commission’s rule on consumer reviews and testimonials (16 C.F.R. Part 465): we do not buy
        fake reviews, we do not offer incentives conditioned on a positive (or negative) review, and we do not suppress
        or hide reviews because they are negative. We may remove reviews that are unrelated to the product, contain
        unlawful, harassing, or obscene content, reveal private information, or are clearly fraudulent — and we apply
        those standards the same way no matter how many stars a review gives.
      </p>
      <p>
        <strong>Feedback.</strong> If you send us ideas or suggestions, we may use them freely without paying you or
        owing you anything.
      </p>

      {/* 13 */}
      <H n={13} />
      <p>
        The Lootix name, logo, and other brand elements are trademarks of {LEGAL.entityName}. Our product designs,
        graphics, photography, text, and the software that runs the Site are owned by or licensed to Lootix and are
        protected by copyright, trademark, and other laws. Except for the limited license in Section 4, you may not
        copy, reproduce, distribute, modify, create derivative works from, or commercially use any of it without our
        written permission. Buying a Lootix product gives you ownership of that item, not any rights in its design.
      </p>

      {/* 14 */}
      <H n={14} />
      <p>
        We respect intellectual property rights and respond to notices of alleged copyright infringement under the
        Digital Millennium Copyright Act. If you believe material on the Site infringes your copyright, send a written
        notice to our designated agent that includes (as required by 17 U.S.C. § 512(c)(3)):
      </p>
      <ol>
        <li>a physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
        <li>identification of the copyrighted work you claim is infringed;</li>
        <li>identification of the material you claim is infringing, with enough information for us to locate it (such as a URL);</li>
        <li>your name, address, telephone number, and email address;</li>
        <li>a statement that you have a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law; and</li>
        <li>a statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the owner’s behalf.</li>
      </ol>
      <p>
        <strong>Counter-notice.</strong> If your content was removed and you believe it was removed by mistake or
        misidentification, you may send our agent a counter-notice that includes your signature; identification of
        the removed material and where it appeared; a statement under penalty of perjury that you have a good-faith
        belief it was removed by mistake or misidentification; and your name, address, and telephone number, with a
        statement that you consent to the jurisdiction of the federal district court for your address (or, if you are
        outside the U.S., any judicial district where we may be found) and will accept service of process from the
        person who sent the original notice. We may restore the material in 10 to 14 business days unless the
        complaining party notifies us that it has filed a court action.
      </p>
      <p>
        <strong>Repeat infringers.</strong> We will, in appropriate circumstances, terminate the accounts of users who
        are repeat infringers.
      </p>
      <p>
        <strong>Designated agent:</strong> {LEGAL.dmcaAgent}, {LEGAL.sponsorAddress}. Email: <Mail to={support} />.
      </p>

      {/* 15 */}
      <H n={15} />
      <p>
        The Site relies on and may link to services we don’t control — for example, Stripe for payments, our
        print-on-demand and shipping partners, and social media platforms. Your use of those services is governed by
        their own terms and privacy policies, and we are not responsible for their content, availability, or
        practices. A link to a third-party site is not an endorsement of it.
      </p>

      {/* 16 */}
      <H n={16} />
      <p className="uppercase">
        Except as expressly stated in these Terms or in our Returns Policy, and to the fullest extent permitted by
        law, the Site and all products, giveaways, and services are provided “as is” and “as available,” without
        warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness
        for a particular purpose, title, and non-infringement. We do not warrant that the Site will be uninterrupted,
        secure, or error-free, or that any content is complete or accurate. Colors and print placement may vary
        slightly from images shown on the Site due to screen settings and the made-to-order printing process.
      </p>
      <p>
        Some states do not allow the exclusion of implied warranties, so some of these exclusions may not apply to
        you. In that case, any implied warranty is limited to the shortest period the law allows.
      </p>

      {/* 17 */}
      <H n={17} />
      <p>
        <strong>Please read this section carefully. It affects your legal rights.</strong>
      </p>

      <h3>(a) Try to resolve it informally first</h3>
      <p>
        Before starting an arbitration or small claims case, you and we each agree to try to resolve the dispute
        informally. The party raising the dispute must send a written notice to the other — you send yours to{' '}
        <Mail to={support} />; we send ours to the email address associated with your account or order. The notice
        must include the sender’s name and contact information, a description of the dispute, and the relief
        requested. Both sides will then negotiate in good faith for at least 30 days. Any applicable statute of
        limitations and filing-fee deadlines are paused during this 30-day period.
      </p>

      <h3>(b) Agreement to arbitrate</h3>
      <p>
        If the dispute is not resolved within 30 days, you and {LEGAL.entityName} agree that any dispute, claim, or
        controversy arising out of or relating to these Terms, the Site, any product, any giveaway, any Membership, or
        our relationship with you — whether based in contract, tort, statute, fraud, or any other legal theory, and
        whether it arose before or after you agreed to these Terms — will be resolved by final and binding
        arbitration on an individual basis. The arbitrator decides all questions about the scope, validity, and
        enforceability of this arbitration agreement, except that a court decides questions about the class action
        waiver in Section 17(f), the mass-arbitration procedures in Section 17(g), and the opt-out in Section 17(h).
      </p>

      <h3>(c) Exceptions</h3>
      <ul>
        <li>
          <strong>Small claims court.</strong> Either party may bring an individual claim in small claims court if it
          qualifies and stays there on an individual basis.
        </li>
        <li>
          <strong>Intellectual property.</strong> Either party may go to court to seek an injunction or other
          equitable relief to stop the actual or threatened infringement, misappropriation, or misuse of its
          intellectual property rights.
        </li>
      </ul>

      <h3>(d) Rules and fees</h3>
      <p>
        The arbitration will be administered by the American Arbitration Association (“AAA”) under its Consumer
        Arbitration Rules then in effect, as modified by this Section 17. The rules are available at{' '}
        <a href="https://www.adr.org" target="_blank" rel="noopener noreferrer">adr.org</a>. Payment of filing,
        administration, and arbitrator fees will be governed by the AAA’s consumer fee schedule; we will pay all fees
        that the AAA Consumer Arbitration Rules require the business to pay, and you will never be required to pay
        more than the consumer filing fee those rules allow. If the arbitrator finds that a claim was frivolous or
        brought for an improper purpose, fees will be allocated as the AAA rules provide.
      </p>

      <h3>(e) The hearing and the award</h3>
      <p>
        If your claim is for $25,000 or less, the arbitration will be decided on written submissions unless you
        request a hearing or the arbitrator decides one is needed. Any hearing will take place by video conference or,
        if you prefer, in person in the county where you live. The arbitrator may award the same individual relief a
        court could award, but only in favor of the individual party seeking relief and only to the extent needed to
        resolve that party’s individual claim. The arbitrator will issue a written decision explaining the essential
        findings and conclusions, and judgment on the award may be entered in any court with jurisdiction.
      </p>

      <h3>(f) Class action and jury trial waiver</h3>
      <p className="uppercase">
        You and {LEGAL.entityName} each agree to bring claims against the other only in an individual capacity, and
        not as a plaintiff or class member in any purported class, collective, consolidated, or representative
        proceeding. The arbitrator may not consolidate more than one person’s claims or preside over any form of
        class or representative proceeding, except as provided in Section 17(g). You and {LEGAL.entityName} each
        waive the right to a trial by jury.
      </p>

      <h3>(g) Mass arbitration</h3>
      <p>
        If 25 or more demands for arbitration raising substantially similar claims are filed against us by or with
        the help of the same or coordinated counsel or organizations, the AAA’s Mass Arbitration Supplementary Rules
        will apply, and the demands will be administered in batches of no more than 50 demands each (with one batch
        per claimant where required to keep claims individual). Only one batch will proceed at a time; the next
        batch begins once the prior batch is resolved, and the remaining demands will be held in abeyance with
        no fees owed on them until their batch begins. The parties will cooperate in good faith to implement this
        process, and all statutes of limitations for the claims in abeyance are paused until their batch begins. A
        court may enforce this Section 17(g).
      </p>

      <h3 id="arbitration-opt-out" className="scroll-mt-28">(h) Your right to opt out</h3>
      <p>
        <strong>
          You may opt out of this arbitration agreement by emailing <Mail to={support} /> within 30 days after you
          first accept these Terms.
        </strong>{' '}
        Use the subject line “Arbitration Opt-Out” and include your full name, the email address you use with Lootix,
        and a clear statement that you want to opt out of the arbitration agreement in the Lootix Terms of Service.
        If you opt out, disputes will be resolved in court under Section 20, and all other parts of these Terms will
        still apply. Opting out does not affect any prior arbitration agreement you made with us or any giveaway
        entries.
      </p>

      <h3>(i) If the class waiver is unenforceable</h3>
      <p>
        If a court decides that the class action waiver in Section 17(f) cannot be enforced as to a particular claim
        or request for relief, then that claim or request (and only that one) will be severed from the arbitration
        and decided in court under Section 20, after the individual claims are arbitrated. All other claims will
        remain in individual arbitration.
      </p>

      <h3>(j) Survival</h3>
      <p>
        This Section 17 survives the termination of these Terms, the closure of your account, and the end of any
        giveaway or Membership.
      </p>

      {/* 18 */}
      <H n={18} />
      <p className="uppercase">
        To the fullest extent permitted by law, {LEGAL.entityName} and its members, managers, employees, agents, and
        partners will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive
        damages, or for any loss of profits, data, goodwill, or opportunity, arising out of or relating to these
        Terms, the Site, any product, any giveaway, or any Membership, even if we were told such damages were
        possible. Our total liability for all claims arising out of or relating to these Terms, the Site, any product,
        any giveaway, or any Membership will not exceed the greater of (a) the total amount you paid to Lootix in the
        12 months before the event giving rise to the claim, or (b) one hundred U.S. dollars ($100).
      </p>
      <p>
        Some states do not allow the exclusion or limitation of certain damages, such as incidental or consequential
        damages, or liability for gross negligence, fraud, intentional misconduct, or personal injury. If you live in
        one of those states, some or all of these limitations may not apply to you, and nothing in these Terms limits
        liability that cannot be limited under applicable law.
      </p>

      {/* 19 */}
      <H n={19} />
      <p>
        You agree to defend, indemnify, and hold harmless {LEGAL.entityName} and its members, managers, and employees
        from third-party claims, and the reasonable losses, costs, and attorneys’ fees that result from them, to the
        extent they arise from (a) your breach of these Terms, (b) your violation of any law or the rights of a third
        party, or (c) your User Content. We will notify you promptly of any such claim, you may choose counsel
        reasonably acceptable to us, and you may not settle a claim in a way that imposes obligations on us without
        our consent. This section does not require you to indemnify us for our own negligence or misconduct.
      </p>

      {/* 20 */}
      <H n={20} />
      <p>
        These Terms are governed by the laws of the State of {state}, without regard to its conflict-of-laws rules.
        The Federal Arbitration Act governs the interpretation and enforcement of Section 17. For any matter that is
        not subject to arbitration (including if you opt out), you and we agree to the exclusive jurisdiction and
        venue of the state courts located in {LEGAL.venueCounty}, {state}, or the United States District Court for the
        District of {state}. This choice of law does not deprive you of any mandatory consumer protections of the
        state where you live.
      </p>

      {/* 21 */}
      <H n={21} />
      <p>
        You may stop using the Site at any time, and you may ask us to close your account by emailing{' '}
        <Mail to={support} />. We may suspend or terminate your access to the Site as described in Sections 3 and 4.
        If your account is closed, any active Membership will be cancelled (with no further charges), and orders we
        have already accepted will still be fulfilled unless we cancel them under Section 6. Sections that by their
        nature should continue — including Sections 8 (as to entries already forfeited), 10, 12 through 14, and 16
        through 23 — survive termination.
      </p>

      {/* 22 */}
      <H n={22} />
      <p>
        We may update these Terms from time to time. We will post the updated Terms on this page and change the “Last
        updated” date above. If we make a material change, we will give you notice by email or by a prominent notice
        on the Site at least 14 days before the change takes effect. If you keep using the Site after an update takes
        effect, the updated Terms will apply to you; if you don’t agree, stop using the Site and, if you like, close
        your account.
      </p>
      <p>
        Changes will not apply retroactively. In particular, changes to Section 17 will not apply to any dispute for
        which a notice of dispute was already sent before the change was posted — those disputes will be governed by
        the version of Section 17 in effect when the notice was sent.
      </p>

      {/* 23 */}
      <H n={23} />
      <ul>
        <li>
          <strong>Entire agreement.</strong> These Terms, together with our <a href="/privacy">Privacy Policy</a>,{' '}
          <a href="/official-rules">Official Rules</a>, <a href="/shipping">Shipping Policy</a>, and{' '}
          <a href="/returns">Returns Policy</a>, are the entire agreement between you and us about the Site and
          replace any earlier agreements on the same subject.
        </li>
        <li>
          <strong>Severability.</strong> If any part of these Terms is found unenforceable, the rest stays in effect,
          and the unenforceable part will be enforced to the maximum extent allowed (subject to Section 17(i)).
        </li>
        <li>
          <strong>No waiver.</strong> If we don’t enforce a provision right away, we have not given up our right to
          enforce it later.
        </li>
        <li>
          <strong>Assignment.</strong> You may not assign or transfer these Terms without our written consent. We may
          assign them in connection with a merger, acquisition, or sale of assets, or to an affiliate, as long as the
          assignee agrees to honor them.
        </li>
        <li>
          <strong>Force majeure.</strong> We are not responsible for delays or failures caused by events beyond our
          reasonable control, such as natural disasters, carrier or supplier disruptions, labor disputes, internet or
          utility outages, or government action.
        </li>
        <li>
          <strong>Headings.</strong> Section headings and the short-version summary are for convenience only and do
          not affect how these Terms are interpreted.
        </li>
      </ul>

      {/* 24 */}
      <H n={24} />
      <p>Questions about these Terms? Reach us at:</p>
      <p>
        <strong>{LEGAL.entityName}</strong>
        <br />
        {LEGAL.sponsorAddress}
        <br />
        General &amp; legal notices: <Mail to={support} />
        <br />
        Privacy requests: <Mail to={LEGAL.privacyEmail} />
        <br />
        Copyright notices: {LEGAL.dmcaAgent}, <Mail to={support} />
      </p>
    </ContentPage>
  );
}
