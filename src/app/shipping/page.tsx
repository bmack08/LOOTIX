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
      subtitle="We ship within the United States only. Here's what to expect once you cop the gear."
    >
      <h2>Where we ship</h2>
      <p>
        We currently ship to <strong>addresses in the United States only</strong>, including APO/FPO. We cannot
        ship internationally, and checkout will not accept a non-US delivery address.
      </p>

      <h2>Processing time</h2>
      <p>Because items are made-to-order, allow <strong>2–7 business days</strong> for production before your order ships.</p>

      <h2>Delivery estimates</h2>
      <p>
        <strong>3–7 business days</strong> after shipping. These are estimates, not guarantees — carrier delays
        can happen.
      </p>

      <h2>Shipping costs</h2>
      <p>
        Shipping is calculated at checkout. <strong>Orders over $100 ship free.</strong>
      </p>

      <h2>Tracking</h2>
      <p>You&rsquo;ll get a tracking link by email as soon as your order ships. Questions? Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a>.</p>
    </ContentPage>
  );
}
