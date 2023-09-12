// Sample cart data (replace with your actual cart data)
const cartData = [
    {
        productId: 'product1',
        productName: 'Sample Product 1',
        price: 100,
        quantity: 2,
    },
    {
        productId: 'product2',
        productName: 'Sample Product 2',
        price: 50,
        quantity: 1,
    },
];

// Function to render the cart content
function renderCart() {
    const cartContent = document.getElementById('cart-content');

    // Clear the existing cart content
    cartContent.innerHTML = '';

    // Loop through the cart data and create cart items
    cartData.forEach((product) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <h2>${product.productName}</h2>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button onclick="removeFromCart('${product.productId}')">Remove</button>
        `;

        cartContent.appendChild(cartItem);
    });
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    // Implement logic to remove the product from the cart
    // You can use JavaScript to update the cartData array and call renderCart() to refresh the cart view
}

// Call renderCart() to initially render the cart content
renderCart();
