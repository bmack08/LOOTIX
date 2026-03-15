import type {
  PrintifyImage,
  PrintifyImageUpload,
  PrintifyBlueprint,
  PrintifyPrintProvider,
  PrintifyVariant,
  PrintifyCreateProductPayload,
  PrintifyProduct,
  PrintifyPublishPayload,
  PrintifyCreateOrderPayload,
  PrintifyOrder,
} from '@/types/printify';

// ──────────────────────────────────────────────
// Printify Service Module for Lootix
// Upload → Create → Publish pipeline
// ──────────────────────────────────────────────

const PRINTIFY_BASE = 'https://api.printify.com/v1';
const PRINTIFY_TOKEN = process.env.PRINTIFY_API_TOKEN;
const PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

const isConfigured = !!(PRINTIFY_TOKEN && PRINTIFY_SHOP_ID);

if (process.env.NODE_ENV === 'development') {
  console.log('Printify API Token present:', !!PRINTIFY_TOKEN);
  console.log('Printify Shop ID present:', !!PRINTIFY_SHOP_ID);
}

const headers: Record<string, string> = PRINTIFY_TOKEN
  ? {
      Authorization: `Bearer ${PRINTIFY_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Lootix',
    }
  : {};

function ensureConfigured(): boolean {
  if (!isConfigured) {
    console.warn('Printify is not configured. Set PRINTIFY_API_TOKEN and PRINTIFY_SHOP_ID.');
    return false;
  }
  return true;
}

// ──────────────────────────────────────────────
// 1. IMAGE UPLOAD
// ──────────────────────────────────────────────

/** Upload an image to Printify by public URL. */
export async function uploadImage(imageUrl: string, fileName = 'lootix-design.png'): Promise<PrintifyImage | null> {
  if (!ensureConfigured()) return null;

  const body: PrintifyImageUpload = { file_name: fileName, url: imageUrl };

  const res = await fetch(`${PRINTIFY_BASE}/uploads/images.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Printify image upload failed:', res.status, err);
    return null;
  }

  return res.json();
}

// ──────────────────────────────────────────────
// 2. CATALOG BROWSING
// ──────────────────────────────────────────────

/** Get all available product blueprints (t-shirts, hoodies, mugs, etc.). */
export async function getBlueprints(): Promise<PrintifyBlueprint[]> {
  if (!ensureConfigured()) return [];

  const res = await fetch(`${PRINTIFY_BASE}/catalog/blueprints.json`, {
    method: 'GET',
    headers,
    next: { revalidate: 86400 }, // cache 24h — catalog rarely changes
  });

  if (!res.ok) {
    console.error('Failed to fetch blueprints:', res.status);
    return [];
  }

  return res.json();
}

