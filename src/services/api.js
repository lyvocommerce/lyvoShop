console.log('API_BASE =', import.meta.env.VITE_API_BASE);

// В режиме разработки используем прокси, поэтому '/api'
const API_BASE = import.meta.env.VITE_API_BASE || '/api'; // в Vercel зададим VITE_API_BASE=/api

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('categories failed');
  return res.json();
}

export async function fetchProducts(params = {}) {
  const usp = new URLSearchParams();
  if (params.q) usp.set('q', params.q);
  if (params.sort) usp.set('sort', params.sort);
  if (params.category && params.category.length) {
    usp.set('category', params.category.join(','));
  }
  usp.set('page', String(params.page ?? 1));
  usp.set('page_size', String(params.page_size ?? 6));

  const res = await fetch(`${API_BASE}/products?` + usp.toString());
  if (!res.ok) throw new Error('products failed');
  return res.json();
}