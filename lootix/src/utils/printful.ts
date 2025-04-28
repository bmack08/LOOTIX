import { Product } from '@/types';
import { PrintfulProduct, PrintfulResponse } from '@/types/printful';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API;

if (!PRINTFUL_API_KEY) {
  throw new Error('Printful API key is not configured. Please add NEXT_PUBLIC_PRINTFUL_API_KEY to your environment variables.');
}

const headers = {
  'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json',
};

export async function getPrintfulProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = await response.json();
    return data.result.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.variants[0].retail_price,
      image: product.thumbnail_url,
      slug: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    return [];
  }
}

export async function getPrintfulProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products/${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`);
    }

    const data: PrintfulResponse<PrintfulProduct> = await response.json();
    const product = data.result;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.variants[0].retail_price,
      image: product.thumbnail_url,
      slug: product.id.toString(),
    };
  } catch (error) {
    console.error('Error fetching Printful product:', error);
    return null;
  }
} 