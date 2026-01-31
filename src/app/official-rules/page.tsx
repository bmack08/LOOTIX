import Link from 'next/link';

export const metadata = {
  title: 'Official Rules | Lootix Sweepstakes',
  description: 'Official sweepstakes rules for Lootix giveaways. No purchase necessary to enter or win.',
};

export default function OfficialRulesPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4 text-white">
            LOOTIX <span className="text-primary">[DROP NAME]</span> SWEEPSTAKES
          </h1>
          <p className="text-xl text-gray-300">
            OFFICIAL RULES
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-12 px-6 bg-dark-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-800/50 border-2 border-primary/30 rounded-xl p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed">

            {/* NO PURCHASE NECESSARY */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
              <p className="text-xl font-bold text-white mb-2">
                NO PURCHASE, DONATION, OR PAYMENT OF ANY KIND IS NECESSARY TO ENTER OR WIN.
              </p>
              <p className="text-lg text-white">
                A PURCHASE DOES NOT INCREASE YOUR CHANCES OF WINNING.
              </p>
            </div>

            {/* 1. SPONSOR */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                1. SPONSOR
              </h2>
              <p>
                This sweepstakes ("Sweepstakes") is sponsored by <strong className="text-white">[SPONSOR LEGAL NAME]</strong>, located at <strong className="text-white">[Address, City, State, ZIP]</strong> ("Sponsor").
              </p>
            </div>

            {/* 2. ELIGIBILITY */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                2. ELIGIBILITY
              </h2>
              <p className="mb-3">
                This Sweepstakes is open to legal residents of the <strong className="text-white">[ELIGIBLE STATES - TO BE UPDATED]</strong> who are at least eighteen (18) years of age at the time of entry.
              </p>
              <p className="mb-3">
                <strong className="text-white">Void where prohibited.</strong> Employees, officers, and directors of Sponsor, its parent companies, subsidiaries, affiliates, distributors, retailers, advertising and promotion agencies, and any entity involved in the development, production, implementation, administration, or fulfillment of the Sweepstakes, and the immediate family members (spouse, parents, siblings, and children) and household members of each such employee, officer, and director, are not eligible to enter or win.
              </p>
            </div>

            {/* 3. SWEEPSTAKES PERIOD */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                3. SWEEPSTAKES PERIOD
              </h2>
              <p>
                The Sweepstakes begins at <strong className="text-white">[START TIME]</strong> Eastern Time ("ET") on <strong className="text-white">[START DATE]</strong> and ends at <strong className="text-white">[END TIME]</strong> ET on <strong className="text-white">[END DATE]</strong> (the "Sweepstakes Period").
              </p>
            </div>

            {/* 4. HOW TO ENTER */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                4. HOW TO ENTER
              </h2>

              <p className="mb-4">
                There are two (2) methods of entry:
              </p>

              <div className="ml-6 space-y-6">
                {/* Method 1: Purchase */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    A. Entry by Purchase
                  </h3>
                  <p className="mb-3">
                    During the Sweepstakes Period, purchase eligible merchandise from <Link href="/" className="text-primary hover:text-primary/80 underline">www.lootix.com</Link> (or the applicable retail location). For every <strong className="text-white">one dollar ($1.00)</strong> you spend on eligible merchandise, you will receive <strong className="text-white">one (1)</strong> entry into the Sweepstakes.
                  </p>
                  <p className="mb-3">
                    <strong className="text-white">Example:</strong> If you purchase $25.00 worth of eligible merchandise, you will receive 25 entries.
                  </p>
                  <p className="mb-3">
                    Eligible merchandise includes: <strong className="text-white">[PRODUCT CATEGORIES - e.g., apparel, accessories, mystery boxes]</strong>. Shipping charges, taxes, and other fees do not count toward entry calculations.
                  </p>
                  <p>
                    You will receive a confirmation email with your total number of entries within <strong className="text-white">[X] business days</strong> of your purchase.
                  </p>
                </div>

                {/* Method 2: AMOE */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    B. Alternate Method of Entry (AMOE) – No Purchase Necessary
                  </h3>
                  <p className="mb-3">
                    To enter without making a purchase, send a handwritten 3" x 5" card with the following information:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 mb-3">
                    <li>Your full legal name</li>
                    <li>Complete mailing address (including city, state, ZIP code)</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Date of birth (MM/DD/YYYY)</li>
                    <li>The phrase: "LOOTIX [DROP NAME] SWEEPSTAKES ENTRY"</li>
                  </ul>
                  <p className="mb-3">
                    Mail your entry to:
                  </p>
                  <div className="bg-dark-900/80 border border-primary/30 rounded-lg p-4 mb-3">
                    <p className="font-mono text-sm">
                      <strong className="text-white">LOOTIX [DROP NAME] SWEEPSTAKES</strong><br />
                      [SPONSOR LEGAL NAME]<br />
                      [Street Address]<br />
                      [City, State ZIP]
                    </p>
                  </div>
                  <p className="mb-3">
                    <strong className="text-white">Limit:</strong> One (1) free entry per outer mailing envelope. Each entry must be mailed separately in a hand-addressed envelope with first-class postage affixed.
                  </p>
                  <p className="mb-3">
                    Entries must be <strong className="text-white">postmarked by [END DATE]</strong> and <strong className="text-white">received by [RECEIPT DEADLINE DATE]</strong> to be eligible.
                  </p>
                  <p>
                    Mechanically reproduced entries, entries submitted via fax, email, or any automated system will be void. All entries become the property of Sponsor and will not be returned.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-white font-semibold">
                  Important: All entries (purchase or AMOE) have equal odds of winning.
                </p>
              </div>
            </div>

            {/* 5. PRIZE */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                5. PRIZE
              </h2>

              <p className="mb-4">
                <strong className="text-white">Grand Prize (1):</strong> One (1) grand prize winner will receive:
              </p>

              <div className="bg-dark-900/80 border-2 border-primary/30 rounded-lg p-6 mb-4">
                <p className="text-xl font-bold text-primary mb-3">
                  [PRIZE DESCRIPTION]
                </p>
                <p className="mb-2">
                  <strong className="text-white">Approximate Retail Value (ARV):</strong> $[PRIZE VALUE]
                </p>
                <p className="text-sm text-gray-400">
                  [Additional prize details, specifications, conditions, etc.]
                </p>
              </div>

              <p className="mb-3">
                <strong className="text-white">Total ARV of all prizes:</strong> $[TOTAL VALUE]
              </p>

              <p className="mb-3">
                Prize is awarded "as is" with no warranty or guarantee, either express or implied. Winner is responsible for all federal, state, and local taxes associated with prize receipt. Winner may be required to complete and return an IRS Form W-9. Sponsor reserves the right to substitute a prize of equal or greater value if the advertised prize becomes unavailable.
              </p>

              <p className="mb-3">
                No cash equivalent or prize substitution permitted except at Sponsor's sole discretion. Prize is not transferable or assignable.
              </p>
            </div>

            {/* 6. WINNER SELECTION */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                6. WINNER SELECTION
              </h2>

              <p className="mb-3">
                One (1) potential grand prize winner will be selected in a random drawing from all eligible entries received during the Sweepstakes Period. The drawing will be conducted on or about <strong className="text-white">[DRAWING DATE]</strong> by Sponsor or its designated agent, whose decisions are final and binding in all matters relating to this Sweepstakes.
              </p>

              <p className="mb-3">
                <strong className="text-white">Odds of Winning:</strong> Odds of winning depend on the total number of eligible entries received during the Sweepstakes Period.
              </p>
            </div>

            {/* 7. WINNER NOTIFICATION */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                7. WINNER NOTIFICATION
              </h2>

              <p className="mb-3">
                The potential winner will be notified by email and/or phone within <strong className="text-white">[X] business days</strong> following the drawing. If the potential winner does not respond within <strong className="text-white">[X] days</strong> of the first notification attempt, or if the prize notification is returned as undeliverable, the potential winner will be disqualified and an alternate winner may be selected.
              </p>

              <p className="mb-3">
                Before being declared an official winner, the potential winner may be required to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 mb-3">
                <li>Sign and return an Affidavit of Eligibility, Liability Waiver, and (where legal) Publicity Release within the time period specified by Sponsor</li>
                <li>Provide proof of age and residency</li>
                <li>Complete any other documentation required by Sponsor</li>
              </ul>

              <p className="mb-3">
                Failure to comply with these requirements may result in disqualification and selection of an alternate winner.
              </p>

              <p>
                Winner's name will be publicly announced on Sponsor's website and social media channels within <strong className="text-white">[X] days</strong> of verification.
              </p>
            </div>

            {/* 8. GENERAL CONDITIONS */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                8. GENERAL CONDITIONS
              </h2>

              <p className="mb-3">
                By entering, participants agree to be bound by these Official Rules and the decisions of Sponsor, which are final and binding in all respects.
              </p>

              <p className="mb-3">
                By accepting a prize, winner grants Sponsor and its designees permission to use their name, likeness, biographical information, and statements for advertising and promotional purposes without further compensation, except where prohibited by law.
              </p>

              <p className="mb-3">
                Sponsor is not responsible for: (a) lost, late, incomplete, stolen, misdirected, illegible, or postage-due entries; (b) errors in the administration of the Sweepstakes or the processing of entries; (c) technical failures of any kind, including computer, network, or software malfunctions; or (d) injury or damage to participant's or any other person's computer or property related to participating in this Sweepstakes.
              </p>

              <p className="mb-3">
                Sponsor reserves the right to modify, suspend, or terminate the Sweepstakes if fraud, technical failures, or any other factor beyond Sponsor's reasonable control impairs the integrity or proper functioning of the Sweepstakes.
              </p>

              <p>
                Any attempt to deliberately damage any website or undermine the legitimate operation of the Sweepstakes is a violation of criminal and civil laws. Should such an attempt be made, Sponsor reserves the right to seek damages and other remedies to the fullest extent permitted by law.
              </p>
            </div>

            {/* 9. RELEASE AND LIMITATION OF LIABILITY */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                9. RELEASE AND LIMITATION OF LIABILITY
              </h2>

              <p className="mb-3">
                By participating, participants agree to release and hold harmless Sponsor, its parent companies, subsidiaries, affiliates, directors, officers, employees, and agents from any and all liability for any injuries, losses, or damages of any kind arising from or in connection with the Sweepstakes or the acceptance, possession, use, or misuse of any prize.
              </p>

              <p>
                IN NO EVENT WILL SPONSOR BE RESPONSIBLE OR LIABLE FOR ANY DAMAGES OR LOSSES OF ANY KIND, INCLUDING DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR PARTICIPATION IN THIS SWEEPSTAKES.
              </p>
            </div>

            {/* 10. DISPUTES AND GOVERNING LAW */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                10. DISPUTES AND GOVERNING LAW
              </h2>

              <p className="mb-3">
                This Sweepstakes is governed by the laws of the <strong className="text-white">State of Maryland</strong>, without regard to its conflict of laws principles. Any disputes arising out of this Sweepstakes shall be resolved in the state or federal courts located in <strong className="text-white">Maryland</strong>, and participants consent to the personal jurisdiction of such courts.
              </p>

              <p>
                <strong className="text-white">Arbitration:</strong> Except where prohibited, participant agrees that any and all disputes, claims, and causes of action arising out of or connected with this Sweepstakes shall be resolved individually, without resort to any form of class action, and exclusively by arbitration under the rules of the American Arbitration Association.
              </p>
            </div>

            {/* 11. PRIVACY */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                11. PRIVACY
              </h2>

              <p className="mb-3">
                Information collected from participants is subject to Sponsor's Privacy Policy, available at{' '}
                <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
                  www.lootix.com/privacy
                </Link>.
              </p>

              <p>
                By entering, participants consent to the use of their personal information as described in these Official Rules and the Privacy Policy.
              </p>
            </div>

            {/* 12. WINNERS LIST */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                12. WINNERS LIST
              </h2>

              <p className="mb-3">
                For the name of the winner, send a self-addressed stamped envelope to:
              </p>

              <div className="bg-dark-900/80 border border-primary/30 rounded-lg p-4 mb-3">
                <p className="font-mono text-sm">
                  <strong className="text-white">LOOTIX [DROP NAME] SWEEPSTAKES – WINNER</strong><br />
                  [SPONSOR LEGAL NAME]<br />
                  [Street Address]<br />
                  [City, State ZIP]
                </p>
              </div>

              <p>
                Requests must be received within <strong className="text-white">sixty (60) days</strong> after the end of the Sweepstakes Period. Winners are also announced publicly on{' '}
                <Link href="/past-winners" className="text-primary hover:text-primary/80 underline">
                  www.lootix.com/past-winners
                </Link>.
              </p>
            </div>

            {/* 13. SPONSOR CONTACT */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                13. SPONSOR CONTACT INFORMATION
              </h2>

              <div className="bg-dark-900/80 border border-primary/30 rounded-lg p-6">
                <p className="mb-2">
                  <strong className="text-white">[SPONSOR LEGAL NAME]</strong>
                </p>
                <p className="mb-2">
                  [Street Address]<br />
                  [City, State ZIP]
                </p>
                <p className="mb-2">
                  Email:{' '}
                  <a href="mailto:[CONTACT EMAIL]" className="text-primary hover:text-primary/80 underline">
                    [CONTACT EMAIL]
                  </a>
                </p>
                <p>
                  Phone: <strong className="text-white">[PHONE NUMBER]</strong>
                </p>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-12 pt-8 border-t border-primary/20">
              <p className="text-center text-gray-500 text-sm">
                These Official Rules were last updated on <strong>[LAST UPDATED DATE]</strong>.
              </p>
            </div>
          </div>

          {/* Back to Home CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 text-white shadow-neon-purple"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
