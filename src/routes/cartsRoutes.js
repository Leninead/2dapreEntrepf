const express = require('express');
const Carts = require ('../models/cart.model');

const router = express.Router();

// Get a cart by ID and populate its products with product details
router.get('/carts/:cid', async (req, res) => {
  try {
    console.log('Fetching cart with ID:', req.params.cid); // Log the cart ID being fetched
    const cart = await Carts.findById(req.params.cid).populate('products.productId');

    if (!cart) {
      console.log('Cart not found'); // Log that the cart was not found
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    console.log('Found cart:', cart); // Log the found cart
    return res.json({ status: 'success', cart });
  } catch (error) {
    console.error('Error fetching cart:', error); // Log the error
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


// DELETE /api/carts/:cid/products/:pid
router.delete('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    
    // Implement logic to remove the product with :pid from cart with :cid
    const updatedCart = await Carts.findByIdAndUpdate(
      cid,
      { $pull: { products: { productId: pid } } },
      { new: true }
    );
    
    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

// PUT /api/carts/:cid
router.put('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    // Implement logic to update the cart with :cid using the products array
    const updatedCart = await Carts.findByIdAndUpdate(cid, { products }, { new: true });

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put('/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    // Implement logic to update the quantity of the product with :pid in cart with :cid
    const updatedCart = await Carts.findOneAndUpdate(
      { _id: cid, 'products.productId': pid },
      { 'products.$.quantity': quantity },
      { new: true }
    );

    res.json({ status: 'success', data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

// DELETE /api/carts/:cid
router.delete('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;

    // Implement logic to clear all products from the cart with :cid
    await Carts.findByIdAndUpdate(cid, { products: [] });

    res.json({ status: 'success', message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

// POST /api/carts - Create a new cart
const mongoose = require('mongoose');

// Inside your route handler where you handle the POST request to create a new cart
router.post('/carts', async (req, res) => {
  try {
    // Generate a new ObjectId for userId
    const userId = new mongoose.Types.ObjectId();
    console.log('Generated userId:', userId); // Log generated userId

    // Use the generated userId in your cart creation logic
    const cart = new Carts({
      userId,
      products: req.body.products // Assuming req.body.products contains the product details
    });

    console.log('Creating cart:', cart); // Log the cart being created

    // Save the cart to the database
    await cart.save();

    console.log('Cart saved successfully.'); // Log success message

    return res.json({ status: 'success', cart });
  } catch (error) {
    console.error('Error:', error); // Log the error
    return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

module.exports = router;
