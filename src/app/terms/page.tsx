import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Lootix',
  description: 'Lootix terms of service — the rules governing your use of our website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            Terms of <span className="text-cta-primary">Service</span>
          </h1>
          <p className="text-text-muted text-sm">Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-bg-secondary/30 border border-accent-earth/20 rounded-xl p-8 md:p-12 space-y-8 text-text-secondary leading-relaxed">

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Lootix website at{' '}
                <Link href="/" className="text-cta-primary hover:underline">www.getlootix.com</Link>{' '}
                (the "Site") and any services offered by Lootix LLC ("Lootix," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Site or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">2. Eligibility</h2>
              <p>
                You must be at least 18 years old and a legal resident of the United States (or a jurisdiction where our services are not prohibited) to use our Site, make purchases, or enter giveaways. By using our Site, you represent and warrant that you meet these requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">3. Account Registration</h2>
              <p className="mb-3">
                Certain features may require you to create an account. You agree to provide accurate, current, and complete information and to keep your account credentials secure. You are responsible for all activity under your account.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or are used for fraudulent purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">4. Purchases & Payments</h2>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>All prices are listed in US dollars and are subject to change without notice.</li>
                <li>Payment is processed securely through our third-party payment provider (Stripe).</li>
                <li>You agree to pay all charges incurred under your account, including applicable taxes and shipping fees.</li>
                <li>All sales are final. Because our products are made-to-order, we do not accept returns for change of mind. See our Returns &amp; Exchanges policy for defective items.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">5. Giveaways & Sweepstakes</h2>
              <p className="mb-3">
                Lootix operates legally compliant sweepstakes. Each giveaway is governed by its own{' '}
                <Link href="/official-rules" className="text-cta-primary hover:underline">Official Rules</Link>, which are incorporated into these Terms by reference.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>No purchase is necessary to enter or win any giveaway.</li>
                <li>A purchase does not increase your chances of winning.</li>
                <li>Giveaway entries earned through purchases are bonus entries as described in the applicable Official Rules.</li>
                <li>Lootix reserves the right to modify, suspend, or cancel any giveaway at its discretion.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">6. Membership</h2>
              <p>
                Lootix may offer paid membership subscriptions. Membership terms, pricing, and benefits are described on the{' '}
                <Link href="/membership" className="text-cta-primary hover:underline">Membership page</Link>. Memberships auto-renew monthly unless cancelled. You may cancel at any time; benefits continue through the end of the billing period.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">7. Intellectual Property</h2>
              <p>
                All content on the Site — including text, graphics, logos, images, designs, and software — is the property of Lootix LLC and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">8. Prohibited Conduct</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Use the Site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools (bots, scrapers) to access the Site</li>
                <li>Submit false information or create fraudulent giveaway entries</li>
                <li>Interfere with the Site's functionality or other users' experience</li>
                <li>Resell products purchased from Lootix without authorization</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">9. Disclaimer of Warranties</h2>
              <p>
                THE SITE AND ALL PRODUCTS AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. LOOTIX DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOOTIX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SITE OR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Maryland, without regard to conflict of laws principles. Any disputes shall be resolved in the state or federal courts located in Maryland.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">12. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. Changes take effect when posted to the Site. Continued use of the Site after changes constitutes acceptance. We encourage you to review these Terms periodically.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">13. Contact</h2>
              <p>
                Questions about these Terms? Contact us at{' '}
                <a href="mailto:hello@getlootix.com" className="text-cta-primary hover:underline">hello@getlootix.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
