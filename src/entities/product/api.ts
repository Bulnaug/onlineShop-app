import { Product } from './types';

export type ProductsResponse = {
  items: Product[];
  total: number;
};

const PRODUCTS: Product[] = Array.from({ length: 48 }).map((_, i) => ({
  id: String(i + 1),
  title: `Product ${i + 1}`,
  description: 'High quality product for everyday use',
  price: Math.floor(Math.random() * 200) + 20,
  image: 'https://via.placeholder.com/300x300',
  category: i % 2 === 0 ? 'electronics' : 'clothing',
  inStock: i % 5 !== 0,
}));

type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getProducts({
  page = 1,
  limit = 12,
  search,
  category,
  minPrice,
  maxPrice,
}: GetProductsParams) {
  await new Promise((r) => setTimeout(r, 300));

  let filtered = [...PRODUCTS];

  if (search) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    items: filtered.slice(start, end),
    total,
  };
}
