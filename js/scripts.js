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

let initial_cart_by_items_state = {
    1: cart_dates_adjva,
    2: cart_fig,
    3: cart_walnuts,
    4: cart_honey,
    5: cart_peanut,
    6: cart_dates_medjul
}

let all = JSON.parse(sessionStorage.getItem('cart')) || initial_cart_by_items_state;
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(all));
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
    if (all[productId] === 0) {
        document.getElementById('cart').style.background = 'white';
    }

    updateCartByItem(productId)
}

function updateCartByItem(productId) {
    switch (String(productId)) {
        case String(dates_adjva):
            document.getElementById('dates-adjva-cart').textContent = 'В корзине: ' + all[productId];
            break;
        case String(fig):
            document.getElementById('fig-cart').textContent = 'В корзине: ' + all[productId];
            break;
        case String(walnuts):
            document.getElementById('walnuts-cart').textContent = 'В корзине: ' + all[productId];
            break;
        case String(honey):
            document.getElementById('honey-cart').textContent = 'В корзине: ' + all[productId];
            break;
        case String(peanut):
            document.getElementById('peanut-cart').textContent = 'В корзине: ' + all[productId];
            break;
        case String(dates_medjul):
            document.getElementById('dates-medjul-cart').textContent = 'В корзине: ' + all[productId];
            break;
    }
}

function loadCart() {
    all = JSON.parse(sessionStorage.getItem('cart')) || {};
    if (Object.keys(all).length > 0) {
        document.getElementById('cart').style.background = 'red';
    }
    console.log(all)
    Object.keys(all).forEach(productId => {
        updateCartByItem(productId)
    });
}

window.onload = loadCart;
