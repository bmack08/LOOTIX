import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { ENTRIES_PER_DOLLAR, MAIL_IN_ENTRIES, SIGNUP_ENTRIES, ODDS_LONG_MD } from '@/config/giveaway';
import { COMPANY_ADDRESS } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Terms of Use — Lootix',
  description: 'The rules governing your use of the Lootix website and services.',
};

export default function TermsPage() {
  return (
    <ContentPage eyebrow="Legal" title="Terms of Use" updated="[EFFECTIVE DATE]">
      <p>{"Last updated: [EFFECTIVE DATE]. These Terms are between you and Lootix LLC, a Maryland limited liability company (\"Lootix,\" \"we\"), Lootix LLC, 9 Aberdeen Shopping Plz, Unit B #3017, Aberdeen, MD 21001, hello@getlootix.com. By using the site, placing an order, signing up, or entering a giveaway, you agree to these Terms and the Privacy Policy."}</p>

      <h2>{"1. Eligibility and accounts"}</h2>
      <p>{"You must be 18 or older to use the site or buy. You're responsible for your account and its activity. We ship to U.S. addresses only. "}<strong>{"Only U.S. residents (50 states + D.C.) are eligible for sweepstakes entries; orders shipped outside the U.S. do not earn entries."}</strong></p>

      <h2>{"2. Orders and payments"}</h2>
      <p>{"Payments are processed by Stripe. Prices are in USD. We may cancel orders for suspected fraud or pricing errors and refund you. Products are made to order; production takes 2\u20137 business days plus shipping transit (see "}<a href="/shipping">{"/shipping"}</a>{")."}</p>

      <h2>{"3. Returns and refunds"}</h2>
      <p>{"Made-to-order items can't be returned for change of mind. Defective, damaged, or wrong items must be reported within 14 days of delivery for a replacement or refund. Size exchanges: allowed within 30 days of delivery for an equal-value item in a different size or color; the exchange keeps any sweepstakes entries the order earned. If an order is fully refunded or charged back, any sweepstakes entry it earned is void. If there is a problem with an order, please email hello@getlootix.com first so we can try to fix it before you dispute the charge with your bank; this does not limit any right you have with your card issuer. If a refund or chargeback is reversed or resolved in your favor and the order stands, the entries are restored."}</p>

      <h2>{"4. Sweepstakes"}</h2>
      <p>{"Each giveaway is governed by its own Official Rules (e.g., "}<a href="/official-rules">{"/official-rules"}</a>{"), which are incorporated here."}</p>
      <NoPurchaseNotice line={ODDS_LONG_MD} />
      <p>{"Entries are earned as stated in the Official Rules (one ("}{ENTRIES_PER_DOLLAR}{") entry per whole U.S. dollar on purchases, twenty-five ("}{MAIL_IN_ENTRIES}{") per free mail-in card, ten ("}{SIGNUP_ENTRIES}{") for a free online sign-up). "}{"Giveaways are not sponsored, endorsed, or administered by Instagram/Meta, TikTok, YouTube, X, Discord, Apple, or Google. If these Terms and a giveaway's Official Rules differ on that giveaway, the Official Rules control. Questions about an entry or a winner decision start with hello@getlootix.com and the steps in the Official Rules (Sections 8A and 11A), then Sections 11 and 12 of these Terms."}</p>

      <h2>{"5. Intellectual property"}</h2>
      <p>{"All site content, designs, and the LOOTIX name and logo belong to Lootix LLC. You may not copy or resell them. See "}<a href="/dmca">{"/dmca"}</a>{" for copyright complaints."}</p>

      <h2>{"6. Prohibited conduct"}</h2>
      <p>{"No fraud, bots, scraping, multiple identities to gain entries, interference with the site, or buying with intent to return to obtain entries."}</p>

      <h2>{"7. Disclaimer of warranties"}</h2>
      <p>{"The site is provided \"as is\" and \"as available.\" Products are covered by any warranty stated in our returns policy and by any warranty the law gives you for products you buy for personal, family, or household use; these Terms do not exclude or limit those warranties. Except for those, and to the extent allowed by law, we make no other warranties, express or implied, about the site."}</p>

      <h2>{"8. Limitation of liability"}</h2>
      <p>{"To the extent allowed by law, our total liability is limited to the amount you paid us in the 12 months before the claim, and we are not liable for indirect or consequential damages. This Section does not limit liability that the law does not allow to be limited, including liability for fraud, intentional wrongdoing, or gross negligence, and it does not limit any right you have under Maryland consumer protection law or any other law that cannot be waived."}</p>

      <h2>{"9. Indemnification"}</h2>
      <p>{"You agree to defend, indemnify, and hold harmless Lootix LLC and its owners, members, employees, and agents from claims, losses, and expenses (including reasonable attorneys' fees) arising from your misuse of the site, violation of these Terms, or violation of any law or third-party right."}</p>

      <h2>{"10. Force majeure"}</h2>
      <p>{"We are not liable for delay or failure caused by events beyond our reasonable control, including natural disasters, pandemics, war, labor disputes, carrier or print-partner outages, internet or utility failures, or government action."}</p>

      <h2>{"11. Informal dispute resolution (pre-suit notice)"}</h2>
      <p>{"Before filing any claim, you agree to send a Dispute Notice and take part in the good-faith Resolution Window described in Sections 12.2 and 12.3. For ordinary questions, fixes, and refunds you do not need a formal Dispute Notice: just email hello@getlootix.com and we aim to reply within [3] business days."}</p>

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

      <h2>{"14. Severability; entire agreement; no waiver"}</h2>
      <p>{"If any provision is unenforceable, the rest remains in effect. These Terms, the Privacy Policy, and any Official Rules are the entire agreement. Our failure to enforce a provision is not a waiver. Notices to us go by email to hello@getlootix.com; notices to you go to the email address on your order, account, or entry, or are posted on the site."}</p>

      <h2>{"15. Changes"}</h2>
      <p>{"We may update these Terms; the \"Last updated\" date will change. Material changes apply prospectively: they do not apply to a dispute that began before the change, and we will post them on the site and, where we have your email from an order or account, email you. Changes to Section 12 are governed only by Section 12.11; this Section 15 does not apply to Section 12."}</p>

      <h2 id="accessibility">{"16. Accessibility"}</h2>
      <p>{"We aim to meet WCAG 2.1 AA. If you have trouble using the site, email hello@getlootix.com and we'll help and fix the issue. (See "}<a href="/terms#accessibility">{"/accessibility"}</a>{".)"}</p>
    </ContentPage>
  );
}
