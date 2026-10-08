'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/lootix/v2/CartContext';
import NoPurchaseNotice from '@/components/lootix/v2/NoPurchaseNotice';

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
          Payment received — your one entry into the Launch Vault is being added right now, and a confirmation email is on
          its way. Gear ships within 2–4 business days.
        </p>
        <p className="m-0 text-stone" style={{ fontSize: 13, lineHeight: 1.7 }}>
          Entries are available to legal US residents (50 states + D.C.), 18+. If you ordered from outside the US your
          gear is on its way, but the order does not earn a sweepstakes entry.
        </p>
        <div className="flex gap-3.5 flex-wrap justify-center" style={{ marginTop: 8 }}>
          <Link href="/giveaways" className="btn-brass">See the giveaway</Link>
          <Link href="/shop" className="btn-ghost-v2">Keep shopping</Link>
        </div>
        <p className="font-plex m-0 text-stone" style={{ fontSize: 11, lineHeight: 1.7, letterSpacing: '0.04em', marginTop: 8 }}>
          Winner drawn live by an independent third party.
        </p>
        <NoPurchaseNotice className="text-center" />
      </div>
    </div>
  );
}
