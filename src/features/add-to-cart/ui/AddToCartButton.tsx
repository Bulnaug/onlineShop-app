'use client';

import { Product } from '@/src/entities/product/types';
import { useCartStore } from '@/src/entities/cart/store';

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="rounded bg-black px-3 py-1 text-sm text-white hover:bg-gray-800"
    >
      Add to cart
    </button>
  );
}
