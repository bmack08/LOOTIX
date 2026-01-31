'use client';

import { FC, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do auto-entries work?',
    answer: 'Every week, your membership automatically enters you into all eligible giveaways based on your tier. Bronze gets 5 entries, Silver gets 15, and Gold gets unlimited entries. No manual action required!',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your membership at any time from your account settings. Your benefits will remain active until the end of your current billing period.',
  },
  {
    question: 'Do loyalty points expire?',
    answer: 'Loyalty points never expire as long as your membership is active. If you cancel, your points will remain frozen for 90 days in case you decide to rejoin.',
  },
  {
    question: 'What are exclusive giveaways?',
    answer: 'Exclusive giveaways are member-only contests with higher value prizes. Silver members get access to monthly exclusive giveaways, while Gold members get access to both weekly and monthly exclusives.',
  },
  {
    question: 'How do merch discounts apply?',
    answer: 'Your membership discount is automatically applied at checkout when you purchase any merchandise. Bronze gets 10%, Silver gets 20%, and Gold members receive 30% off all merch.',
  },
  {
    question: 'Can I upgrade or downgrade my tier?',
    answer: 'Yes! You can change your membership tier at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle.',
  },
];

const MembershipFAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-white">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Everything you need to know about Lootix membership
        </p>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-800/50 border-2 border-primary/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/60"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-dark-700/30"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@lootix.com"
            className="inline-block px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembershipFAQ;
