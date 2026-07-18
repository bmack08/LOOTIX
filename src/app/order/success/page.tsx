'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/lootix/v2/CartContext';

/** Post-payment landing. Stripe redirects here; the webhook grants the entries. */
export default function OrderSuccessPage() {
  const { clear } = useCart();

  // payment succeeded — empty the cart
  useEffect(() => { clear(); }, [clear]);

  return (
    <div className="text-parchment" style={{ padding: '96px 24px' }}>
      <div className="mx-auto text-center flex flex-col gap-5 items-center" style={{ maxWidth: 560 }}>
        <span
          className="grid place-items-center"
          style={{ width: 64, height: 64, border: '1px solid rgba(198,161,91,0.5)', borderRadius: '50%', color: '#C6A15B', fontSize: 28 }}
        >
          ◆
        </span>
        <span className="v2-eyebrow">Order confirmed</span>
        <h1 className="m-0 uppercase" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, letterSpacing: '-0.01em' }}>
          You&rsquo;re in the vault
        </h1>
        <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.7 }}>
          Payment received — your entries are being added to the Launch Vault right now, and a confirmation email with your
          entry total is on its way. Gear ships within 2–4 business days.
        </p>
        <div className="flex gap-3.5 flex-wrap justify-center" style={{ marginTop: 8 }}>
          <Link href="/giveaways" className="btn-brass">See the giveaway</Link>
          <Link href="/shop" className="btn-ghost-v2">Keep shopping</Link>
        </div>
        <p className="font-plex m-0 text-stone" style={{ fontSize: 11, lineHeight: 1.7, letterSpacing: '0.04em', marginTop: 8 }}>
          Winner drawn live by an independent third party. No purchase necessary to enter — see the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
        </p>
      </div>
    </div>
  );
}
