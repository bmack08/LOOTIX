import { Product } from '@/types';
import { PrintfulProduct, PrintfulResponse, PrintfulFile, PrintfulSyncVariant } from '@/types/printful';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API;
const DEFAULT_PRODUCT_IMAGE = '/images/product-placeholder.jpg';

// Debug logging for API key
console.log('Printful API Key present:', !!PRINTFUL_API_KEY);
console.log('Printful API Key length:', PRINTFUL_API_KEY?.length);

if (!PRINTFUL_API_KEY) {
  throw new Error('Printful API key is not configured. Please add PRINTFUL_API to your environment variables.');
}

const headers = {
  'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json'
};

// Function to get store information
async function getStoreId() {
  try {
    const response = await fetch(`${PRINTFUL_API_URL}/stores`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch store information');
      return null;
    }

    const data = await response.json();
    console.log('Store information:', data);
    return data.result[0]?.id || null;
  } catch (error) {
    console.error('Error fetching store information:', error);
    return null;
  }
}

export async function getPrintfulProducts(): Promise<Product[]> {
  try {
    // Get store ID
    const storeId = await getStoreId();
    console.log('Using store ID:', storeId);
    
    if (!storeId) {
      throw new Error('Could not determine store ID');
    }

    const requestHeaders = {
      ...headers,
      'X-PF-Store-ID': String(storeId)
    };

    console.log('Making request to Printful API...');
    console.log('API URL:', `${PRINTFUL_API_URL}/store/products`);
    console.log('Headers:', requestHeaders);

    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers: requestHeaders,
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
    console.log('Raw API Response:', JSON.stringify(data, null, 2));

    if (!data.result || !Array.isArray(data.result)) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from Printful API');
    }

    return data.result.map((product) => {
      const firstVariant = product.sync_variants?.[0];
      const retailPrice = firstVariant?.retail_price ? parseFloat(firstVariant.retail_price) : 0;
      
      return {
        id: product.id || 0,
        name: product.name || 'Untitled Product',
        description: product.description || '',
        price: retailPrice,
        image: product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
        images: product.sync_variants?.flatMap(variant => 
          variant.files?.map(file => ({
            url: file.preview_url || '',
            preview_url: file.preview_url || ''
          })) || []
        ) || [],
        variants: product.sync_variants?.map(variant => ({
          id: variant.id,
          size: variant.size,
          color: variant.color,
          price: parseFloat(variant.retail_price || '0'),
          inStock: variant.is_enabled
        })) || [],
        slug: (product.id || '0').toString(),
        currency: firstVariant?.currency || 'USD',
        isDiscontinued: product.is_discontinued || false
      };
    });
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

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('Printful API error response:', responseText);
      return null;
    }

    const data: PrintfulResponse<PrintfulProduct> = JSON.parse(responseText);
    console.log('Product data received:', data);

    if (!data.result || typeof data.result !== 'object') {
      console.log('No valid product found with ID:', id);
      return null;
    }

    const product = data.result;
    const variants = product.sync_variants || [];
    const firstVariant = variants[0];
    const previewFile = firstVariant?.files?.find(f => f.type === 'preview');

    // Get all preview images from all variants
    const allPreviewImages = variants
      .map(variant => variant.files?.find(f => f.type === 'preview'))
      .filter(file => file !== undefined) as PrintfulFile[];

    // Convert retail price to number
    const retailPrice = firstVariant?.retail_price ? parseFloat(firstVariant.retail_price) : 0;

    return {
      id: product.id,
      name: product.name,
      description: product.sync_product?.description || '',
      price: retailPrice,
      image: previewFile?.preview_url || product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
      images: allPreviewImages.map(file => ({
        url: file.preview_url,
        preview_url: file.preview_url
      })),
      variants: variants.map(variant => ({
        id: variant.id,
        size: variant.size,
        color: variant.color,
        price: parseFloat(variant.retail_price || '0'),
        inStock: variant.is_enabled
      })),
      slug: String(product.id),
      currency: firstVariant?.currency || 'USD',
      isDiscontinued: false
    };
  } catch (error) {
    console.error('Error fetching Printful product:', error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<PrintfulProduct[]> {
  try {
    console.log('Fetching featured products from Printful...');
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    console.log('Featured products response status:', response.status);
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('Printful API error response:', responseText);
      throw new Error(`Printful API error: ${response.status} ${response.statusText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = JSON.parse(responseText);
    console.log('Parsed data:', data);

    if (!data.result || !Array.isArray(data.result)) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from Printful API');
    }

    // Return the first 8 products as featured
    return data.result.slice(0, 8).map((product: PrintfulProduct) => {
      const variants = product.sync_variants || [];
      const firstVariant = variants[0];
      const previewFile = firstVariant?.files?.find(f => f.type === 'preview');
      
      // Get all preview images from all variants
      const allPreviewImages = variants
        .map(variant => variant.files?.find(f => f.type === 'preview'))
        .filter(file => file !== undefined) as PrintfulFile[];

      return {
        id: product.id,
        name: product.name,
        description: product.sync_product?.description || '',
        price: firstVariant?.retail_price || '0.00',
        image: previewFile?.preview_url || product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
        thumbnail_url: previewFile?.preview_url || product.thumbnail_url || DEFAULT_PRODUCT_IMAGE,
        images: allPreviewImages.map(file => ({
          id: file.id,
          type: file.type,
          url: file.preview_url,
          thumbnail_url: file.preview_url,
          preview_url: file.preview_url
        })),
        variants: variants.map(variant => ({
          id: variant.id,
          name: variant.name,
          size: variant.size,
          color: variant.color,
          price: variant.retail_price,
          retail_price: variant.retail_price,
          in_stock: variant.is_enabled
        })),
        currency: firstVariant?.currency || 'USD',
        is_discontinued: false
      };
    });
  } catch (error) {
    console.error('Detailed error fetching featured products:', error);
    return [];
  }
} 