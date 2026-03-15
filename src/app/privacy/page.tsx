import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Lootix',
  description: 'Lootix privacy policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            Privacy <span className="text-cta-primary">Policy</span>
          </h1>
          <p className="text-text-muted text-sm">Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-bg-secondary/30 border border-accent-earth/20 rounded-xl p-8 md:p-12 space-y-8 text-text-secondary leading-relaxed">

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">1. Introduction</h2>
              <p>
                Lootix LLC ("Lootix," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at{' '}
                <Link href="/" className="text-cta-primary hover:underline">www.getlootix.com</Link>{' '}
                and use our services, including our giveaways, membership programs, and online store.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">2. Information We Collect</h2>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong className="text-text-primary">Personal Information:</strong> Name, email address, mailing address, phone number, and date of birth when you create an account, enter a giveaway, or make a purchase.</li>
                <li><strong className="text-text-primary">Payment Information:</strong> Credit card details and billing address when you make a purchase. Payment processing is handled by our third-party payment processor (Stripe). We do not store your full credit card number.</li>
                <li><strong className="text-text-primary">Order Information:</strong> Products purchased, order history, shipping details, and giveaway entry counts.</li>
                <li><strong className="text-text-primary">Usage Data:</strong> IP address, browser type, device information, pages visited, and time spent on our website. This is collected automatically through cookies and similar technologies.</li>
                <li><strong className="text-text-primary">Communications:</strong> Information you provide when contacting customer support or signing up for our newsletter.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Process and fulfill your orders and giveaway entries</li>
                <li>Administer sweepstakes and notify winners</li>
                <li>Manage your account and membership</li>
                <li>Send order confirmations, shipping updates, and giveaway results</li>
                <li>Send marketing communications (with your consent) — you can opt out anytime</li>
                <li>Improve our website, products, and services</li>
                <li>Prevent fraud and ensure the security of our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">4. Information Sharing</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong className="text-text-primary">Service Providers:</strong> Payment processors (Stripe), shipping partners (Printify), email service providers, and analytics tools that help us operate our business.</li>
                <li><strong className="text-text-primary">Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                <li><strong className="text-text-primary">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                <li><strong className="text-text-primary">Winner Announcements:</strong> Giveaway winners' first name and last initial may be published on our website and social media as required by sweepstakes regulations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">5. Cookies & Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser. Disabling cookies may affect certain features of our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">6. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information, including encryption (SSL/TLS) for data in transit and secure storage practices. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">7. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain processing of your data</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email us at{' '}
                <a href="mailto:hello@getlootix.com" className="text-cta-primary hover:underline">hello@getlootix.com</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 18, we will delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website after changes are posted constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <div className="mt-4 bg-bg-primary/50 border border-accent-earth/20 rounded-md p-4">
                <p className="font-semibold text-text-primary">Lootix LLC</p>
                <p>Email: <a href="mailto:hello@getlootix.com" className="text-cta-primary hover:underline">hello@getlootix.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
