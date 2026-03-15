// ──────────────────────────────────────────────
// Printify API Types for Lootix
// ──────────────────────────────────────────────

// --- Image Upload ---

export interface PrintifyImageUpload {
  /** Filename for the uploaded image */
  file_name: string;
  /** Public URL of the image to upload */
  url: string;
}

export interface PrintifyImage {
  id: string;
  file_name: string;
  height: number;
  width: number;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_time: string;
}

// --- Catalog ---

export interface PrintifyBlueprint {
  id: number;
  title: string;
  description: string;
  brand: string;
  model: string;
  images: string[];
}

export interface PrintifyPrintProvider {
  id: number;
  title: string;
  location: {
    address1: string;
    city: string;
    country: string;
    region: string;
    zip: string;
  };
}

export interface PrintifyVariant {
  id: number;
  title: string;
  options: Record<string, string>;
  placeholders: PrintifyPlaceholder[];
}

export interface PrintifyPlaceholder {
  position: 'front' | 'back' | 'left' | 'right' | 'neck_label';
  height: number;
  width: number;
}

// --- Product Creation ---

export interface PrintifyPlacementImage {
  id: string;
  x: number;
  y: number;
  scale: number;
  angle: number;
}

export interface PrintifyProductPlaceholder {
  position: 'front' | 'back' | 'left' | 'right' | 'neck_label';
  images: PrintifyPlacementImage[];
}

export interface PrintifyPrintArea {
  variant_ids: number[];
  placeholders: PrintifyProductPlaceholder[];
}

export interface PrintifyProductVariant {
  id: number;
  price: number;
  is_enabled: boolean;
}

export interface PrintifyCreateProductPayload {
  title: string;
  description?: string;
  blueprint_id: number;
  print_provider_id: number;
  variants: PrintifyProductVariant[];
  print_areas: PrintifyPrintArea[];
  tags?: string[];
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: Record<string, unknown>[];
  variants: PrintifyProductVariant[];
  images: { src: string; variant_ids: number[]; position: string; is_default: boolean }[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  print_provider_id: number;
  user_id: number;
  shop_id: number;
  print_areas: PrintifyPrintArea[];
  sales_channel_properties: unknown[];
}

// --- Publishing ---

export interface PrintifyPublishPayload {
  title: boolean;
  description: boolean;
  images: boolean;
  variants: boolean;
  tags: boolean;
}

// --- Orders ---

export interface PrintifyOrderLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

export interface PrintifyOrderAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface PrintifyCreateOrderPayload {
  external_id?: string;
  label?: string;
  line_items: PrintifyOrderLineItem[];
  shipping_method: number;
  send_shipping_notification?: boolean;
  address_to: PrintifyOrderAddress;
}

export interface PrintifyOrder {
  id: string;
  address_to: PrintifyOrderAddress;
  line_items: PrintifyOrderLineItem[];
  status: string;
  shipments: {
    carrier: string;
    number: string;
    url: string;
    delivered_at: string | null;
  }[];
  created_at: string;
  sent_to_production_at: string | null;
  fulfilled_at: string | null;
}

// --- Webhook ---

export interface PrintifyWebhookPayload {
  topic: string;
  resource: {
    id: string;
    type: string;
    data: Record<string, unknown>;
  };
}
