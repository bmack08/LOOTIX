'use client';

import Link from 'next/link';

export default function GiveawayDisclosure() {
  return (
    <section className="py-12 px-6 bg-dark-800/50 border-t border-primary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8 text-white">
          Giveaway <span className="text-primary">Summary</span>
        </h2>

        <div className="bg-dark-900/50 border-2 border-primary/30 rounded-xl p-6 md:p-8 space-y-4 text-gray-300 leading-relaxed">
          <p>
            Every LOOTIX drop includes a sweepstakes. When you buy eligible merch during the promotion period, you earn entries toward the current grand prize.{' '}
            <strong className="text-white">No purchase, donation, or payment of any kind is necessary to enter or win. A purchase does not increase your chances of winning.</strong>
          </p>

          <p>
            You can enter for free by using our Alternate Method of Entry (AMOE) described in the Official Rules. All entries, paid or free, have the same odds of winning.
          </p>

          <p>
            Open to legal residents of{' '}
            <span className="text-white font-semibold">[ELIGIBLE STATES - TO BE UPDATED]</span> who are at least 18 years old. Void where prohibited.
          </p>

          <p>
            See our{' '}
            <Link
              href="/official-rules"
              className="text-primary hover:text-primary/80 underline font-semibold transition-colors"
            >
              Official Rules
            </Link>{' '}
            for full details, including how to enter without a purchase, prize descriptions and approximate retail value (ARV), start/end dates, winner selection, and odds.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/official-rules"
            className="inline-block px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            Read Full Official Rules
          </Link>
        </div>
      </div>
    </section>
  );
}
