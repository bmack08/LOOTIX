import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { FREE_SHIPPING_THRESHOLD } from '@/config/giveaway';

export const metadata: Metadata = {
  title: 'Shipping — Lootix',
  description: 'Lootix shipping information — US-only delivery, timelines, free shipping threshold, and tracking.',
};

export default function ShippingPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Shipping"
      subtitle="We ship to the United States only. Here's what to expect once you cop the gear."
    >
      <h2>Where we ship</h2>
      <p>
        We ship to addresses in the <strong>United States only</strong> (the 50 states and D.C.). We do not ship
        internationally, and checkout will not accept a non-US shipping address. Giveaway entries are earned only on
        orders shipped to eligible U.S. addresses — see the <a href="/official-rules">Official Rules</a>.
      </p>

      <h2>Processing time</h2>
      <p>Because items are made-to-order, allow <strong>2–7 business days</strong> for production before your order ships.</p>

      <h2>Delivery estimates</h2>
      <p><strong>United States:</strong> 3–7 business days after shipping. These are estimates, not guarantees — carrier delays can happen.</p>

      <h2>Shipping costs</h2>
      <p>We ship to U.S. addresses only. Shipping is a flat rate per order:</p>
      <ul>
        <li>$8.95 for any order that includes a hoodie</li>
        <li>$5.95 for orders without a hoodie (tees, hats, accessories)</li>
        <li>Free on orders of $100 or more (merchandise subtotal after discounts, before tax)</li>
      </ul>
      <p>Items are made to order. Please allow 2–7 business days for production, then 3–7 business days in transit. Giveaway entries are based on the merchandise total and never on shipping charges.</p>

      <h2>Tracking</h2>
      <p>You&rsquo;ll get a tracking link by email as soon as your order ships. Questions? Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>
    </ContentPage>
  );
}
