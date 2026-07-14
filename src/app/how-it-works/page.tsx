import type { Metadata } from 'next';
import { HowItWorks, GrandPrizeShowcase, TrustStrip, EmailSection } from '@/components/lootix/sections';

export const metadata: Metadata = {
  title: 'How It Works — Lootix',
  description: 'Three steps to legendary: shop the drop, earn entries, win the loot. No purchase necessary — free entry always available.',
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks />
      <GrandPrizeShowcase />
      <TrustStrip />
      <EmailSection />
    </>
  );
}
