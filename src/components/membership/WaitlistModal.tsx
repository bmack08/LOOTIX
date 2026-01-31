'use client';

import { FC, FormEvent, useState } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
}

const WaitlistModal: FC<WaitlistModalProps> = ({ isOpen, onClose, tierName }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: POST to /api/waitlist
    console.log('Waitlist submission:', { email, tierName });
    setIsSubmitted(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-dark-800 border-2 border-primary/30 rounded-xl p-8 max-w-md w-full">
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
                Join the <span className="text-primary">{tierName}</span> Waitlist
              </h3>
              <p className="text-gray-400 text-sm">
                Be the first to know when {tierName} membership launches. We'll send you an exclusive early access link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="waitlist-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-dark-900 border-2 border-primary/30 rounded-lg text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 text-white shadow-neon-purple"
              >
                Join Waitlist
              </button>

              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe anytime.
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
              You're on the list!
            </h3>
            <p className="text-gray-400">
              We'll notify you when {tierName} membership is available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
