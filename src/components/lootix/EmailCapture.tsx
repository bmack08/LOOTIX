'use client';

import { useState } from 'react';
import { useEntryWindow } from './useEntryWindow';

type Status = 'idle' | 'loading' | 'ok' | 'err';

export default function EmailCapture({
  source,
  buttonLabel,
  successMsg,
  className = '',
}: {
  source: string;
  buttonLabel?: string;
  successMsg?: string;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [entered, setEntered] = useState(false);
  const [error, setError] = useState('');
  const windowOpen = useEntryWindow();

  // Outside the entry window: "Join the list", never "Enter".
  const label = buttonLabel ?? (windowOpen ? 'Claim Entries' : 'Join the List');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, website: honeypot }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setEntered(Boolean(data.entered));
        setStatus('ok');
      } else {
        setStatus('err');
        setError(data.error || 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('err');
      setError('Network error. Try again.');
    }
  }

  if (status === 'ok') {
    const msg =
      successMsg ??
      (entered
        ? "You're in. Watch your inbox for your entries."
        : "You're on the list. We'll email you the moment entries open.");
    return (
      <div className={`flex items-center justify-center gap-3 rounded-btn px-5 py-4 ${className}`} style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.35)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0CE6B" strokeWidth="2.4"><path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="font-archivo font-semibold text-[15px] text-gold-bright">{msg}</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={className} noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div className="flex gap-[10px] flex-wrap justify-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          disabled={status === 'loading'}
          className="flex-1 min-w-[240px] rounded-btn px-[18px] py-4 font-archivo text-[15px] text-cream outline-none focus:border-gold/60 transition-colors"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
        <button type="submit" disabled={status === 'loading'} className="btn-gold !py-4 disabled:opacity-70">
          {status === 'loading' ? 'Sending…' : label}
        </button>
      </div>
      {status === 'err' && (
        <p className="font-mono text-[12px] text-[#e08a6b] mt-3 text-center" role="alert">{error}</p>
      )}
    </form>
  );
}
