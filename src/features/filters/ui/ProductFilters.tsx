'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
      params.set('page', '1');
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4">
      <select
        className="rounded border px-3 py-2 text-sm"
        value={searchParams.get('category') || ''}
        onChange={(e) =>
          updateParam('category', e.target.value || null)
        }
      >
        <option value="">All categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      <input
        type="number"
        placeholder="Min price"
        className="w-32 rounded border px-3 py-2 text-sm"
        onBlur={(e) =>
          updateParam('minPrice', e.target.value || null)
        }
        defaultValue={searchParams.get('minPrice') || ''}
      />

      <input
        type="number"
        placeholder="Max price"
        className="w-32 rounded border px-3 py-2 text-sm"
        onBlur={(e) =>
          updateParam('maxPrice', e.target.value || null)
        }
        defaultValue={searchParams.get('maxPrice') || ''}
      />
    </div>
  );
}
