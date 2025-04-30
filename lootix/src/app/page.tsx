import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen pt-24">
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
    </div>
  );
} 