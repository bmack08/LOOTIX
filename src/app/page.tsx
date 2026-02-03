// lootix/src/app/page.tsx
// Homepage layout matching Lootix Interactive Prototype

import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import JustArrivedSection from "@/components/JustArrivedSection";
import FeaturedPrizes from "@/components/FeaturedPrizes";
import CategoryGrid from "@/components/CategoryGrid";
import HowItWorks from "@/components/HowItWorks";
import RecentWinners from "@/components/RecentWinners";
import EmailSignup from "@/components/EmailSignup";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Slideshow with Countdown */}
      <HeroSection />

      {/* 2. Trust Stats Bar */}
      <TrustBar />

      {/* 3. Just Arrived Products */}
      <JustArrivedSection />

      {/* 4. Current Giveaway Feature */}
      <FeaturedPrizes />

      {/* 5. Shop by Category */}
      <CategoryGrid />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Winners Section (Pre-Launch) */}
      <RecentWinners />

      {/* 8. Email Signup */}
      <EmailSignup />
    </div>
  );
}
