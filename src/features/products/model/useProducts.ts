import { useQuery } from '@tanstack/react-query';
import { getProducts, ProductsResponse } from '@/src/entities/product/api';

export function useProducts(params: Params) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => getProducts({ limit: 12, ...params }),
    keepPreviousData: true,
  });
}
