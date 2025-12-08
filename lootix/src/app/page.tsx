// lootix/src/app/page.tsx

import HeroSection from "@/components/HeroSection";
import FeaturedPrizes from "@/components/FeaturedPrizes";
import HowItWorks from "@/components/HowItWorks";
import RecentWinners from "@/components/RecentWinners";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Countdown */}
      <HeroSection />

      {/* Stats Section */}
      <Stats />

      {/* Featured Prizes */}
      <FeaturedPrizes />

      {/* How It Works */}
      <HowItWorks />

      {/* Recent Winners */}
      <RecentWinners />
    </div>
  );
}
