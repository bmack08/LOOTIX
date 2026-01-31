'use client';

import { FC, useState } from 'react';

const EmailSignup: FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-cta-primary py-12 md:py-16">
      <div className="max-w-container mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-4">
          GET NOTIFIED
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
          Be first to know about new giveaways + get bonus entries.
        </p>

        {isSubmitted ? (
          <div className="bg-white/20 rounded-md px-6 py-4 inline-block">
            <p className="text-white font-semibold">
              You're in! Check your email to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-white text-bg-dark rounded-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-bg-dark text-white font-semibold uppercase tracking-wider rounded-sm hover:bg-bg-dark/90 transition-colors duration-200"
            >
              JOIN
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSignup;
