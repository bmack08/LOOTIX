import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="card group overflow-hidden"
        >
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={`${product.name} - Product thumbnail`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="heading-3 mb-2">{product.name}</h3>
            <p className="body-text-secondary mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lootix-gold font-bold">
                {product.currency} {product.price}
              </p>
              {product.variants.some(v => v.inStock) ? (
                <span className="text-lootix-neon text-sm">In Stock</span>
              ) : (
                <span className="text-red-500 text-sm">Out of Stock</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 