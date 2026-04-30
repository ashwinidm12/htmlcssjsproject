const API_BASE = 'https://dummyjson.com';

export async function fetchProducts(limit = 24) {
    const response = await fetch(`${API_BASE}/products?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Unable to load product list.');
    }
    const data = await response.json();
    return data.products;
}

export async function fetchProduct(productId) {
    const response = await fetch(`${API_BASE}/products/${productId}`);
    if (!response.ok) {
        throw new Error('Unable to load product details.');
    }
    return response.json();
}
