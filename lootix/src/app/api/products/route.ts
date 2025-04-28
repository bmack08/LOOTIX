import { NextResponse } from 'next/server';
import { getPrintfulProducts } from '@/utils/printful';

export async function GET() {
  try {
    console.log('API route called');
    console.log('API Key present:', !!process.env.NEXT_PUBLIC_PRINTFUL_API);
    
    if (!process.env.NEXT_PUBLIC_PRINTFUL_API) {
      throw new Error('Printful API key is not configured');
    }

    const products = await getPrintfulProducts();
    console.log('Products fetched successfully:', products.length);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Detailed error in products API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 