import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

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
      <p>Lootix operates legally compliant sweepstakes. Each giveaway is governed by its own <a href="/official-rules">Official Rules</a>, incorporated into these Terms by reference.</p>
      <ul>
        <li>No purchase is necessary to enter or win any giveaway.</li>
        <li>A purchase does not increase your chances of winning.</li>
        <li>Entries earned through purchases are as described in the applicable Official Rules.</li>
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
      <p>These Terms are governed by the laws of the State of Maryland, without regard to conflict of laws principles. Any disputes shall be resolved in the state or federal courts located in Maryland.</p>

      <h2>11. Changes to Terms</h2>
      <p>We may update these Terms at any time. Changes take effect when posted to the Site. Continued use after changes constitutes acceptance.</p>

      <h2>12. Contact</h2>
      <p>Questions about these Terms? Contact <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>
    </ContentPage>
  );
}
