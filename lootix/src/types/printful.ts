export interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  retail_price: number;
  in_stock: boolean;
}

export interface PrintfulProduct {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  variants: PrintfulVariant[];
  files: {
    id: number;
    type: string;
    url: string;
    thumbnail_url: string;
    preview_url: string;
  }[];
  images: {
    id: number;
    type: string;
    url: string;
    thumbnail_url: string;
    preview_url: string;
  }[];
  sync_product: {
    id: number;
    name: string;
    thumbnail_url: string;
  };
  is_discontinued: boolean;
  currency: string;
}

export interface PrintfulResponse<T> {
  code: number;
  result: T;
  extra: any[];
} 