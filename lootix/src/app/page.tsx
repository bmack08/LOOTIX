import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/utils/printful';
import { PrintfulProduct } from '@/types/printful';
import { Product } from '@/types';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  
  // Convert Printful products to our Product type
  const products: Product[] = featuredProducts.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.thumbnail_url,
    images: product.images.map(img => ({
      url: img.url,
      preview_url: img.preview_url
    })),
    variants: product.variants.map(variant => ({
      id: variant.id,
      size: variant.size,
      color: variant.color,
      price: variant.retail_price,
      inStock: variant.in_stock
    })),
    slug: product.id.toString(),
    currency: product.currency,
    isDiscontinued: product.is_discontinued
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lootix_hero_placeholder.png"
            alt="LOOTIX Hero"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-lootix-black/20" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="heading-1 mb-6 animate-fade-in">
            Fantasy Meets Streetwear
          </h1>
          <p className="body-text text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Legendary Irems. Enter the world of LOOTIX.
          </p>
          <div className="flex gap-4 justify-center animate-zoom-in">
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/raffle" className="btn btn-accent">
              Enter Raffle
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">Featured Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.slug}`}
                className="card group overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="heading-3 mb-2">{product.name}</h3>
                  <p className="body-text-secondary mb-4">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Raffle Countdown */}
      <section className="py-20 bg-lootix-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Next Raffle Drop</h2>
            <div className="flex justify-center gap-4 mb-8">
              <div className="card p-4 min-w-[100px]">
                <div className="text-4xl font-orbitron text-lootix-neon">24</div>
                <div className="body-text-secondary">Hours</div>
              </div>
              <div className="card p-4 min-w-[100px]">
                <div className="text-4xl font-orbitron text-lootix-neon">45</div>
                <div className="body-text-secondary">Minutes</div>
              </div>
              <div className="card p-4 min-w-[100px]">
                <div className="text-4xl font-orbitron text-lootix-neon">30</div>
                <div className="body-text-secondary">Seconds</div>
              </div>
            </div>
            <Link href="/raffle" className="btn btn-accent">
              Enter Now
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Video */}
      <section className="py-20">
        <div className="container">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/k1MvPMv0xiU"
              title="LOOTIX Promotional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
} 