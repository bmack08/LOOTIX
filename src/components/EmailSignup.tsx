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
        <h2 className="text-[28px] font-display font-bold text-white uppercase mb-2">
          GET NOTIFIED<span className="animate-blink">_</span>
        </h2>
        <p className="text-white/90 mb-6">
          Be first to know about new giveaways + get bonus entries.
        </p>

        {isSubmitted ? (
          <div className="bg-white/20 rounded-md px-6 py-4 inline-block">
            <p className="text-white font-semibold">
              You're in! Check your email to confirm.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[400px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-[200px] px-4 py-3 bg-white text-bg-dark border-none outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-bg-dark text-white font-bold uppercase tracking-wider border-none cursor-pointer"
              >
                JOIN
              </button>
            </form>
            <p className="text-white/80 text-sm mt-4">
              🎁 Get 500 BONUS ENTRIES just for signing up!
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default EmailSignup;
