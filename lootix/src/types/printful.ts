export interface PrintfulFile {
  id: number;
  type: string;
  url: string;
  thumbnail_url: string;
  preview_url: string;
  filename: string;
}

export interface PrintfulVariant {
  id: number;
  name: string;
  size: string;
  color: string;
  price: string;
  retail_price: string;
  in_stock: boolean;
  files: PrintfulFile[];
}

export interface PrintfulSyncVariant extends PrintfulVariant {
  sync_product_id: number;
  sync_variant_id: number;
  retail_price: string;
  currency: string;
  is_enabled: boolean;
}

export interface PrintfulSyncProduct {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulProduct {
  id: number;
  name: string;
  description: string;
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
  thumbnail_url: string;
  is_discontinued: boolean;
}

export interface PrintfulResponse<T> {
  code: number;
  result: T;
  extra: any[];
} 