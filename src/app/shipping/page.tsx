import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'Shipping — Lootix',
  description: 'Lootix shipping information — US delivery, timelines, and tracking.',
};

export default function ShippingPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Shipping"
      subtitle="We currently ship within the United States. Here's what to expect once you cop the gear."
    >
      <h2>Where we ship</h2>
      <p>Lootix currently ships to addresses in the 50 United States and D.C. only. We don&rsquo;t ship internationally at this time.</p>

      <h2>Processing time</h2>
      <p>Because items are made-to-order, allow <strong>2–7 business days</strong> for production before your order ships.</p>

      <h2>Delivery estimates</h2>
      <p>Most orders arrive <strong>3–7 business days</strong> after shipping. These are estimates, not guarantees — carrier delays can happen.</p>

      <h2>If your order is delayed</h2>
      <p>If we can&rsquo;t ship your order within the time we told you, we&rsquo;ll email you with a revised ship date and give you the choice to wait or cancel for a full refund.</p>

      <h2>Shipping costs</h2>
      <p>Shipping is calculated at checkout. Select items include <strong>free shipping</strong> — look for the badge on the product.</p>

      <h2>Tracking</h2>
      <p>You&rsquo;ll get a tracking link by email as soon as your order ships. Questions? Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>
    </ContentPage>
  );
}
