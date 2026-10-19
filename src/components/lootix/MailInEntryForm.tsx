'use client';

import { useState } from 'react';

/**
 * Log a mail-in (AMOE) card as one entry.
 *
 * The card reference is the idempotency key, so the same envelope logged twice
 * reports "already logged" instead of quietly granting a second entry.
 */
export default function MailInEntryForm() {
  const [email, setEmail] = useState('');
  const [cardRef, setCardRef] = useState('');
  const [postmark, setPostmark] = useState('');
  const [state, setState] = useState<'idle' | 'saving'>('idle');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('saving');
    setErr('');
    setMsg('');

    const res = await fetch('/api/admin/mail-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cardRef, postmark }),
    });
    const d = await res.json().catch(() => ({}));

    if (res.ok && d.ok) {
      setMsg(d.message || 'Logged.');
      // Keep the card reference visible so the admin can see what was just
      // entered, but clear the entrant so the next envelope starts clean.
      setEmail('');
      setPostmark('');
      setState('idle');
    } else {
      setErr(d.error || 'Could not log that card.');
      setState('idle');
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="mailin-email" className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">
          Entrant email (as written on the card)
        </label>
        <input
          id="mailin-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="rounded-btn px-4 py-3 font-archivo text-[15px] text-cream outline-none"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mailin-ref" className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">
          Card reference
        </label>
        <input
          id="mailin-ref"
          required
          value={cardRef}
          onChange={(e) => setCardRef(e.target.value)}
          placeholder="e.g. 2026-10-18-014"
          className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
        <span className="font-mono text-[11px] text-muted">
          Number the envelopes as you open them. Re-logging the same reference will not add a second entry.
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mailin-postmark" className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">
          Postmark date (optional)
        </label>
        <input
          id="mailin-postmark"
          value={postmark}
          onChange={(e) => setPostmark(e.target.value)}
          placeholder="e.g. 2026-10-16"
          className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
      </div>

      <button type="submit" disabled={state === 'saving'} className="btn-gold !py-3 self-start disabled:opacity-50">
        {state === 'saving' ? 'Logging…' : 'Log mail-in entry (1 entry)'}
      </button>

      {msg && <p className="font-mono text-[12px] text-gold-label">{msg}</p>}
      {err && <p className="font-mono text-[12px] text-[#e08a6b]">{err}</p>}
    </form>
  );
}
