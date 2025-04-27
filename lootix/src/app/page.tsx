import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
