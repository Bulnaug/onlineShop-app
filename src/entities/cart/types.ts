import { Product } from '@/src/entities/product/types';

export type CartItem = {
  product: Product;
  quantity: number;
};
