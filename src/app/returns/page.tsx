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
      <p>Approved refunds are issued to your original payment method via Stripe, typically within 5–10 business days.</p>

      <h2 id="entries">Giveaway entries on cancelled or refunded orders</h2>
      <p>Entries earned from an order that is cancelled, refunded, or charged back are removed from the giveaway. This applies to full refunds and to the refunded items in a partial refund. See the <a href="/official-rules">Official Rules</a> for details.</p>
      <p>If we send a replacement for a damaged, defective, or misprinted item, your original entries stay in place &mdash; a replacement doesn&rsquo;t remove or add entries.</p>

      <h2 id="chargebacks">Chargebacks</h2>
      <p>If something is wrong with your order, please email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> before disputing the charge with your bank &mdash; we can usually fix it faster. See the <a href="/terms#chargebacks">Terms of Service</a> for how we handle chargebacks.</p>
      <p>Placing an order to obtain giveaway entries and then disputing the charge is treated as fraud under the <a href="/official-rules">Official Rules</a>. Entries from that order are removed and the entrant may be disqualified.</p>

      <h2>Questions?</h2>
      <p>Email <a href="mailto:hello@getlootix.com">hello@getlootix.com</a> and we&rsquo;ll help.</p>
    </ContentPage>
  );
}
