import type { Metadata } from 'next';
import { HowItWorks, GrandPrizeShowcase, TrustStrip, EmailSection } from '@/components/lootix/sections';
import { isEntryWindowOpen } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How It Works — Lootix',
  description: 'How Lootix works: limited, numbered drops and honest giveaways drawn at random on RANDOM.ORG.',
};

// isEntryWindowOpen() is wall-clock dependent: revalidate so the LIVE / PRE-START copy refreshes.
export const revalidate = 60;

export default function HowItWorksPage() {
  const live = isEntryWindowOpen();
  return (
    <>
      <HowItWorks live={live} />
      <GrandPrizeShowcase live={live} />
      <TrustStrip />
      <EmailSection />
    </>
  );
}
