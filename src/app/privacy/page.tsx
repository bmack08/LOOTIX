import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Lootix',
  description: 'How Lootix collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage eyebrow="Legal" title="Privacy Policy" updated="March 2026">
      <h2>1. Introduction</h2>
      <p>Lootix LLC (&ldquo;Lootix,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <a href="https://getlootix.com">getlootix.com</a> and use our services, including our giveaways and online store.</p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> name, email, mailing address, phone number, and date of birth when you create an account, enter a giveaway, or make a purchase.</li>
        <li><strong>Payment Information:</strong> processed by our third-party processor (Stripe). We do not store your full card number.</li>
        <li><strong>Order Information:</strong> products purchased, order history, shipping details, and giveaway entry counts.</li>
        <li><strong>Usage Data:</strong> IP address, browser/device info, and pages visited, collected via cookies and similar technologies.</li>
        <li><strong>Communications:</strong> information you provide when contacting support or signing up for our newsletter.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>Process and fulfill orders and giveaway entries</li>
        <li>Administer sweepstakes and notify winners</li>
        <li>Send order confirmations, shipping updates, and giveaway results</li>
        <li>Send marketing communications with your consent — you can opt out anytime</li>
        <li>Improve our website, products, and services</li>
        <li>Prevent fraud and comply with legal obligations</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li><strong>Service Providers:</strong> payment processors (Stripe), fulfillment/shipping partners, email providers, and analytics tools.</li>
        <li><strong>Legal Requirements:</strong> when required by law, regulation, or legal process.</li>
        <li><strong>Business Transfers:</strong> in connection with a merger, acquisition, or sale of assets.</li>
        <li><strong>Winner Announcements:</strong> a winner&rsquo;s first name and last initial may be published as required by sweepstakes regulations.</li>
      </ul>

      <h2>5. Cookies &amp; Tracking</h2>
      <p>We use cookies and similar technologies to enhance your experience and analyze traffic. You can control cookies through your browser; disabling them may affect certain features.</p>

      <h2>6. Data Security</h2>
      <p>We implement reasonable security measures, including encryption (SSL/TLS) in transit and secure storage. However, no method of transmission over the Internet is 100% secure.</p>

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have the right to access, correct, or delete your personal information, opt out of marketing, request a copy of your data, or object to certain processing. To exercise these rights, email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>

      <h2>8. Children&rsquo;s Privacy</h2>
      <p>Our services are not directed to individuals under 18. We do not knowingly collect information from children, and will delete it promptly if we learn we have.</p>

      <h2>9. Changes to This Policy</h2>
      <p>We may update this policy from time to time. Changes are posted here with an updated date. Continued use after changes constitutes acceptance.</p>

      <h2>10. Contact Us</h2>
      <p><strong>Lootix LLC</strong> · Maryland, USA · <a href="mailto:hello@getlootix.com">hello@getlootix.com</a></p>
    </ContentPage>
  );
}
