import { Product } from '../types';
import { AddToCartButton } from '@/src/features/add-to-cart/ui/AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="mb-3 h-48 w-full rounded object-cover"
      />

      <h3 className="font-semibold">{product.title}</h3>

      <p className="mt-1 text-sm text-gray-500">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">
          ${product.price}
        </span>

        {product.inStock && (
          <AddToCartButton product={product} />
        )}
      </div>
    </div>
  );
}
