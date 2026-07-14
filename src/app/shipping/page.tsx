import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'Shipping — Lootix',
  description: 'Lootix shipping information — worldwide delivery, timelines, and tracking.',
};

export default function ShippingPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Shipping"
      subtitle="We ship worldwide. Here's what to expect once you cop the gear."
    >
      <h2>Processing time</h2>
      <p>Because items are made-to-order, allow <strong>2–7 business days</strong> for production before your order ships.</p>

      <h2>Delivery estimates</h2>
      <ul>
        <li><strong>United States:</strong> 3–7 business days after shipping.</li>
        <li><strong>International:</strong> 7–20 business days after shipping, depending on destination and customs.</li>
      </ul>
      <p>These are estimates, not guarantees — carrier and customs delays can happen.</p>

      <h2>Shipping costs</h2>
      <p>Shipping is calculated at checkout based on your destination. Select entry packs include <strong>free shipping</strong> — look for the badge on the <a href="/giveaways">giveaways page</a>.</p>

      <h2>Tracking</h2>
      <p>You&rsquo;ll get a tracking link by email as soon as your order ships. Questions? Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>

      <h2>Customs &amp; duties</h2>
      <p>International orders may be subject to import duties or taxes set by your country. These are the recipient&rsquo;s responsibility and are not included in our prices.</p>
    </ContentPage>
  );
}
