import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { LEGAL_EFFECTIVE_DATE } from '@/config/legal';

// Wording copied verbatim from Legal's clean draft
// (lootix/legal/launch-clean/privacy-LAUNCH-CLEAN-DRAFT-2026-10-24.md). Do not edit wording here; change the source draft.
export const metadata: Metadata = {
  title: "Privacy Policy \u2014 Lootix",
  description: "How Lootix collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Privacy Policy" updated={LEGAL_EFFECTIVE_DATE}>
      <p>{"Last updated: "}{LEGAL_EFFECTIVE_DATE}{". Lootix LLC (\"we\"), Lootix LLC, 9 Aberdeen Shopping Plz, Unit B #3017, Aberdeen, MD 21001. Privacy contact: privacy@getlootix.com."}</p>
      <h2>{"1. Information we collect"}</h2>
      <ul>
        <li>{"You give us: name, email, phone, shipping/billing address, date of birth (for sweepstakes age checks), order details, mail-in entry card contents, and messages."}</li>
        <li>{"Payments: card data is handled by Stripe; we don't store full card numbers."}</li>
        <li>{"Automatically: device/browser info, IP address, pages viewed, and cookie data (see Section 6)."}</li>
        <li>{"Sweepstakes winners only: identity verification, signed affidavit, and, if required, W-9/taxpayer ID \u2014 collected through a secure channel only and stored separately from entry data."}</li>
      </ul>
      <h2>{"2. How we use it"}</h2>
      <p>{"To fulfill orders, run giveaways (including verifying eligibility and preventing fraud), provide support, send marketing email if you opt in, improve the site, and meet legal and tax obligations."}</p>
      <h2>{"3. Sharing"}</h2>
      <p>{"We do not sell your personal information for money. If you allow advertising cookies, we share limited device and browsing data (pages viewed, purchases, IP address, cookie IDs) with Meta and TikTok to measure and target our ads. In some states this may count as a \"sale\" or \"sharing\" for targeted advertising, and you can opt out (see Section 6). We also share with service providers to run our business: Stripe (payments), Printful (production/shipping), Supabase (hosting/database), Resend (email delivery), Vercel (hosting and site analytics), and professional advisers; and when required by law. Winners: we may publish first name, last initial, and state."}</p>
      <h2>{"4. Data retention"}</h2>
      <table>
        <thead><tr><th>{"Data"}</th><th>{"Kept for"}</th></tr></thead>
        <tbody>
          <tr><td>{"Order and payment records"}</td><td>{"7 years (tax/accounting)"}</td></tr>
          <tr><td>{"Sweepstakes entry data (non-winners)"}</td><td>{"12 months after the drawing"}</td></tr>
          <tr><td>{"Mail-in entry cards"}</td><td>{"6 months after the drawing, then shredded"}</td></tr>
          <tr><td>{"Winner affidavit and verification"}</td><td>{"4 years"}</td></tr>
          <tr><td>{"W-9 / taxpayer ID"}</td><td>{"4 years, encrypted, access limited to owner/accountant"}</td></tr>
          <tr><td>{"Marketing list"}</td><td>{"Until you unsubscribe"}</td></tr>
          <tr><td>{"Analytics and pixel data"}</td><td>{"Up to 14 months, or as set by the provider"}</td></tr>
        </tbody>
      </table>
      <h2>{"5. Security and breach notice"}</h2>
      <p>{"We use reasonable safeguards (encryption in transit, access controls, limited staff access). No system is perfectly secure. If a breach affects your personal information, we'll notify you and regulators as required by applicable law, including the Maryland Personal Information Protection Act."}</p>
      <h2 id="cookies">{"6. Cookies, analytics and pixels"}</h2>
      <p>{"We use essential cookies (cart, checkout, login). We use Vercel Analytics to count visits and page views. With your consent where required, we use the Meta Pixel and TikTok Pixel to measure ad results and show you Lootix ads on those platforms. A cookie banner lets you accept or reject non-essential cookies, and you can change your choice anytime through the \"Your Privacy Choices\" link in the site footer. We honor Global Privacy Control (GPC) signals as an opt-out of sale/sharing and targeted advertising. You can also block cookies in your browser; essential features may stop working. "}<strong>{"Do Not Track:"}</strong>{" apart from GPC, we do not respond to browser \"Do Not Track\" signals because no common standard exists."}</p>
      <h2>{"7. Your rights (all users)"}</h2>
      <p>{"You can ask to access, correct, delete, or get a copy of your personal information, and opt out of marketing at any time (unsubscribe link). Email privacy@getlootix.com with \"Privacy Request.\" We'll verify your identity by matching information we already hold and respond within 45 days (extendable once by 45 days where the law allows). You may use an authorized agent. We won't discriminate against you for exercising rights. If we deny a request, you may appeal by replying \"Appeal\"; we'll respond within 60 days, and you may contact your state Attorney General if unsatisfied."}</p>
      <h2>{"8. State privacy laws"}</h2>
      <p>{"We extend the rights in Section 7 to everyone, whether or not a specific law applies to us. Status of key laws:"}</p>
      <ul>
        <li><strong>{"Maryland Online Data Privacy Act (MODPA, effective Oct 1, 2025):"}</strong>{" applies to businesses that process data of 35,000+ Maryland consumers (or 10,000+ and derive 20%+ of revenue from selling data). We currently [do not meet / meet] these thresholds. We do not sell data and do not process sensitive data beyond what's needed for the service."}</li>
        <li><strong>{"California (CCPA/CPRA):"}</strong>{" applies to businesses with $25M+ revenue, or that buy/sell/share data of 100,000+ CA consumers, or derive 50%+ revenue from selling/sharing. We currently do not meet these thresholds. "}<strong>{"Shine the Light:"}</strong>{" we don't share personal information with third parties for their direct marketing."}</li>
        <li><strong>{"Colorado, Connecticut, Virginia, Utah, Texas, Oregon, Delaware, and other comprehensive state laws:"}</strong>{" thresholds generally based on number of state residents' data processed; we currently [do not meet] them, except that Texas' law applies to businesses that are not small businesses under SBA definitions \u2014 we are a small business."}</li>
        <li><strong>{"Nevada:"}</strong>{" we don't sell covered information; you may still submit an opt-out request to privacy@getlootix.com."}</li>
      </ul>
      <h2>{"9. Children"}</h2>
      <p>{"The site is not for anyone under 18, and we don't knowingly collect data from children under 13 (or minors under 18 for giveaways). Contact us to delete such data."}</p>
      <h2>{"10. Changes"}</h2>
      <p>{"We'll post updates here and change the \"Last updated\" date; material changes will be highlighted on the site or emailed."}</p>
      <h2>{"11. Questions and complaints"}</h2>
      <p>{"If you have a question or concern about how we handle your information, email privacy@getlootix.com (or hello@getlootix.com) first and we will try to fix it; we aim to reply within 5 business days. Section 7 (your rights) still applies. Other disputes with Lootix follow Sections 11 and 12 of the Terms of Use; this Privacy Policy does not change them or take away any right you have under law. Giveaway entry data and winner paperwork are also covered by the Official Rules (Sections 13 and 8)."}</p>
    </ContentPage>
  );
}
