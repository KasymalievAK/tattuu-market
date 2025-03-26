let price_by_items = {
    1: {price: 6000, name: "Финики Аджва"},
    2: {price: 400, name: "Инжир вяленный"},
    3: {price: 250, name: "Грецкий орех"},
    4: {price: 500, name: "Мёд"},
    5: {price: 250, name: "Арахис"},
    6: {price: 1500, name: "Финики Королевские Меджул "}
}

function loadCart() {
    let all = JSON.parse(sessionStorage.getItem('cart')) || {};
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (Object.keys(all).length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Корзина пуста</p>";
        return;
    }

    let products = {
        1: {name: "Финики Аджва", price: "6000 сом", img: "assets/finiki-adgva.jpg"},
        2: {name: "Инжир вяленный", price: "400 сом", img: "assets/injir.webp"},
        3: {name: "Грецкий орех", price: "250 сом", img: "assets/greckiy-oreh.jpg"},
        4: {name: "Мёд", price: "500 сом", img: "assets/med.jpeg"},
        5: {name: "Арахис (Жер жангак)", price: "250 сом", img: "assets/arahis.jpg"},
        6: {name: "Финики Королевские \"Меджул\"", price: "1500 сом", img: "assets/finiki-medjul.webp"}
    };

    Object.keys(all).forEach(productId => {
        if (!all[productId] || all[productId] === 0) {
            return;
        }
        products[productId];
        let item = products[productId];
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p><strong>${item.name}</strong></p>
                        <p>Цена: ${item.price}</p>
                        <p>Количество: ${all[productId]} шт.</p>
                    </div>
                    <div class="cart-item-buttons">
                        <button onclick="changeQuantity('${productId}', 1)">+</button>
                        <button onclick="changeQuantity('${productId}', -1)">-</button>
                    </div>
                `;
        cartContainer.appendChild(itemDiv);
    });
}

function changeQuantity(productId, change) {
    let all = JSON.parse(sessionStorage.getItem('cart')) || {};
    if (!all[productId]) return;
    all[productId] += change;
    if (all[productId] <= 0) {
        delete all[productId];
    }
    sessionStorage.setItem('cart', JSON.stringify(all));
    loadCart();
}

(function (p, a, y, b, o, x) {
    o = p.createElement(a);
    x = p.getElementsByTagName(a)[0];
    o.async = 1;
    o.src = 'https://cdn.freedompay.kg/widget/pbwidget.js?' + 1 * new Date();
    x.parentNode.insertBefore(o, x);
})(document, 'script');

function pay() {
    let totalAmount = 0;
    const mapped = Object.entries(all).map(([key, value]) => {
        totalAmount = totalAmount + (price_by_items[key].price * value)
        return {
            count: value,
            name: price_by_items[key].name,
            tax_type: 3,
            price: price_by_items[key].price * value
        };
    });

    var data = {
        token: "v7W2AmRlQhtEmqUVgBcO1ym7FeLMOUgC",
        payment: {
            order: String(getRandomInt(1, 100000)),
            amount: totalAmount,
            currency: "KGS",
            description: "Описание заказа",
            expires_at: "2020-12-12 00:00:00",
            param1: "string",
            param2: "string",
            param3: "string",
            test: 1,
            options: {
                callbacks: {
                    result_url: "https://my-domain.com/result",
                    check_url: "https://my-domain.com/check"
                },
                custom_params: {},
                user: {
                    phone: "+996559770379",
                },
                receipt_positions: mapped
            }
        },
        successCallback: function (payment) {
            console.log("Payment successful:", payment);
            document.getElementById('payment-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('payment-success').style.display = 'none';
            }, 10000); // Hide after 5 seconds
        },
        errorCallback: function (payment) {

        }
    }

    var widget = new PayBox(data);
    widget.create();
}

function clearCart() {
    all = initial_cart_by_items_state;
    sessionStorage.setItem('cart', JSON.stringify(all));
    loadCart()
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = loadCart;