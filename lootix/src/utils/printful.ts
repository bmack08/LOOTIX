import { Product } from '@/types';
import { PrintfulProduct, PrintfulResponse } from '@/types/printful';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API;
const DEFAULT_PRODUCT_IMAGE = '/images/product-placeholder.jpg';

if (!PRINTFUL_API_KEY) {
  throw new Error('Printful API key is not configured. Please add PRINTFUL_API to your environment variables.');
}

const headers = {
  'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json',
  'X-PF-Store-ID': '0'
};

export async function getPrintfulProducts(): Promise<Product[]> {
  try {
    console.log('Making request to Printful API...');
    console.log('API URL:', `${PRINTFUL_API_URL}/store/products`);
    console.log('Headers present:', Object.keys(headers));

    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error response:', errorText);
      throw new Error(`Printful API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = await response.json();
    console.log('Number of products found:', data.result?.length || 0);

    if (!data.result || !Array.isArray(data.result)) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from Printful API');
    }

    return data.result.map((product) => ({
      id: product.id || 0,
      name: product.name || 'Untitled Product',
      description: product.description || '',
      price: product.variants?.[0]?.retail_price || 0,
      image: product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
      images: product.images?.map(img => ({
        url: img.url || '',
        preview_url: img.preview_url || ''
      })) || [],
      variants: product.variants?.map(variant => ({
        id: variant.id,
        size: variant.size,
        color: variant.color,
        price: variant.retail_price,
        inStock: variant.in_stock
      })) || [],
      slug: (product.id || '0').toString(),
      currency: product.currency || 'USD',
      isDiscontinued: product.is_discontinued || false
    }));
  } catch (error) {
    console.error('Detailed error fetching Printful products:', error);
    throw new Error('Failed to fetch products from Printful');
  }
}

export async function getPrintfulProductById(id: string): Promise<Product | null> {
  try {
    if (!id || isNaN(Number(id))) {
      console.log('Invalid product ID provided:', id);
      return null;
    }

    console.log('Fetching product by ID:', id);
    const response = await fetch(`${PRINTFUL_API_URL}/store/products/${id}`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Printful API error response:', errorText);
      return null;
    }

    const data: PrintfulResponse<PrintfulProduct> = await response.json();
    console.log('Product data received:', data);

    if (!data.result || typeof data.result !== 'object') {
      console.log('No valid product found with ID:', id);
      return null;
    }

    const product = data.result;
    return {
      id: typeof product.id === 'number' ? product.id : 0,
      name: product.name || 'Untitled Product',
      description: product.description || '',
      price: product.variants?.[0]?.retail_price || 0,
      image: product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
      images: product.images?.map(img => ({
        url: img.url || '',
        preview_url: img.preview_url || ''
      })) || [],
      variants: product.variants?.map(variant => ({
        id: variant.id,
        size: variant.size,
        color: variant.color,
        price: variant.retail_price,
        inStock: variant.in_stock
      })) || [],
      slug: String(product.id || '0'),
      currency: product.currency || 'USD',
      isDiscontinued: product.is_discontinued || false
    };
  } catch (error) {
    console.error('Error fetching Printful product:', error);
    return null;
  }
} 