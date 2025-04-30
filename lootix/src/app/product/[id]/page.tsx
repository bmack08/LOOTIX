import { getPrintfulProductById } from '@/utils/printful';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductGallery from '@/components/products/ProductGallery';
import SizeChart from '@/components/products/SizeChart';
import AddToCart from '@/components/products/AddToCart';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getPrintfulProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="relative">
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="heading-1 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-lootix-gold">
                {product.currency} {product.price}
              </p>
            </div>

            <div className="prose prose-invert">
              <p className="body-text">{product.description}</p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="heading-3">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.variants
                  .filter((v) => v.inStock)
                  .map((variant) => (
                    <button
                      key={variant.id}
                      className="btn btn-outline hover:bg-lootix-gold hover:text-lootix-black"
                    >
                      {variant.size}
                    </button>
                  ))}
              </div>
              <button
                onClick={() => document.getElementById('size-chart')?.showModal()}
                className="text-sm text-lootix-silver underline"
              >
                Size Guide
              </button>
            </div>

            {/* Add to Cart */}
            <AddToCart product={product} />

            {/* Additional Info */}
            <div className="border-t border-lootix-silver/20 pt-8 space-y-4">
              <div>
                <h3 className="heading-3 mb-2">Materials</h3>
                <p className="body-text-secondary">
                  100% premium cotton, ethically sourced and carefully crafted for durability and comfort.
                </p>
              </div>
              <div>
                <h3 className="heading-3 mb-2">Shipping</h3>
                <p className="body-text-secondary">
                  Free shipping on orders over $100. Estimated delivery: 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChart />
    </div>
  );
} 