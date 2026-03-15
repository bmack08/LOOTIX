import { NextResponse } from 'next/server';
import { getProducts, getProductById } from '@/utils/printify';

/**
 * GET /api/printify/products
 * Query params:
 *   (none)       → list all shop products
 *   ?id=abc123   → get single product by ID
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (productId) {
      const product = await getProductById(productId);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ product });
    }

    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Printify products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
