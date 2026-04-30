import { fetchProduct } from './api.js';

const productDetail = document.querySelector('#product-detail');
const loadingState = document.querySelector('#loading');
const errorMessage = document.querySelector('#error-message');
const successMessage = document.querySelector('#success-message');
const cartCount = document.querySelector('#cart-count');
const productImage = document.querySelector('#product-image');
const productCategory = document.querySelector('#product-category');
const productTitle = document.querySelector('#product-title');
const productPrice = document.querySelector('#product-price');
const productRating = document.querySelector('#product-rating');
const productDescription = document.querySelector('#product-description');
const productStock = document.querySelector('#product-stock');
const productBrand = document.querySelector('#product-brand');
const productDiscount = document.querySelector('#product-discount');
const addToCartBtn = document.querySelector('#add-to-cart-btn');

let currentProduct = null;

window.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadProduct();
    addToCartBtn.addEventListener('click', addToCart);
});

async function loadProduct() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) {
        showError('Missing product identifier.');
        loadingState.classList.add('hidden');
        return;
    }

    try {
        currentProduct = await fetchProduct(productId);
        renderProduct(currentProduct);
    } catch (error) {
        showError(error.message);
    } finally {
        loadingState.classList.add('hidden');
    }
}

function renderProduct(product) {
    productImage.src = product.thumbnail;
    productImage.alt = product.title;
    productCategory.textContent = product.category;
    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productRating.textContent = `⭐ ${product.rating.toFixed(1)}`;
    productDescription.textContent = product.description;
    productStock.textContent = `${product.stock} available`;
    productBrand.textContent = product.brand;
    productDiscount.textContent = `${product.discountPercentage}% off`;

    productDetail.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 2600);
}

function getCart() {
    return JSON.parse(localStorage.getItem('minimal-shop-cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('minimal-shop-cart', JSON.stringify(cart));
}

function addToCart() {
    if (!currentProduct) {
        showError('Product data unavailable.');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: currentProduct.id,
            title: currentProduct.title,
            price: currentProduct.price,
            quantity: 1,
            thumbnail: currentProduct.thumbnail
        });
    }

    saveCart(cart);
    updateCartCount();
    showSuccess('Added to cart successfully.');
}

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}
