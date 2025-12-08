'use client';

import { FC, FormEvent, useState } from 'react';

interface QuickEntryFormProps {
  giveaway: {
    id: number;
    title: string;
    value: string;
  };
  onClose: () => void;
}

const QuickEntryForm: FC<QuickEntryFormProps> = ({ giveaway, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; rules?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; rules?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!agreedToRules) {
      newErrors.rules = 'You must agree to the official rules';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: POST to /api/entries
    console.log('Entry submission:', { email, name, giveawayId: giveaway.id, agreedToRules });
    setIsSubmitted(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setName('');
      setAgreedToRules(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-dark-800 border-2 border-primary/30 rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Enter to Win
              </h3>
              <div className="bg-dark-900/50 border border-primary/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 mb-1">Prize:</p>
                <p className="text-lg font-bold text-white">{giveaway.title}</p>
                <p className="text-primary font-bold text-xl mt-1">{giveaway.value}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="entry-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="entry-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 bg-dark-900 border-2 ${
                    errors.email ? 'border-red-500' : 'border-primary/30'
                  } rounded-lg text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="entry-name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="entry-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-dark-900 border-2 border-primary/30 rounded-lg text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree-rules"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-primary/30 bg-dark-900 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <label htmlFor="agree-rules" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="/rules" className="text-primary hover:underline">
                    official rules
                  </a>{' '}
                  and confirm I am 18 years or older.
                </label>
              </div>
              {errors.rules && (
                <p className="text-red-500 text-sm">{errors.rules}</p>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-white shadow-neon-purple"
              >
                Submit Entry
              </button>

              <p className="text-xs text-gray-500 text-center">
                Free to enter. No purchase necessary.
              </p>
            </form>
          </>
        ) : (
          /* Success Message */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Entry Confirmed!
            </h3>
            <p className="text-gray-400 mb-4">
              Good luck in the {giveaway.title} giveaway!
            </p>
            <p className="text-sm text-primary">
              Check your email for confirmation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickEntryForm;
