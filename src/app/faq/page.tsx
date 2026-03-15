'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Giveaways',
    questions: [
      {
        q: 'Is this legit? Are giveaways real?',
        a: 'Yes. Lootix is a registered LLC that operates legally compliant sweepstakes. Every giveaway has official rules, a verified random drawing, and publicly announced winners. No purchase is necessary to enter — free entry is always available via mail-in.',
      },
      {
        q: 'How do I enter a giveaway?',
        a: 'There are two ways: (1) Purchase any Lootix product — every $1 spent earns entries into the current giveaway, or (2) Send a handwritten 3x5 postcard with your name and email to our mailing address for a free entry. Full details are in the Official Rules for each giveaway.',
      },
      {
        q: 'Do I have to buy something to enter?',
        a: 'No. Every giveaway has a free mail-in entry method. No purchase necessary — a purchase does not increase your chances of winning.',
      },
      {
        q: 'How are winners selected?',
        a: 'Winners are selected via random drawing from all eligible entries. The drawing is conducted by Lootix or a designated agent. All entries (purchase and free) have equal odds of winning.',
      },
      {
        q: 'How will I know if I win?',
        a: 'Winners are notified by email and/or phone. You must respond within the timeframe specified in the Official Rules. Winners are also publicly announced on our website and social media.',
      },
      {
        q: 'What are Quick Entries?',
        a: 'Quick Entry packs let you get entries without buying apparel. They\'re a fast way to enter the current giveaway if you just want a shot at the prize.',
      },
      {
        q: 'What does the entry multiplier (e.g., 60X) mean?',
        a: 'During multiplier events, every $1 you spend earns 60 entries instead of 1. So a $50 purchase = 3,000 entries. Multiplier rates change between giveaway periods.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping is 5-10 business days within the US. International shipping varies by destination. All products are made-to-order via our print-on-demand partner, so please allow 3-5 business days for production before shipping.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship worldwide. International shipping rates and delivery times vary by destination. Customs fees and duties are the responsibility of the buyer.',
      },
      {
        q: 'Is free shipping available?',
        a: 'Yes — free shipping on orders over $75 within the US.',
      },
      {
        q: 'Can I return or exchange an item?',
        a: 'Because our products are made-to-order, we cannot accept returns for change of mind. If your item arrives damaged or defective, contact us within 14 days of delivery and we\'ll make it right.',
      },
    ],
  },
  {
    category: 'Membership',
    questions: [
      {
        q: 'What is a Lootix Membership?',
        a: 'Lootix Membership is a monthly subscription that gives you bonus entries, exclusive discounts, early access to drops, and more. We offer multiple tiers to fit your budget.',
      },
      {
        q: 'Is the membership required to enter giveaways?',
        a: 'No. Membership is completely optional. Free entry is always available for every giveaway. Membership just gives you additional perks and bonus entries.',
      },
      {
        q: 'Can I cancel my membership?',
        a: 'Yes, you can cancel anytime. Your benefits remain active through the end of your billing period.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'How do I contact Lootix?',
        a: 'Email us at hello@getlootix.com. We respond within 1-2 business days.',
      },
      {
        q: 'Where is Lootix based?',
        a: 'Lootix LLC is based in Maryland, USA.',
      },
      {
        q: 'Do you have a physical store?',
        a: 'No, Lootix is an online-only brand. All products are available exclusively at getlootix.com.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-accent-earth/20 rounded-md overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-text-primary">{q}</span>
        <span className={`text-cta-primary text-xl font-bold shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-bg-dark to-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cta-primary/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-hero-mobile md:text-hero text-text-primary uppercase mb-4">
            Frequently Asked <span className="text-cta-primary">Questions</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Everything you need to know about Lootix, our giveaways, and how it all works.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-6 border-b border-accent-earth/20 pb-3">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-6 bg-bg-secondary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-text-primary uppercase mb-4">
            Still Have <span className="text-cta-primary">Questions</span>?
          </h2>
          <p className="text-text-secondary mb-6">
            We're here to help. Reach out and we'll get back to you within 1-2 business days.
          </p>
          <a href="mailto:hello@getlootix.com" className="btn-primary">
            EMAIL US
          </a>
        </div>
      </section>
    </main>
  );
}
