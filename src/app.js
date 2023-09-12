/*
 Deberás entregar el proyecto que has venido armando, cambiando persistencia en base de datos, además de agregar algunos endpoints nuevos a tu ecommerce.   Profesionalizando la BD Objetivos generales

Contarás con Mongo como sistema de persistencia principal
Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

Objetivos específicos

Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.
Formato

Link al repositorio de Github, sin la carpeta de node_modules
Sugerencias

Permitir comentarios en el archivo
La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia. 
Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido. 
Se debe entregar

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
-limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
Se debe entregar

El método GET deberá devolver un objeto con el siguiente formato:
{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.
Se debe entregar

Además, agregar al router de carts los siguientes endpoints:
**DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
**PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
**PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
**DELETE api/carts/:cid deberá eliminar todos los productos del carrito 

Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
Se debe entregar

Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
*/

const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/productsRoutes');
const cartsRouter = require('./routes/cartsRoutes');
const path = require('path');

const app = express();
const port = 8080

// Middleware to parse JSON requests
app.use(express.json())


// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true })); 





// Add the script to populate products before connecting to MongoDB Atlas
const populateProducts = async () => {
  const Product = require('./models/product.model'); // Adjust the path as needed

  // Create some sample products
  const products = [
    {
      name: 'Product 1',
      category: 'Category 1',
      price: 10.99,
      stock: 100,
      image: 'product1.jpg'
    },
    {
      name: 'Product 2',
      category: 'Category 2',
      price: 15.99,
      stock: 50,
      image: 'product2.jpg'
    },
    {
      name: 'Product 3',
      category: 'Category 1',
      price: 12.49,
      stock: 75,
      image: 'product3.jpg'
    },
    {
      name: 'Product 4',
      category: 'Category 2',
      price: 18.99,
      stock: 60,
      image: 'product4.jpg'
    },
    {
      name: 'Product 5',
      category: 'Category 3',
      price: 9.99,
      stock: 120,
      image: 'product5.jpg'
    }
  ];

  try {
    await mongoose.connect('mongodb+srv://leninacosta1987:integratingproject@cluster0.oamkjpv.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Add products to the database
    await Product.insertMany(products);
    console.log('Sample products added to the database.');

  
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};

// Call the function to populate products
populateProducts();

app.use('/api', productsRouter);
app.use('/api', cartsRouter);

// Define routes for rendering views
app.get('/products', (req, res) => {
  // Render the products view (productsView.js)
  res.sendFile(path.join(__dirname, 'views', 'productsView.js'));
});

app.get('/carts/:cid', (req, res) => {
  // Render the cart view (cartsView.js)
  res.sendFile(path.join(__dirname, 'views', 'cartsView.js'));
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
  });
  