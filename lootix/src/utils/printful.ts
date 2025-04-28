import { Product } from '@/types';
import { PrintfulProduct, PrintfulResponse } from '@/types/printful';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API;

if (!PRINTFUL_API_KEY) {
  throw new Error('Printful API key is not configured. Please add NEXT_PUBLIC_PRINTFUL_API to your environment variables.');
}

const headers = {
  'Authorization': PRINTFUL_API_KEY,
  'Content-Type': 'application/json',
  'X-PF-Store-ID': '0', // Add store ID
};

export async function getPrintfulProducts(): Promise<Product[]> {
  try {
    console.log('Making request to Printful API...');
    console.log('API URL:', `${PRINTFUL_API_URL}/store/products`);
    console.log('Headers:', JSON.stringify(headers, null, 2));

    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers,
      cache: 'no-store', // Prevent caching
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error response:', errorText);
      throw new Error(`Printful API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = await response.json();
    console.log('Printful API response:', JSON.stringify(data, null, 2));

    if (!data.result || !Array.isArray(data.result)) {
      throw new Error('Invalid response format from Printful API');
    }

    return data.result.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.variants?.[0]?.retail_price || 0,
      image: product.thumbnail_url || '',
      slug: product.id.toString(),
    }));
  } catch (error) {
    console.error('Detailed error fetching Printful products:', error);
    throw error; // Re-throw to handle in the API route
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