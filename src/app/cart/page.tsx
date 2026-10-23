'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/lootix/v2/CartContext';
import { entriesForSubtotal, ENTRIES_LABEL, FREE_SHIPPING_THRESHOLD } from '@/config/giveaway';
import { GIVEAWAY_DATES_SET } from '@/lib/site';

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default function CartPage() {
  const { lines, setQty, remove, subtotal, totalEntries, count, ready } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function checkout() {
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines.map((l) => ({ slug: l.slug, qty: l.qty })) }),
      });
      const d = await res.json();
      if (res.ok && d.ok && d.url) {
        window.location.href = d.url; // → Stripe Checkout
      } else {
        setErr(d.error || 'Could not start checkout.');
        setBusy(false);
      }
    } catch {
      setErr('Network error. Try again.');
      setBusy(false);
    }
  }

  if (!ready) return <div style={{ minHeight: '50vh' }} />;

  if (!count) {
    return (
      <div className="text-parchment" style={{ padding: '96px 24px' }}>
        <div className="mx-auto text-center flex flex-col gap-5 items-center" style={{ maxWidth: 520 }}>
          <span className="v2-eyebrow">Your cart</span>
          <h1 className="m-0 uppercase" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900 }}>Nothing looted yet</h1>
          <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.65 }}>
            Every dollar you spend is one entry toward the Launch Vault — $250 cash plus a custom Lootix hoodie and tee.
          </p>
          <Link href="/shop" className="btn-brass">Shop Drop 1</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-parchment">
      <header style={{ padding: '64px 24px 32px', borderBottom: HAIR }}>
        <div className="mx-auto flex flex-col gap-2.5" style={{ maxWidth: 1000 }}>
          <span className="v2-eyebrow">Your cart</span>
          <h1 className="m-0 uppercase" style={{ fontSize: 'clamp(34px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.01em' }}>
            {count} {count === 1 ? 'item' : 'items'}
          </h1>
        </div>
      </header>

      <section style={{ padding: '40px 24px 88px' }}>
        <div className="mx-auto grid gap-10 lg:grid-cols-[1.4fr_1fr]" style={{ maxWidth: 1000 }}>
          {/* LINES */}
          <div className="flex flex-col gap-3">
            {lines.map((l) => (
              <div key={l.slug} className="flex gap-4 items-center" style={{ background: '#131009', border: HAIR, borderRadius: 4, padding: 14 }}>
                <div style={{ width: 76, height: 84, flex: 'none', background: '#17130C', overflow: 'hidden', borderRadius: 2 }}>
                  <img src={l.img} alt={l.name} className="w-full h-full" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{l.name}</div>
                  <div className="font-plex text-brass" style={{ fontSize: 11, letterSpacing: '0.06em', marginTop: 3 }}>
                    ◆ {entriesForSubtotal(l.price * l.qty)} ENTRIES
                  </div>
                  <button onClick={() => remove(l.slug)} className="font-plex text-stone hover:text-brass-lit transition-colors" style={{ fontSize: 11, marginTop: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-3 flex-none">
                  <div className="flex items-center" style={{ border: HAIR, borderRadius: 2 }}>
                    <button onClick={() => setQty(l.slug, l.qty - 1)} aria-label="Decrease" className="text-sand hover:text-brass-lit transition-colors" style={{ background: 'none', border: 'none', padding: '6px 11px', cursor: 'pointer', fontSize: 15 }}>−</button>
                    <span className="font-plex" style={{ fontSize: 13, minWidth: 20, textAlign: 'center' }}>{l.qty}</span>
                    <button onClick={() => setQty(l.slug, l.qty + 1)} aria-label="Increase" className="text-sand hover:text-brass-lit transition-colors" style={{ background: 'none', border: 'none', padding: '6px 11px', cursor: 'pointer', fontSize: 15 }}>+</button>
                  </div>
                  <span className="font-plex text-brass-lit" style={{ fontSize: 15, fontWeight: 600, minWidth: 54, textAlign: 'right' }}>
                    ${(l.price * l.qty).toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <aside className="flex flex-col gap-4" style={{ background: '#131009', border: '1px solid rgba(198,161,91,0.35)', borderRadius: 4, padding: 28, alignSelf: 'start' }}>
            <div className="flex justify-between items-baseline">
              <span className="text-sand" style={{ fontSize: 14 }}>Subtotal</span>
              <span className="font-plex text-parchment" style={{ fontSize: 22, fontWeight: 600 }}>${subtotal.toFixed(0)}</span>
            </div>

            {/* the whole point */}
            <div style={{ borderTop: HAIR, borderBottom: HAIR, padding: '16px 0', textAlign: 'center' }}>
              <div className="font-plex uppercase text-stone" style={{ fontSize: 10.5, letterSpacing: '0.16em' }}>
                {GIVEAWAY_DATES_SET ? 'Entries into the Launch Vault' : 'Entries when the giveaway opens'}
              </div>
              <div className="text-brass-lit" style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.15 }}>{totalEntries.toLocaleString()}</div>
              <div className="font-plex uppercase text-stone" style={{ fontSize: 10, letterSpacing: '0.12em' }}>{ENTRIES_LABEL}</div>
            </div>

            <button onClick={checkout} disabled={busy} className="btn-brass w-full disabled:opacity-70" style={{ cursor: busy ? 'default' : 'pointer' }}>
              {busy ? 'Starting checkout…' : 'Secure checkout →'}
            </button>
            {err && <p className="font-plex m-0" style={{ fontSize: 11.5, color: '#e08a6b' }} role="alert">{err}</p>}

            <p className="font-plex m-0 text-stone" style={{ fontSize: 10.5, lineHeight: 1.7, letterSpacing: '0.04em' }}>
              Payments secured by Stripe. Ships to the US only · free US shipping on orders of ${FREE_SHIPPING_THRESHOLD}+.
              Entries are {GIVEAWAY_DATES_SET ? 'added automatically once payment completes' : 'credited when the giveaway opens'}, counted
              from your subtotal before tax and shipping. No purchase necessary to enter — free entry is available by mail, see the{' '}
              <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
