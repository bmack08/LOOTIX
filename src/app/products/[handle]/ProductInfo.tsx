'use client';

// Shipping box + Details / Size chart / Care accordions. Shipping figures
// come from src/config/shipping.ts, the same config the cart quotes from.

import Link from 'next/link';
import { useState } from 'react';
import type { ProductGroup } from '@/config/product-groups';
import type { SizeChart } from '@/config/size-charts';
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_DELIVERY_BUSINESS_DAYS,
  SHIPPING_HOODIE_CENTS,
  SHIPPING_TEES_CENTS,
} from '@/config/shipping';

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
export const SIZE_CHART_ID = 'pdp-size-chart';

/** Opens the Size chart accordion and moves focus to it. */
export function openSizeChart() {
  const d = document.getElementById(SIZE_CHART_ID) as HTMLDetailsElement | null;
  if (!d) return;
  d.open = true;
  d.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  d.querySelector('summary')?.focus({ preventScroll: true });
}

export function ShippingBox() {
  return (
    <div className="pdp-ship font-plex">
      <span className="pdp-ship-title">Shipping &amp; returns</span>
      <span>Ships to the US only.</span>
      <span>{usd(SHIPPING_HOODIE_CENTS)} per order with a hoodie. {usd(SHIPPING_TEES_CENTS)} for tees only.</span>
      <span>Free shipping on orders of ${FREE_SHIPPING_THRESHOLD}+.</span>
      <span>
        30-day size exchange. <Link href="/returns" className="text-brass hover:text-brass-lit underline">Full policy</Link>
      </span>
    </div>
  );
}

export function Accordions({ group, chart }: { group: ProductGroup; chart: SizeChart }) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const hat = group.category === 'Hats';
  return (
    <div className="pdp-acc">
      <details open>
        <summary>Details</summary>
        <ul>
          {group.fitNote ? <li>{group.fitNote}</li> : null}
          {group.fabric.map((f) => <li key={f}>{f}</li>)}
          <li>{group.printMethod}</li>
          <li>
            Printed to order. Arrives in about {SHIPPING_DELIVERY_BUSINESS_DAYS.min}&ndash;{SHIPPING_DELIVERY_BUSINESS_DAYS.max} business days.
          </li>
        </ul>
      </details>
      <details id={SIZE_CHART_ID}>
        <summary>Size chart</summary>
        {chart.kind === 'table' ? (
          <>
            <div className="pdp-unit" role="group" aria-label="Units">
              <button type="button" aria-pressed={unit === 'in'} onClick={() => setUnit('in')}>Inches</button>
              <button type="button" aria-pressed={unit === 'cm'} onClick={() => setUnit('cm')}>cm</button>
            </div>
            <div className="pdp-table-wrap" tabIndex={0} role="region" aria-label={`Size chart in ${unit === 'in' ? 'inches' : 'centimeters'}`}>
              <table>
                <caption className="sr-only">{group.title} measurements, {unit === 'in' ? 'inches' : 'centimeters'}</caption>
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    {chart.sizes.map((s) => <th key={s} scope="col">{s}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {chart.sizes.map((s) => <td key={s}>{r.values[unit][s]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Measured flat; chest is pit to pit &times; 2. Between sizes? Size up for a looser fit. 30-day size exchange.</p>
          </>
        ) : chart.kind === 'one-size' ? (
          <p>One size, adjustable. {chart.note}</p>
        ) : (
          <p>
            Size chart coming soon. Email <a className="text-brass underline" href="mailto:support@getlootix.com">support@getlootix.com</a> for measurements.
          </p>
        )}
      </details>
      <details>
        <summary>Care</summary>
        <p>{hat ? 'Spot clean with a damp cloth. Do not machine wash.' : 'Wash cold, inside out. Hang dry. Do not iron the print.'}</p>
      </details>
    </div>
  );
}
