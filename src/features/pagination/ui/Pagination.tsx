'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  currentPage: number;
  totalItems: number;
  limit: number;
};

export function Pagination({
  currentPage,
  totalItems,
  limit,
}: Props) {
  const totalPages = Math.ceil(totalItems / limit);

  if (totalPages <= 1) return null;

  const queryClient = useQueryClient();

  useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: currentPage + 1 }],
    queryFn: () =>
      getProducts({ page: currentPage + 1, limit }),
  });
}, [currentPage]);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={`/products?page=${currentPage - 1}`}
        className={`rounded px-3 py-1 text-sm ${
          currentPage === 1
            ? 'pointer-events-none text-gray-400'
            : 'border'
        }`}
      >
        Prev
      </Link>

      <span className="px-3 text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/products?page=${currentPage + 1}`}
        className={`rounded px-3 py-1 text-sm ${
          currentPage === totalPages
            ? 'pointer-events-none text-gray-400'
            : 'border'
        }`}
      >
        Next
      </Link>
    </div>
  );
}
