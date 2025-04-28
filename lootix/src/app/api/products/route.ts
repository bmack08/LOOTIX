import { NextResponse } from 'next/server';
import { getPrintfulProducts } from '@/utils/printful';

export async function GET() {
  try {
    console.log('API Key present:', !!process.env.NEXT_PUBLIC_PRINTFUL_API);
    const products = await getPrintfulProducts();
    console.log('Number of products fetched:', products.length);
    console.log('Products:', JSON.stringify(products, null, 2));
    return NextResponse.json(products);
  } catch (error) {
    console.error('Detailed error in products API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 