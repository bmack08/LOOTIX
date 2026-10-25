import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';

export const metadata: Metadata = {
  title: 'Returns & Refunds — Lootix',
  description: 'Lootix returns and refunds policy for made-to-order streetwear.',
};

export default function ReturnsPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Returns & Refunds"
      subtitle="Our gear is made-to-order — here's how returns, defects, and exchanges work."
    >
      <h2>Made-to-order</h2>
      <p>Size or color exchanges are available within 30 days of delivery for an equal-value item.</p>

      <h2>Damaged or defective items</h2>
      <p>If your item arrives damaged, defective, or misprinted, we&rsquo;ll make it right. Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> within <strong>14 days</strong> of delivery with your order number and clear photos of the issue. We&rsquo;ll arrange a free replacement or a refund.</p>

      <h2>Wrong or missing items</h2>
      <p>If you received the wrong item or your order is missing something, contact us within 14 days and we&rsquo;ll sort it out at no cost to you.</p>

      <h2>Refunds</h2>
      <p>Approved refunds are issued to your original payment method via Stripe, typically within 5–10 business days.</p>

      <h2>What happens to my giveaway entries?</h2>
      <p>
        A <strong>refund or chargeback voids the entries from that order</strong> — they stop counting in the draw, per the{' '}
        <a href="/official-rules">Official Rules</a>. A <strong>size exchange keeps them</strong>: you still bought the gear, so
        the entries stand. We ship to the United States only, and entries are earned only on orders shipped to eligible
        U.S. addresses.
      </p>

      <h2>Questions?</h2>
      <p>Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> and we&rsquo;ll help.</p>
    </ContentPage>
  );
}
