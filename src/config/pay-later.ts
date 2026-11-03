// Pay-later messaging. Snapshot written by scripts/stripe-paylater.mjs (a
// read-only Stripe check). Shown only when the snapshot came from the live key
// and a provider is on; test or unknown mode hides it.

import SNAP from './pay-later.json';

type Snap = { mode?: string; klarna?: string; afterpay?: string };
const s = SNAP as Snap;

export const PAY_LATER_PROVIDERS: string[] =
  s.mode === 'live' ? [s.klarna === 'on' && 'Klarna', s.afterpay === 'on' && 'Afterpay'].filter((x): x is string => !!x) : [];

export function payLaterLine(priceValue: number): string | null {
  if (!PAY_LATER_PROVIDERS.length) return null;
  const each = (Math.ceil((priceValue / 4) * 100) / 100).toFixed(2);
  return `Or 4 interest-free payments of $${each} with ${PAY_LATER_PROVIDERS.join(' or ')} at checkout.`;
}