/** Get print providers for a specific blueprint. */
export async function getPrintProviders(blueprintId: number): Promise<PrintifyPrintProvider[]> {
  if (!ensureConfigured()) return [];

  const res = await fetch(
    `${PRINTIFY_BASE}/catalog/blueprints/${blueprintId}/print_providers.json`,
    { method: 'GET', headers, next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    console.error('Failed to fetch print providers:', res.status);
    return [];
  }

  return res.json();
}

/** Get available variants (sizes/colors) for a blueprint + provider combo. */
export async function getVariants(blueprintId: number, providerId: number): Promise<PrintifyVariant[]> {
  if (!ensureConfigured()) return [];

  const res = await fetch(
    `${PRINTIFY_BASE}/catalog/blueprints/${blueprintId}/print_providers/${providerId}/variants.json`,
    { method: 'GET', headers, next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    console.error('Failed to fetch variants:', res.status);
    return [];
  }

  const data = await res.json();
  return data.variants ?? data;
}

// ──────────────────────────────────────────────
// 3. PRODUCT CREATION
// ──────────────────────────────────────────────

/** Create a new product in the Printify shop. */
export async function createProduct(payload: PrintifyCreateProductPayload): Promise<PrintifyProduct | null> {
  if (!ensureConfigured()) return null;

  const res = await fetch(`${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Printify create product failed:', res.status, err);
    return null;
  }

  return res.json();
}

// ──────────────────────────────────────────────
// 4. PUBLISHING
// ──────────────────────────────────────────────

/** Publish an existing product to the connected sales channel. */
export async function publishProduct(productId: string): Promise<boolean> {
  if (!ensureConfigured()) return false;

  const body: PrintifyPublishPayload = {
    title: true,
    description: true,
    images: true,
    variants: true,
    tags: true,
  };

  const res = await fetch(
    `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${productId}/publish.json`,
    { method: 'POST', headers, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('Printify publish failed:', res.status, err);
    return false;
  }

  return true;
}

// ──────────────────────────────────────────────
// 5. SHOP PRODUCTS
// ──────────────────────────────────────────────

/** List all products in the shop. */
export async function getProducts(): Promise<PrintifyProduct[]> {
  if (!ensureConfigured()) return [];

  const res = await fetch(`${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products.json`, {
    method: 'GET',
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error('Failed to fetch Printify products:', res.status);
    return [];
  }

  const data = await res.json();
  return data.data ?? data;
}

/** Get a single product by ID. */
export async function getProductById(productId: string): Promise<PrintifyProduct | null> {
  if (!ensureConfigured()) return null;

  const res = await fetch(
    `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/products/${productId}.json`,
    { method: 'GET', headers, cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Failed to fetch Printify product:', res.status);
    return null;
  }

  return res.json();
}

// ──────────────────────────────────────────────
// 6. ORDERS (for giveaway fulfillment)
// ──────────────────────────────────────────────

/** Submit an order to Printify for fulfillment. */
export async function createOrder(payload: PrintifyCreateOrderPayload): Promise<PrintifyOrder | null> {
  if (!ensureConfigured()) return null;

  const res = await fetch(`${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/orders.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Printify create order failed:', res.status, err);
    return null;
  }

  return res.json();
}

/** Get order details by ID. */
export async function getOrder(orderId: string): Promise<PrintifyOrder | null> {
  if (!ensureConfigured()) return null;

  const res = await fetch(
    `${PRINTIFY_BASE}/shops/${PRINTIFY_SHOP_ID}/orders/${orderId}.json`,
    { method: 'GET', headers, cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Failed to fetch Printify order:', res.status);
    return null;
  }

  return res.json();
}

// ──────────────────────────────────────────────
// 7. FULL PIPELINE: Upload → Create → Publish
// ──────────────────────────────────────────────

export interface DropPipelineInput {
  /** Public URL of the design image */
  imageUrl: string;
  /** Product title */
  title: string;
  /** Product description (optional) */
  description?: string;
  /** Blueprint ID from catalog (e.g. 6 = t-shirt) */
  blueprintId: number;
  /** Print provider ID */
  printProviderId: number;
  /** Variant configs — which sizes/colors to enable and at what price (cents) */
  variants: { id: number; price: number }[];
  /** Placement position on the garment */
  position?: 'front' | 'back' | 'left' | 'right' | 'neck_label';
  /** Horizontal center 0.0–1.0 (default 0.5) */
  x?: number;
  /** Vertical center 0.0–1.0 (default 0.5) */
  y?: number;
  /** Scale factor (default 1.0) */
  scale?: number;
  /** Rotation in degrees (default 0) */
  angle?: number;
  /** Tags for the product */
  tags?: string[];
  /** Auto-publish after creation (default true) */
  publish?: boolean;
}

export interface DropPipelineResult {
  image: PrintifyImage;
  product: PrintifyProduct;
  published: boolean;
}

/**
 * Full Lootix drop pipeline:
 * 1. Upload design image to Printify
 * 2. Create product with image placement on garment
 * 3. Optionally publish to sales channel
 *
 * Returns the uploaded image, created product, and publish status.
 */
export async function runDropPipeline(input: DropPipelineInput): Promise<DropPipelineResult | null> {
  if (!ensureConfigured()) return null;

  // Step 1 — Upload
  const image = await uploadImage(input.imageUrl, `${input.title.replace(/\s+/g, '-').toLowerCase()}.png`);
  if (!image) {
    console.error('Drop pipeline aborted: image upload failed');
    return null;
  }

  // Step 2 — Create product
  const variantIds = input.variants.map((v) => v.id);

  const productPayload: PrintifyCreateProductPayload = {
    title: input.title,
    description: input.description,
    blueprint_id: input.blueprintId,
    print_provider_id: input.printProviderId,
    variants: input.variants.map((v) => ({
      id: v.id,
      price: v.price,
      is_enabled: true,
    })),
    print_areas: [
      {
        variant_ids: variantIds,
        placeholders: [
          {
            position: input.position ?? 'front',
            images: [
              {
                id: image.id,
                x: input.x ?? 0.5,
                y: input.y ?? 0.5,
                scale: input.scale ?? 1.0,
                angle: input.angle ?? 0,
              },
            ],
          },
        ],
      },
    ],
    tags: input.tags,
  };

  const product = await createProduct(productPayload);
  if (!product) {
    console.error('Drop pipeline aborted: product creation failed');
    return null;
  }

  // Step 3 — Publish (default: yes)
  let published = false;
  if (input.publish !== false) {
    published = await publishProduct(product.id);
  }

  return { image, product, published };
}
