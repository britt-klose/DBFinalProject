
document.addEventListener('DOMContentLoaded', function() {
    // Example item data
    let products = [
        { id: 1, name: "Select Broccoli cheddar", price: 8.99 },
        { id: 2, name: "Distinctly Chicken Soup", price: 8.99 },
        { id: 3, name: "Query chowder", price: 8.89 },
        { id: 4, name: "Just bacon & Swiss ON rye", price: 12.19 },
        { id: 5, name: "GAN Club", price: 13.39 },
        { id: 6, name: "Overfit this panini", price: 12.19 },
        { id: 7, name: "Unique club", price: 8.39 },
        { id: 8, name: "Slopey joe", price: 10.19 },
        { id: 9, name: "Caesar Sesame Salad", price: 11.99 },
        { id: 10, name: "Stress Final Salad", price: 2500 },
        { id: 11, name: "Ascii bowl", price: 8.99 },
        { id: 12, name: "Diced Apples with Tuscan Apple Dressing", price: 11.99 },
        { id: 13, name: "Dimensional Chicken Salad", price: 13.49 },
        { id: 14, name: "Hidden Layer Cake", price: 8.9 },
        { id: 15, name: "Grayscale Cookie", price: 3.39 },
        { id: 16, name: "RBG Brownie", price: 3.89 },
        { id: 17, name: "Ascending Chocolate Macaroon", price: 1.99 },
        { id: 18, name: "Apple Strudel Version 8.0", price: 4.19 },
        { id: 19, name: "GPTea", price: 3.75 },
        { id: 20, name: "Latent Chai Spice", price: 6.25 },
        { id: 21, name: "Layered Latte", price: 6.5 },
        { id: 22, name: "Convolutional Cappuccino", price: 6.5 },
        { id: 23, name: "Softmax Macchiato", price: 6.5 },
        { id: 24, name: "Homebrew Coffee", price: 3.75 },
        { id: 25, name: "Filtered Coffee", price: 3.75 },
        { id: 26, name: "Max Pool Lemonade", price: 6.5 },
        { id: 27, name: "Softmax Macchiato", price: 5.5 },
        { id: 28, name: "MangoDB Iced Tea", price: 5.5 },
        { id: 29, name: "Install Cold Brew", price: 7.25 },
        { id: 30, name: "Coffee Forouraghi-ccino", price: 6.5 },
    ];

    const productDisplay = document.getElementById('productDisplay');
    const cartItems = document.getElementById('cartItems');

// 显示产品到DOM中
function displayProducts() {
    products.forEach(product => {
        let productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productDisplay.appendChild(productElement);
    });
}
// Shopping cart data
    let cart = [];

    // Handle adding products to the shopping cart
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const cartProduct = cart.find(p => p.id === productId);
        if(cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        displayCart();
    };

    // Update Shopping Cart Display
    function displayCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            let itemElement = document.createElement('li');
            itemElement.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 'decrease')">-</button>
                <button onclick="changeQuantity(${item.id}, 'increase')">+</button>
            `;
            cartItems.appendChild(itemElement);
        });
    }

    // Update the number of items in the shopping cart
    window.changeQuantity = function(productId, action) {
        const cartProduct = cart.find(p => p.id === productId);
        if(action === 'increase') {
            cartProduct.quantity += 1;
        } else if(action === 'decrease' && cartProduct.quantity > 1) {
            cartProduct.quantity -= 1;
        } else if(action === 'decrease' && cartProduct.quantity === 1) {
            cart = cart.filter(p => p.id !== productId);
        }
        displayCart();
    };

    // Initial Display Product
    displayProducts();
});
