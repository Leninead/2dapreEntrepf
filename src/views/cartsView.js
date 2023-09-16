// // // Sample cart data (replace with your actual cart data)
// // const cartData = [
// //     {
// //         productId: 'product1',
// //         productName: 'Sample Product 1',
// //         price: 100,
// //         quantity: 2,
// //     },
// //     {
// //         productId: 'product2',
// //         productName: 'Sample Product 2',
// //         price: 50,
// //         quantity: 1,
// //     },
// // ];

// // Mock code for cartsView.js

// // Assume you have a container to display cart items
// const cartContainer = document.getElementById('cart-container');

// // Function to display cart items
// function displayCartItems(cart) {
//   cartContainer.innerHTML = '';  // Clear the container

//   if (!cart || !cart.products) {
//     cartContainer.innerHTML = '<p>No items in the cart</p>';
//     return;
//   }

//   cart.products.forEach((product) => {
//     // Display each product in the cart
//     const productItem = document.createElement('div');
//     productItem.innerHTML = `<p>Product: ${product.productId.name}, Quantity: ${product.quantity}</p>`;
//     cartContainer.appendChild(productItem);
//   });
// }

// // Assume you have a function to fetch cart data from the backend
// function fetchCartData(cartId) {
//   fetch(`/api/carts/${cartId}`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.status === 'success') {
//         displayCartItems(data.cart);
//       } else {
//         console.error('Error fetching cart:', data.message);
//       }
//     })
//     .catch(error => console.error('Error fetching cart:', error));
// }

// // Call the function to fetch and display cart data
// const cartId = 'your-cart-id';  // Replace with the actual cart ID
// fetchCartData(cartId);
