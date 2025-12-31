'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get('search') || '';
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
        params.set('page', '1');
      } else {
        params.delete('search');
      }

      router.push(`/products?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search products..."
      className="w-full rounded border px-3 py-2 text-sm"
    />
  );
}
