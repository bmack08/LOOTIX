import { NextResponse } from 'next/server';
import { getPrintfulProducts } from '@/utils/printful';

export async function GET() {
  try {
    const products = await getPrintfulProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 