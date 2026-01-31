'use client';

import { FC, useState, useEffect } from 'react';
import { ENTRY_MULTIPLIER } from '@/config/giveaway';

const AnnouncementBar: FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has dismissed the bar
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-cta-primary text-white h-10 flex items-center justify-center relative overflow-hidden">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
        <span>{ENTRY_MULTIPLIER}X ENTRIES ON ALL ORDERS</span>
        <span className="hidden sm:inline">—</span>
        <span className="hidden sm:inline">FREE SHIPPING OVER $75</span>
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
