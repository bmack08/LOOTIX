'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'ok' | 'err';

export default function EmailCapture({
  source,
  buttonLabel = 'Claim Entries',
  successMsg = "You're in. Watch your inbox for your entries.",
  className = '',
}: {
  source: string;
  buttonLabel?: string;
  successMsg?: string;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
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
    return (
      <div className={`flex items-center justify-center gap-3 rounded-btn px-5 py-4 ${className}`} style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.35)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0CE6B" strokeWidth="2.4"><path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="font-archivo font-semibold text-[15px] text-gold-bright">{successMsg}</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={className} noValidate>
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
          {status === 'loading' ? 'Entering…' : buttonLabel}
        </button>
      </div>
      {status === 'err' && (
        <p className="font-mono text-[12px] text-[#e08a6b] mt-3 text-center" role="alert">{error}</p>
      )}
    </form>
  );
}
