export type CategoryType = 
  | 'all'
  | 'dresses'
  | 'coords'
  | 'tops'
  | 'outerwear'
  | 'trending';

export type Currency = 'ETB' | 'USD';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  priceETB: number;
  priceUSD: number;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  colors: ProductColor[];
  badge?: string; // e.g. "Only 2 Left", "New Drop", "Bestseller", "Atelier Exclusive"
  images: [string, string]; // [primary, hover]
  description: string;
  fabric: string;
  care: string;
  modelInfo: string;
  inStock: boolean;
  stockCount?: number;
  isTrending?: boolean;
}

export interface CartItem {
  id: string; // unique item cart id: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
