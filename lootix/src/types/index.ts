export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: {
    url: string;
    preview_url: string;
  }[];
  variants: ProductVariant[];
  slug: string;
  currency: string;
  isDiscontinued: boolean;
} 