import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { ENTRIES_PER_DOLLAR, MAIL_IN_ENTRIES, SIGNUP_ENTRIES, ODDS_LONG_MD } from '@/config/giveaway';
import { COMPANY_ADDRESS } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — Lootix',
  description: 'The rules governing your use of the Lootix website and services.',
};

export default function TermsPage() {
  return (
    <ContentPage eyebrow="Legal" title="Terms of Service" updated="March 2026">
      <h2>1. Agreement to Terms</h2>
      <p>By accessing or using the Lootix website at <a href="https://getlootix.com">getlootix.com</a> (the &ldquo;Site&rdquo;) and any services offered by Lootix LLC (&ldquo;Lootix,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use our Site or services.</p>

      <h2>2. Eligibility</h2>
      <p>You must be at least 18 years old and a legal resident of the United States (or a jurisdiction where our services are not prohibited) to use our Site, make purchases, or enter giveaways. By using our Site, you represent that you meet these requirements.</p>

      <h2>3. Account Registration</h2>
      <p>Certain features may require an account. You agree to provide accurate information and keep your credentials secure, and you are responsible for all activity under your account. We may suspend or terminate accounts that violate these Terms or are used fraudulently.</p>

      <h2>4. Purchases &amp; Payments</h2>
      <ul>
        <li>All prices are in US dollars and subject to change without notice.</li>
        <li>Payment is processed securely through our third-party provider (Stripe).</li>
        <li>You agree to pay all charges incurred, including applicable taxes and shipping.</li>
        <li>Because products are made-to-order, we do not accept returns for change of mind. See our <a href="/returns">Returns</a> policy for defective items.</li>
      </ul>

      <h2>5. Giveaways &amp; Sweepstakes</h2>
      <p>Each giveaway is run under its own <a href="/official-rules">Official Rules</a>, which are part of these Terms. Please read them before you enter.</p>
      <ul>
        <li><NoPurchaseNotice as="span" line={ODDS_LONG_MD} /></li>
        <li>Entries are earned as stated in the Official Rules (one ({ENTRIES_PER_DOLLAR}) entry per whole U.S. dollar on purchases, twenty-five ({MAIL_IN_ENTRIES}) per free mail-in card, ten ({SIGNUP_ENTRIES}) for a free online sign-up).</li>
        <li>Lootix reserves the right to modify, suspend, or cancel any giveaway at its discretion.</li>
      </ul>

      <h2>6. Intellectual Property</h2>
      <p>All content on the Site — text, graphics, logos, images, designs, and software — is the property of Lootix LLC and protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

      <h2>7. Prohibited Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Use automated tools (bots, scrapers) to access the Site</li>
        <li>Submit false information or create fraudulent giveaway entries</li>
        <li>Interfere with the Site&rsquo;s functionality or other users&rsquo; experience</li>
        <li>Resell products purchased from Lootix without authorization</li>
      </ul>

      <h2>8. Disclaimer of Warranties</h2>
      <p>THE SITE AND ALL PRODUCTS AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

      <h2>9. Limitation of Liability</h2>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOOTIX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SITE OR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>

      <h2>10. Governing Law</h2>
      <p>Maryland law governs.</p>

      <h2>11. Changes to Terms</h2>
      <p>We may update these Terms at any time. Changes take effect when posted to the Site. Continued use after changes constitutes acceptance.</p>

      <h2>12. Disputes</h2>
      <p><strong>{"In plain words:"}</strong>{" if something goes wrong, tell us first and we will try to fix it. If that does not work within 60 days, either of us can use small-claims court. Only if a claim is not settled and not in small-claims court does it go to an individual arbitration, which Lootix pays for beyond your filing fee. No class actions and no jury. You can opt out of arbitration within 30 days by email or mail. Opting out of arbitration does not opt out of the class-action and jury waivers; they still apply in court."}</p>
      <p><strong>{"12.1 Maryland law."}</strong>{" These Terms, and any dispute between you and Lootix LLC, are governed by Maryland law and, where it applies, the Federal Arbitration Act, without regard to conflict-of-law rules. A \"Dispute\" means any dispute, claim, or controversy between you and Lootix arising out of or relating to these Terms, the site, your orders, or any Lootix giveaway."}</p>
      <p><strong>{"12.2 Step 1: Contact us first."}</strong>{" Before anyone files anything, the side with the complaint sends a written Dispute Notice. You send yours by email to hello@getlootix.com (subject \"Dispute Notice\") or by mail to Lootix LLC, Attn: Dispute Notice, 9 Aberdeen Shopping Plz, Unit B #3017, Aberdeen, MD 21001. Lootix sends its notice to the email or mailing address it has for you. The notice must include: (a) your name and how to reach you (email, mailing address, and phone if you want a call); (b) your order number or giveaway entry details, if any; (c) what happened; and (d) what you want us to do. We will reply within 5 business days to confirm we have it and say who is handling it. For ordinary questions, fixes, and refunds you do not need a Dispute Notice; see Section 11."}</p>
      <p><strong>{"12.3 Step 2: Good-faith resolution window."}</strong>{" For 60 days after the Dispute Notice is received (the \"Resolution Window\"), both sides will try in good faith to resolve the Dispute. Either side may ask for a phone or video call, and the other side will take part at a reasonable time. During the Resolution Window: (a) all statutes of limitation and all filing deadlines (including AAA deadlines) are paused, from the day the notice is received until the window ends; and (b) neither side may file in any court or arbitration, except to stop a deadline from running out if the pause above is not honored, or to ask a court for urgent relief to prevent immediate harm. The two sides may agree in writing to extend the window."}</p>
      <p><strong>{"12.4 Step 3: Small-claims court."}</strong>{" After the Resolution Window, either you or Lootix may bring an individual claim in small-claims court instead of arbitration, if the claim qualifies (in Maryland, the District Court small-claims limit is $5,000, Md. Code, Cts. & Jud. Proc. \u00a74-405). You may file in the small-claims court for the county where you live or in Harford County, Maryland. If Lootix files a small-claims case, it will file in the small-claims court for the county where you live. If either side files an arbitration that could have been brought in small-claims court, the other side may ask for it to be decided in small-claims court, and it will be moved there as AAA Consumer Rule R-9 provides."}</p>
      <p><strong>{"12.5 Step 4: Individual arbitration, only as a backstop."}</strong>{" If a Dispute is not resolved in Steps 1 and 2 and is not brought in small-claims court, it will be resolved only by final and binding arbitration on an individual basis, administered by the American Arbitration Association (\"AAA\") under its Consumer Arbitration Rules in effect when the arbitration is started (see adr.org)."}</p>
      <p>{"(a) "}<strong>{"Fees."}</strong>{" If you start the arbitration, you pay only the consumer filing fee set by AAA (currently capped at $225); Lootix pays all other AAA filing, administrative, hearing, and arbitrator fees. If Lootix starts it, Lootix pays all of them."}</p>
      <p>{"(b) "}<strong>{"Hearing."}</strong>{" You may choose a phone, video, or documents-only arbitration. Any in-person hearing will be held in the county where you live, unless both sides agree to another place."}</p>
      <p>{"(c) "}<strong>{"Relief."}</strong>{" The arbitrator may award any individual relief a court could award, including attorneys' fees and costs where the law allows them (for example under the Maryland Consumer Protection Act, Md. Code, Com. Law \u00a713-408), and must follow Maryland law and these Terms. The arbitrator may award reasonable attorneys' fees and costs to the same extent a court could, including under Md. Code, Com. Law \u00a713-408, and the parties agree the arbitrator has that authority. A court may enter judgment on the award."}</p>
      <p><strong>{"12.6 Many similar claims (mass arbitration)."}</strong>{" If 25 or more similar arbitration demands are filed against Lootix by or with the help of the same or coordinated lawyers, AAA's Mass Arbitration Supplementary Rules apply, and the following also applies to the extent those rules allow: (a) the parties will first pick a small number of test cases (for example, up to 10, half picked by each side) to be decided, and the other demands are paused while that happens; (b) after the test cases, the remaining demands may be handled in batches, with one arbitrator per batch; (c) cases may be decided on documents only unless the arbitrator finds a hearing is needed; and (d) all statutes of limitation and filing deadlines for the paused demands are paused until their batch starts. Nothing in this Section prevents anyone from bringing their own claim."}</p>
      <p><strong>{"12.7 No class actions; jury waiver."}</strong>{" "}<strong>{"YOU AND LOOTIX MAY BRING CLAIMS ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION. THE ARBITRATOR MAY NOT COMBINE MORE THAN ONE PERSON'S CLAIMS (EXCEPT AS SECTION 12.6 ALLOWS FOR TEST CASES AND BATCHES) AND MAY NOT PRESIDE OVER ANY CLASS OR REPRESENTATIVE PROCEEDING."}</strong>{" If this Section 12.7 is found unenforceable for a claim, that claim goes to court under Section 12.9, never to class arbitration, and the rest of this Section 12 still applies to everything else. A request for public injunctive relief (relief that mainly benefits the general public), where the law does not allow it to be waived, will be decided only by a court under Section 12.9, after the individual claims are decided, and is paused until then. "}<strong>{"IF A DISPUTE PROCEEDS IN COURT, YOU AND LOOTIX EACH WAIVE THE RIGHT TO A JURY TRIAL TO THE EXTENT ALLOWED BY LAW."}</strong></p>
      <p><strong>{"12.8 Court orders to stop misuse (both sides)."}</strong>{" Either you or Lootix may go to court to get an injunction or other equitable relief to stop infringement or misuse of its intellectual property, tampering with the site or a giveaway, or misuse of personal information."}</p>
      <p><strong>{"12.9 Courts."}</strong>{" Any Dispute that is not arbitrated (because you opted out under Section 12.10, because the law does not allow it to be arbitrated, or under Section 12.7 or 12.8), and any action to enforce an arbitration award or to compel arbitration, will be brought only in the state courts located in Harford County, Maryland, or the U.S. District Court for the District of Maryland, and each of us consents to those courts' jurisdiction. This does not limit small-claims court under Section 12.4."}</p>
      <p><strong>{"12.10 30-day opt-out."}</strong>{" You may opt out of arbitration (Sections 12.5 and 12.6) within 30 days after you first accept these Terms (your first purchase, sign-up, or giveaway entry) by emailing hello@getlootix.com with the subject \"Arbitration Opt-Out,\" or by mail to Lootix LLC, Arbitration Opt-Out, 9 Aberdeen Shopping Plz, Unit B #3017, Aberdeen, MD 21001. Include your name, the email address you use with us, and the words \"I opt out of arbitration.\" We will confirm an emailed opt-out by email. Opting out does not affect any other part of these Terms; your Dispute then goes to court under Section 12.9 (or small-claims court under Section 12.4). Disputes about a giveaway are governed by that giveaway's Official Rules Section 12, not this Section 12; the current Official Rules have no arbitration, so there is nothing to opt out of there."}</p>
      <p><strong>{"12.11 Changes to this Section."}</strong>{" If we change this Section 12: (a) the change does not apply to any Dispute for which a Dispute Notice was already sent, or to any claim already filed; (b) we will give at least 30 days' notice of a material change by posting it on the site and, where we have your email, emailing you; and (c) you may reject the change by emailing hello@getlootix.com within 30 days of the notice, in which case the version you last agreed to keeps applying to you."}</p>
      <p><strong>{"12.12 If part of this Section is invalid."}</strong>{" If any part of this Section 12 (other than Section 12.7, which is handled there) is unenforceable, that part is cut out and the rest stays in effect."}</p>

      <h2>13. Contact</h2>
      <p>Questions about these Terms? Contact <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>, or write to {COMPANY_ADDRESS}.</p>
    </ContentPage>
  );
}
