import { Product } from '@/types';
import { PrintfulProduct, PrintfulResponse, PrintfulFile, PrintfulSyncVariant } from '@/types/printful';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API;
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID || 'default';
const DEFAULT_PRODUCT_IMAGE = '/images/product-placeholder.jpg';

// Check if API key is configured (don't throw at module load time to allow build to succeed)
const isConfigured = !!PRINTFUL_API_KEY;

// NEVER log the API key, the store id, or the `headers` object below: the
// Authorization header carries the secret and logs are not a safe place for it.
const headers: Record<string, string> = PRINTFUL_API_KEY ? {
  'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
  'Content-Type': 'application/json',
  'X-PF-Store-ID': PRINTFUL_STORE_ID
} : {};

// Helper to check if Printful is configured before making API calls
function ensureConfigured() {
  if (!PRINTFUL_API_KEY) {
    console.warn('Printful API key is not configured. Products will not be available.');
    return false;
  }
  return true;
}

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
    return data.result[0]?.id || null;
  } catch (error) {
    console.error('Error fetching store information:', error);
    return null;
  }
}

export async function getPrintfulProducts(): Promise<Product[]> {
  if (!ensureConfigured()) {
    return []; // Return empty array if not configured
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Printful API error', response.status);
      throw new Error(`Printful API error: ${response.status} ${response.statusText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = await response.json();

    if (!data.result || !Array.isArray(data.result)) {
      console.error('Invalid response format from Printful API');
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
          id: variant.id || 0,
          size: variant.size || '',
          color: variant.color || '',
          price: variant.retail_price ? parseFloat(variant.retail_price) : 0,
          inStock: variant.in_stock || false
        })) || [],
        slug: product.id?.toString() || '0',
        currency: 'USD',
        isDiscontinued: false
      };
    });
  } catch (error) {
    console.error('Detailed error fetching Printful products:', error);
    throw new Error('Failed to fetch products from Printful');
  }
}

export async function getPrintfulProductById(id: string): Promise<Product | null> {
  if (!ensureConfigured()) {
    return null; // Return null if not configured
  }

  try {
    if (!id || isNaN(Number(id))) {
      return null;
    }

    const response = await fetch(`${PRINTFUL_API_URL}/store/products/${id}`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Printful API error', response.status);
      return null;
    }

    const data: PrintfulResponse<PrintfulProduct> = JSON.parse(responseText);

    if (!data.result || typeof data.result !== 'object') {
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
  if (!ensureConfigured()) {
    return []; // Return empty array if not configured
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Printful API error', response.status);
      throw new Error(`Printful API error: ${response.status} ${response.statusText}`);
    }

    const data: PrintfulResponse<PrintfulProduct[]> = JSON.parse(responseText);

    if (!data.result || !Array.isArray(data.result)) {
      console.error('Invalid response format from Printful API');
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

// ─────────────────────────────────────────────────────────────
// DRAFT orders
//
// Appended below the existing catalog helpers on purpose — nothing above this
// line was changed.
//
// Printful orders are created as DRAFTS and nothing else. There is no
// `confirm` field in any body here and no `confirm` query string on any URL
// here: the OWNER reviews, confirms and pays for the order in the Printful
// dashboard. Never add a call to /orders/{id}/confirm to this file.
//
// The order row is the source of truth; every outcome is written back to it
// through updateOrder, and this function never throws — a webhook that got a
// thrown error would hand Stripe a 500 and be retried forever.
// ─────────────────────────────────────────────────────────────

import { missingVariantKeys, printfulVariantFor } from '@/config/printful-variants';
import { shortOrderNumber, updateOrder } from '@/lib/orders';
import type { OrderItem, OrderRow, OrderStatus } from '@/lib/orders';

/** What a draft attempt ended up as — also what gets stored on the row. */
export type PrintfulDraftResult = {
  status: OrderStatus;
  printful_order_id?: string;
  detail?: string;
};

/** Printful can be slow; an order call that hangs must not hang the webhook. */
const ORDER_TIMEOUT_MS = 15000;

/**
 * Headers for an ORDER call.
 *
 * Reuses the module-level `headers` (Authorization + Content-Type) but sends
 * X-PF-Store-ID only when PRINTFUL_STORE_ID is actually set: the 'default'
 * fallback at the top of this file is a placeholder, not a store id Printful
 * would accept on an order. Never log this object — it carries the token.
 */
function orderHeaders(): Record<string, string> {
  const h: Record<string, string> = { ...headers };
  if (!process.env.PRINTFUL_STORE_ID) delete h['X-PF-Store-ID'];
  return h;
}

/**
 * Printful's own error text, trimmed to 120 characters and prefixed with
 * ': ', or '' when there is nothing usable.
 *
 * The message only. Never the request body, the recipient, or a header.
 */
async function printfulErrorDetail(res: Response): Promise<string> {
  try {
    const body = (await res.json().catch(() => null)) as
      | { result?: unknown; error?: { message?: unknown } }
      | null;
    const raw =
      typeof body?.error?.message === 'string'
        ? body.error.message
        : typeof body?.result === 'string'
          ? body.result
          : '';
    const text = raw.trim().slice(0, 120);
    return text ? `: ${text}` : '';
  } catch {
    return '';
  }
}

/** Write the outcome onto the order row and hand it back to the caller. */
async function persistDraftResult(order: OrderRow, result: PrintfulDraftResult): Promise<PrintfulDraftResult> {
  const saved = await updateOrder(order.stripe_session_id, {
    status: result.status,
    status_detail: result.detail ?? null,
    ...(result.printful_order_id ? { printful_order_id: result.printful_order_id } : {}),
  });
  if ('error' in saved) {
    // Non-PII only: the short order number and the status.
    console.error(
      `[printful] could not save status ${result.status} for order ${order.printful_external_id || '(unnumbered)'}`,
    );
  }
  return result;
}

/**
 * Create the Printful DRAFT order for a stored order row.
 *
 * Idempotent in three places, because a Stripe webhook can be delivered more
 * than once and a process can die mid-flight:
 *   1. A row that already has printful_order_id is left alone.
 *   2. The short order number is saved before Printful is called.
 *   3. GET /orders/@{external_id} adopts a draft Printful already accepted.
 *
 * Returns the outcome; the same outcome is persisted on the row. Does not
 * throw, ever.
 */
export async function createDraftOrder(order: OrderRow): Promise<PrintfulDraftResult> {
  try {
    // 1. Already created → do nothing at all.
    if (order?.printful_order_id) {
      return { status: 'draft_created', printful_order_id: order.printful_order_id };
    }

    const items: OrderItem[] = Array.isArray(order?.items) ? order.items : [];
    if (!items.length) {
      return persistDraftResult(order, { status: 'error', detail: 'no_items' });
    }

    // An unmapped sync variant means Printful cannot fulfil this line, so no
    // order is created for it. Filling the id in src/config/printful-variants.ts
    // is what unblocks the row.
    const missing = missingVariantKeys(items.map((i) => ({ slug: i.slug, size: i.size })));
    if (missing.length) {
      return persistDraftResult(order, {
        status: 'needs_variant',
        detail: `missing_variant: ${missing.join(', ')}`,
      });
    }

    if (!PRINTFUL_API_KEY) {
      return persistDraftResult(order, { status: 'error', detail: 'printful_not_configured' });
    }

    const recipientName = (order.name || '').trim();
    const address1 = (order.ship_line1 || '').trim();
    const address2 = (order.ship_line2 || '').trim();
    const city = (order.ship_city || '').trim();
    const stateCode = (order.ship_state || '').trim();
    const zip = (order.ship_postal_code || '').trim();
    const countryCode = (order.ship_country || '').trim();
    if (!recipientName || !address1 || !city || !stateCode || !zip || !countryCode) {
      // Reason code only — the address itself never goes in status_detail.
      return persistDraftResult(order, { status: 'error', detail: 'incomplete_shipping_address' });
    }

    // sync_variant_id means the synced product carries its own print files, so
    // the order needs no files of its own.
    const lines: { sync_variant_id: number; quantity: number }[] = [];
    for (const item of items) {
      const syncVariantId = printfulVariantFor(item.slug, item.size);
      if (syncVariantId === null) {
        return persistDraftResult(order, {
          status: 'needs_variant',
          detail: `missing_variant: ${item.slug}:${item.size}`,
        });
      }
      const quantity = Number.isFinite(item.qty) ? Math.max(1, Math.floor(item.qty)) : 1;
      lines.push({ sync_variant_id: syncVariantId, quantity });
    }

    // 2. The short order number is the reference Printful and the owner both
    // see. Save it BEFORE calling Printful, so a crash can never leave a draft
    // in Printful under a number this row does not know about.
    let externalId = (order.printful_external_id || '').trim();
    if (!externalId) {
      externalId = shortOrderNumber(order.stripe_session_id);
      const numbered = await updateOrder(order.stripe_session_id, { printful_external_id: externalId });
      if ('error' in numbered) {
        return persistDraftResult(order, { status: 'error', detail: 'order_number_save_failed' });
      }
    }

    // 3. Did an earlier attempt already get through? @external_id looks the
    // order up by our own reference. 404 → it does not exist, go create it.
    const lookup = await fetch(`${PRINTFUL_API_URL}/orders/@${encodeURIComponent(externalId)}`, {
      method: 'GET',
      headers: orderHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(ORDER_TIMEOUT_MS),
    });

    if (lookup.ok) {
      const found = (await lookup.json().catch(() => null)) as { result?: { id?: number | string } } | null;
      const foundId = found?.result?.id;
      if (foundId !== undefined && foundId !== null && String(foundId).length > 0) {
        console.warn(`[printful] adopting the draft Printful already has for order ${externalId}`);
        return persistDraftResult(order, { status: 'draft_created', printful_order_id: String(foundId) });
      }
      return persistDraftResult(order, { status: 'error', detail: 'printful_lookup_no_id' });
    }
    if (lookup.status !== 404) {
      const detail = await printfulErrorDetail(lookup);
      console.error(`[printful] lookup for order ${externalId} failed (${lookup.status})`);
      return persistDraftResult(order, {
        status: 'error',
        detail: `printful_lookup_http_${lookup.status}${detail}`,
      });
    }

    const recipient: Record<string, string> = {
      name: recipientName,
      address1,
      city,
      state_code: stateCode,
      country_code: countryCode,
      zip,
    };
    if (address2) recipient.address2 = address2;
    const phone = (order.phone || '').trim();
    if (phone) recipient.phone = phone;
    const email = (order.email || '').trim();
    if (email) recipient.email = email;

    // DRAFTS ONLY: no query string on this URL and no `confirm` field in this
    // body, so Printful stores the order as a draft. The owner confirms and
    // pays for it in the Printful dashboard — never from code.
    const res = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: orderHeaders(),
      body: JSON.stringify({ external_id: externalId, recipient, items: lines }),
      cache: 'no-store',
      signal: AbortSignal.timeout(ORDER_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await printfulErrorDetail(res);
      console.error(`[printful] draft order ${externalId} rejected (${res.status})`);
      return persistDraftResult(order, { status: 'error', detail: `printful_http_${res.status}${detail}` });
    }

    const created = (await res.json().catch(() => null)) as { result?: { id?: number | string } } | null;
    const createdId = created?.result?.id;
    if (createdId === undefined || createdId === null || String(createdId).length === 0) {
      console.error(`[printful] draft order ${externalId} returned no id`);
      return persistDraftResult(order, { status: 'error', detail: 'printful_create_no_id' });
    }

    return persistDraftResult(order, { status: 'draft_created', printful_order_id: String(createdId) });
  } catch {
    // Network error, timeout, unparseable body — recorded, never thrown. The
    // error text is deliberately not included: it can carry the request URL
    // and other noise, and the owner only needs to know it did not go through.
    console.error('[printful] draft order attempt failed (request error)');
    try {
      return await persistDraftResult(order, { status: 'error', detail: 'printful_request_failed' });
    } catch {
      return { status: 'error', detail: 'printful_request_failed' };
    }
  }
}
