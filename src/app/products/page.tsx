'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/src/entities/product/ui/ProductCard';
import { Pagination } from '@/src/features/pagination/ui/Pagination';
import { SearchInput } from '@/src/features/search/ui/SearchInput';
import { ProductFilters } from '@/src/features/filters/ui/ProductFilters';
import { useProducts } from '@/src/features/products/model/useProducts';

const LIMIT = 12;

export default function ProductsPage() {
  const params = useSearchParams();

  const page = Number(params.get('page')) || 1;

  const { data, isLoading } = useProducts({
    page,
    search: params.get('search') || undefined,
    category: params.get('category') || undefined,
    minPrice: params.get('minPrice')
      ? Number(params.get('minPrice'))
      : undefined,
    maxPrice: params.get('maxPrice')
      ? Number(params.get('maxPrice'))
      : undefined,
  });

  if (isLoading || !data) {
    return (
      <main className="p-8">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput />
        <ProductFilters />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalItems={data.total}
        limit={LIMIT}
      />
    </main>
  );
}
