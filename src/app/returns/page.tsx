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
      <p>Most Lootix products are printed on demand just for you, so we can&rsquo;t accept returns for change of mind or incorrect size choices. Please check the size guide before ordering.</p>

      <h2>Damaged or defective items</h2>
      <p>If your item arrives damaged, defective, or misprinted, we&rsquo;ll make it right. Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> within <strong>14 days</strong> of delivery with your order number and clear photos of the issue. We&rsquo;ll arrange a free replacement or a refund.</p>

      <h2>Wrong or missing items</h2>
      <p>If you received the wrong item or your order is missing something, contact us within 14 days and we&rsquo;ll sort it out at no cost to you.</p>

      <h2>Refunds</h2>
      <p>Approved refunds are issued to your original payment method via Stripe, typically within 5–10 business days. Note that giveaway entries earned from a refunded order may be adjusted per the <a href="/official-rules">Official Rules</a>.</p>

      <h2>Questions?</h2>
      <p>Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> and we&rsquo;ll help.</p>
    </ContentPage>
  );
}
