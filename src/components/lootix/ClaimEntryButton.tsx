'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import EmailCapture from './EmailCapture';

/**
 * CTA that opens an email-capture modal to claim a giveaway spot.
 * Modal is portaled to <body> to avoid being trapped by any ancestor
 * backdrop-filter/transform containing block.
 */
export default function ClaimEntryButton({
  label = 'Claim It First',
  source = 'giveaway-first-winner',
  className = 'btn-gold',
  children,
}: {
  label?: string;
  source?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-5 transition-opacity duration-300"
      style={{ background: 'rgba(6,6,7,.82)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-[440px] rounded-card p-8"
        style={{
          background: 'linear-gradient(165deg,rgba(28,24,16,.98),rgba(14,13,12,.98))',
          border: '1px solid rgba(212,175,55,.4)',
          boxShadow: '0 30px 80px rgba(0,0,0,.7)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(.98)',
          transition: 'transform .3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted hover:text-cream transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>

        <div className="lx-eyebrow mb-3">Launch Giveaway · $250 + Merch</div>
        <h3 className="font-archivo font-black uppercase text-cream text-[26px] leading-[1.05] tracking-[-.02em] mb-2">
          Be the first winner
        </h3>
        <p className="font-archivo text-[14.5px] leading-[1.55] text-muted mb-6">
          Drop your email to lock in your entries. You&rsquo;ll get a confirmation and first dibs on every drop.
        </p>

        <EmailCapture
          source={source}
          buttonLabel="Claim My Spot"
          successMsg="You're entered. Good luck — check your inbox."
        />

        <p className="font-mono text-[10.5px] tracking-[.06em] text-faint mt-5 text-center">
          No purchase necessary. 18+. See Official Rules for the free entry method.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? label}
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
