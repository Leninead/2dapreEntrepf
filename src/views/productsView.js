// // Mock code for productsView.js

// // Assume you have a container to display products
// const productsList = document.getElementById('products-list');

// // Function to display products
// function displayProducts(products) {
//   productsList.innerHTML = '';  // Clear the container

//   if (!products || products.length === 0) {
//     productsList.innerHTML = '<p>No products available</p>';
//     return;
//   }

//   products.forEach((product) => {
//     // Display each product
//     const productItem = document.createElement('li');
//     productItem.innerText = `Product: ${product.name}, Category: ${product.category}, Price: ${product.price}, Stock: ${product.stock}`;
//     productsList.appendChild(productItem);
//   });
// }

// // Assume you have a function to fetch product data from the backend
// function fetchProductData() {
//   fetch('/api/products')
//     .then(response => response.json())
//     .then(data => {
//       if (data.status === 'success') {
//         displayProducts(data.payload);
//       } else {
//         console.error('Error fetching products:', data.message);
//       }
//     })
//     .catch(error => console.error('Error fetching products:', error));
// }

// // Call the function to fetch and display product data
// fetchProductData();
