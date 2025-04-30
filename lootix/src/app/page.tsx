import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen pt-6">
      {/* Header Logo and Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">LOOTIX</h1>
        <p className="text-gray-700 mb-4">Fantasy x Streetwear</p>
        <div className="flex justify-center gap-2 mb-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 text-sm border border-gray-400 rounded">
            Shop Now
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 text-sm border border-gray-400 rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* Latest Drops */}
      <FeaturedProducts />

      {/* Featured Categories */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Featured Categories
        </h2>
        
        {/* Category: Apparel */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold text-black mb-2">Apparel</h3>
          <p className="text-gray-700 mb-2">Discover our latest collection</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 text-sm border border-gray-400 rounded mb-6">
            Shop Now →
          </button>
        </div>
        
        {/* Category: Accessories */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold text-black mb-2">Accessories</h3>
          <p className="text-gray-700 mb-2">Discover our latest collection</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 text-sm border border-gray-400 rounded mb-6">
            Shop Now →
          </button>
        </div>
        
        {/* Category: Limited Edition */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold text-black mb-2">Limited Edition</h3>
          <p className="text-gray-700 mb-2">Discover our latest collection</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 text-sm border border-gray-400 rounded mb-6">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  );
}
