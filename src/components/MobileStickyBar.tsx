'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

const MobileStickyBar: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px (past hero section)
      setIsVisible(window.scrollY >= 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 bg-bg-dark border-t border-accent-earth/30 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
    >
      <div className="p-3">
        <Link
          href="/current-giveaway"
          className="btn-primary w-full justify-center"
        >
          ENTER GIVEAWAY — FREE
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyBar;
