const cartItemsContainer = document.querySelector('#cart-items');
const cartEmpty = document.querySelector('#cart-empty');
const cartContent = document.querySelector('#cart-content');
const cartTotal = document.querySelector('#cart-total');
const cartCount = document.querySelector('#cart-count');
const checkoutBtn = document.querySelector('#checkout-btn');

window.addEventListener('DOMContentLoaded', () => {
    loadCartPage();
    cartItemsContainer.addEventListener('click', handleCartAction);
    checkoutBtn.addEventListener('click', handleCheckout);
});

function loadCartPage() {
    const cart = getCart();
    updateCartCount();

    if (!cart.length) {
        cartEmpty.classList.remove('hidden');
        cartContent.classList.add('hidden');
        return;
    }

    cartEmpty.classList.add('hidden');
    cartContent.classList.remove('hidden');
    renderCartItems(cart);
    updateCartTotal(cart);
}

function renderCartItems(cart) {
    cartItemsContainer.innerHTML = cart.map(item => `
        <article class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.thumbnail}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <div>
                    <p class="cart-item-title">${item.title}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-meta">
                    <div class="quantity-controller">
                        <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
                    </div>
                    <button type="button" class="remove-button" data-action="remove">Remove</button>
                </div>
            </div>
        </article>
    `).join('');
}

function handleCartAction(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    const itemElement = button.closest('.cart-item');
    const productId = Number(itemElement?.dataset.productId);
    if (!productId) return;

    if (action === 'increase') {
        updateQuantity(productId, 1);
    }

    if (action === 'decrease') {
        updateQuantity(productId, -1);
    }

    if (action === 'remove') {
        removeItem(productId);
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('minimal-shop-cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('minimal-shop-cart', JSON.stringify(cart));
}

function updateQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(entry => entry.id === productId);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    saveCart(cart);
    loadCartPage();
}

function removeItem(productId) {
    let cart = getCart();
    cart = cart.filter(entry => entry.id !== productId);
    saveCart(cart);
    loadCartPage();
}

function updateCartTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function handleCheckout() {
    alert('Checkout is not enabled in this demo.');
}
