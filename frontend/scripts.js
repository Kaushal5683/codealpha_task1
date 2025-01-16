let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <span>${product.name} - $${product.price}</span>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Add product to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    alert(`${name} added to cart!`);
}

// Render cart items
function renderCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML 
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });
}

// Remove product from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Checkout function
async function checkout() {
    try {
        const response = await fetch('/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart })
        });
        const data = await response.json();
        alert(data.message);
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart');
        renderCart();
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}

// Initialize the product list on page load
document.addEventListener('DOMContentLoaded', fetchProducts);