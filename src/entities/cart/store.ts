import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './types';
import { Product } from '@/src/entities/product/types';

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter(
            (i) => i.product.id !== productId
          ),
        }),

      changeQuantity: (productId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity }
              : i
          ),
        }),

      clear: () => set({ items: [] }),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage',
    }
  )
);
