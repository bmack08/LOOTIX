'use client';

import { useState } from 'react';
import { isEntryWindowOpen } from '@/lib/site';

/**
 * Guild signup — lives on the inverted cream section.
 * Posts to /api/subscribe (Supabase-backed: list save + sign-up entry).
 *
 * Outside the entry window the CTA says "Join the list", never "Enter" —
 * there is no giveaway to enter and no entry is created.
 */
export default function EmailCapture({ source = 'newsletter' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [entered, setEntered] = useState(false);
  const [err, setErr] = useState('');
  const windowOpen = isEntryWindowOpen();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'loading' || state === 'done') return;
    setState('loading');
    setErr('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, website: honeypot }),
      });
      const d = await res.json();
      if (res.ok && d.ok) { setEntered(Boolean(d.entered)); setState('done'); }
      else { setState('error'); setErr(d.error || 'Something went wrong.'); }
    } catch {
      setState('error');
      setErr('Network error. Try again.');
    }
  }

  const label = state === 'done'
    ? (entered ? '✓ Entered' : '✓ On the list')
    : state === 'loading'
      ? 'Sending…'
      : windowOpen ? 'Claim Entries' : 'Join the List';

  return (
    <form onSubmit={submit} noValidate className="w-full" style={{ maxWidth: 520 }}>
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
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={state === 'done'}
          className="flex-1 font-plex outline-none"
          style={{ background: '#F2E9D2', border: '1px solid #171208', borderRadius: 2, padding: '15px 18px', fontSize: 14, color: '#171208' }}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'done'}
          className="font-archivo uppercase transition-colors"
          style={{
            background: '#171208',
            color: state === 'done' ? '#E6C57E' : '#E4D5B4',
            border: 'none',
            borderRadius: 2,
            padding: '15px 30px',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.12em',
            cursor: state === 'done' ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </button>
      </div>
      {state === 'error' && <p className="font-plex mt-3" style={{ fontSize: 12, color: '#8a2c14' }} role="alert">{err}</p>}
    </form>
  );
}
