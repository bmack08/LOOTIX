export interface PrintfulVariant {
  id: number;
  retail_price: number;
}

export interface PrintfulProduct {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  variants: PrintfulVariant[];
}

export interface PrintfulResponse<T> {
  code: number;
  result: T;
} 