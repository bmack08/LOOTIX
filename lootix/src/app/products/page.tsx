import { getPrintfulProducts } from '@/utils/printful';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { Suspense } from 'react';

export const metadata = {
  title: 'Products | LOOTIX',
  description: 'Shop the latest fantasy-meets-streetwear drops from LOOTIX.',
};

export default async function ProductsPage() {
  const products = await getPrintfulProducts();

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="heading-2">All Products</h1>
              <div className="flex items-center gap-4">
                <select className="bg-surface border border-lootix-silver/20 rounded-md px-3 py-2 text-sm">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-square bg-lootix-silver/20" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-lootix-silver/20 rounded w-3/4" />
            <div className="h-4 bg-lootix-silver/20 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
} 