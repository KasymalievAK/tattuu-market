const dates_adjva = 1;
const fig = 2;
const walnuts = 3;
const honey = 4;
const peanut = 5;
const dates_medjul = 6;

let cart_dates_adjva = 0;
let cart_fig = 0;
let cart_walnuts = 0;
let cart_honey = 0;
let cart_peanut = 0;
let cart_dates_medjul = 0;

let cart_by_items = {
    1: cart_dates_adjva,
    2: cart_fig
}

let all = JSON.parse(sessionStorage.getItem('cart')) || {};
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(all)); // Save cart to sessionStorage
}

function addToCart(productId) {
    if (!all[productId]) {
        all[productId] = 0;
    }
    all[productId]++;
    saveCart()
    console.log(all)

    if (all[productId] > 0) {
        document.getElementById('cart').style.background = 'red';
    }

    updateCartByItem(productId)
}

function removeFromCart(productId) {
    if (!all[productId]) {
        return
    }

    all[productId]--;
    saveCart();
    console.log(all);
    if (all[productId] === 0) {
        document.getElementById('cart').style.background = 'white';
    }

    updateCartByItem(productId)
}

function updateCartByItem(productId) {
    switch (productId) {
        case dates_adjva:
            document.getElementById('dates-adjva-cart').textContent = 'В корзине: ' + all[productId];break
        case fig:
            document.getElementById('fig-cart').textContent = 'В корзине: ' + all[productId];break
    }

}

function clearCart() {

}

function loadCart() {
    all = JSON.parse(sessionStorage.getItem('cart')) || {};
    if (Object.keys(all).length > 0) {
        document.getElementById('cart').style.background = 'red';
    }
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (Object.keys(all).length === 0) {
        cartContainer.innerHTML = "<p>Корзина пуста</p>";
        return;
    }

    Object.keys(all).forEach(productId => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p><strong>${productId}</strong>: ${all[productId]} шт.</p>
            <button onclick="changeQuantity('${productId}', 1)">+</button>
            <button onclick="changeQuantity('${productId}', -1)">-</button>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

window.onload = loadCart;
