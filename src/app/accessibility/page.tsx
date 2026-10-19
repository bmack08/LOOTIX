import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { LEGAL } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Accessibility Statement — Lootix',
  description:
    'Lootix is working to make its store and giveaways usable by everyone. Our accessibility target, known limitations, and how to get help.',
};

export default function AccessibilityPage() {
  const mail = `mailto:${LEGAL.supportEmail}?subject=Accessibility`;
  return (
    <ContentPage
      eyebrow="Legal"
      title="Accessibility Statement"
      subtitle="Everyone should be able to shop the drop and enter the giveaway."
      updated={LEGAL.effectiveDate}
    >
      <h2 id="commitment" className="scroll-mt-28">Our Commitment</h2>
      <p>
        {LEGAL.entityName} wants every visitor — including people who use screen readers, keyboard navigation,
        magnification, voice control, or other assistive technology — to be able to browse our products, check out, and
        enter our giveaways. We use the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA, as our target standard
        and test against it as we build and update the site.
      </p>

      <h2 id="measures" className="scroll-mt-28">What We&rsquo;ve Done</h2>
      <ul>
        <li><strong>Semantic structure:</strong> pages use proper headings, landmarks, lists, and labeled form fields, and declare their language so assistive technology reads them correctly.</li>
        <li><strong>Keyboard access:</strong> navigation, menus, forms, and cart controls are reachable by keyboard, and a &ldquo;Skip to main content&rdquo; link lets you bypass the header.</li>
        <li><strong>Text alternatives:</strong> product and content images include alternative text; purely decorative images are hidden from screen readers.</li>
        <li><strong>Color contrast:</strong> we choose text and background colors to meet WCAG AA contrast ratios and don&rsquo;t rely on color alone to convey meaning.</li>
        <li><strong>Reduced motion:</strong> if your device is set to reduce motion, our scroll-reveal animations and scrolling ticker are turned off.</li>
        <li><strong>Resizable layouts:</strong> pages adapt to small screens and browser zoom without horizontal scrolling.</li>
      </ul>

      <h2 id="limitations" className="scroll-mt-28">Known Limitations</h2>
      <p>We&rsquo;re a small team and not everything is perfect yet. Areas we know about:</p>
      <ul>
        <li><strong>Third-party checkout:</strong> payment is completed on Stripe&rsquo;s hosted checkout page. Stripe maintains its own accessibility program, but that page is outside our direct control.</li>
        <li><strong>Social media content:</strong> content on or linked from third-party platforms (such as Instagram or TikTok) follows those platforms&rsquo; accessibility features, not ours.</li>
        <li><strong>Older pages:</strong> some older pages and product descriptions are still being reviewed and updated to meet our target.</li>
      </ul>

      <h2 id="help" className="scroll-mt-28">Need Help or Found a Barrier?</h2>
      <p>
        Email <a href={mail}>{LEGAL.supportEmail}</a> and tell us the page you were on and what went wrong. We aim to
        respond within <strong>2 business days</strong>.
      </p>
      <p>On request, we can also provide:</p>
      <ul>
        <li><strong>Alternative formats</strong> of our <a href="/official-rules">Official Rules</a>, <a href="/privacy">Privacy Policy</a>, and other policies — for example, plain text, large print, or a format compatible with your assistive technology.</li>
        <li><strong>Assisted ordering:</strong> help placing an order if you can&rsquo;t complete checkout on your own.</li>
        <li><strong>Assisted entry:</strong> help entering a giveaway, including the free method of entry. Assistance never changes your odds or the rules that apply to everyone.</li>
      </ul>

      <h2 id="review" className="scroll-mt-28">Review Date</h2>
      <p>This statement was last reviewed on {LEGAL.effectiveDate}. We&rsquo;ll revisit it as the site changes.</p>
    </ContentPage>
  );
}
