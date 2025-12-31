'use client';

import { useCartStore } from '@/src/entities/cart/store';

export default function CartPage() {
  const { items, removeItem, changeQuantity, totalPrice } =
    useCartStore();

  if (items.length === 0) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-4 text-gray-500">Your cart is empty</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Cart</h1>

      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500">
                ${product.price}
              </p>
            </div>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                changeQuantity(
                  product.id,
                  Number(e.target.value)
                )
              }
              className="w-16 rounded border px-2 py-1"
            />

            <button
              onClick={() => removeItem(product.id)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right text-lg font-bold">
        Total: ${totalPrice()}
      </div>
    </main>
  );
}
