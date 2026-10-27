import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { COMPANY } from '@/lib/lootix';
import { COMPANY_ADDRESS_LINES } from '@/config/legal';

export const metadata: Metadata = {
  title: 'Contact — Lootix',
  description: 'Get in touch with the Lootix guild — support, giveaways, and partnerships.',
};

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Say Hey"
      title="Contact the guild"
      subtitle="Questions about an order, a giveaway, or a collab? We're quick to reply."
    >
      <h2>Email</h2>
      <p>The fastest way to reach us: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We aim to respond within one business day.</p>

      <h2>Follow</h2>
      <ul>
        <li><a href={COMPANY.socials.instagram}>Instagram</a> — new releases, behind-the-scenes, winner announcements</li>
        <li><a href={COMPANY.socials.tiktok}>TikTok</a> — draws and new release reveals</li>
        <li><a href={COMPANY.socials.discord}>Discord</a> — the guild hangout</li>
      </ul>

      <h2>Mailing address</h2>
      <p>
        {COMPANY_ADDRESS_LINES.map((line, i) => (
          <span key={line}>
            {i === 0 ? <strong>{line}</strong> : line}
            {i < COMPANY_ADDRESS_LINES.length - 1 && <br />}
          </span>
        ))}
      </p>

      <hr />
      <p className="font-mono text-[12px] text-faint">For giveaway rules and the free entry method, see the <a href="/official-rules">Official Rules</a>.</p>
    </ContentPage>
  );
}
