// lootix/src/app/page.tsx
// Homepage layout per Section 5.1 of the design brief

import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturedPrizes from "@/components/FeaturedPrizes";
import HowItWorks from "@/components/HowItWorks";
import RecentWinners from "@/components/RecentWinners";
import EmailSignup from "@/components/EmailSignup";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section with Countdown */}
      <HeroSection />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Current Giveaway Feature */}
      <FeaturedPrizes />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Winners Section (Pre-Launch) */}
      <RecentWinners />

      {/* 6. Email Signup */}
      <EmailSignup />
    </div>
  );
}
