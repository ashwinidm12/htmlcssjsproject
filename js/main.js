import { fetchProducts } from './api.js';

const productGrid = document.querySelector('#product-grid');
const loadingState = document.querySelector('#loading');
const errorMessage = document.querySelector('#error-message');
const cartCount = document.querySelector('#cart-count');

window.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadProducts();
});

async function loadProducts() {
    try {
        const products = await fetchProducts();
        renderProducts(products);
    } catch (error) {
        showError(error.message);
    } finally {
        loadingState.classList.add('hidden');
    }
}

function renderProducts(products) {
    if (!products?.length) {
        showError('No products available at the moment.');
        return;
    }

    productGrid.innerHTML = products.map(product => createCard(product)).join('');
}

function createCard(product) {
    return `
        <article class="product-card">
            <a href="product.html?id=${product.id}" aria-label="View ${product.title}">
                <div class="product-thumb">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="product-body">
                    <p class="product-title">${product.title}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">⭐ <span>${product.rating.toFixed(1)}</span></div>
                </div>
            </a>
        </article>
    `;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function getCart() {
    return JSON.parse(localStorage.getItem('minimal-shop-cart') || '[]');
}

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}
