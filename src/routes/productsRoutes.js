const express = require('express');
const mongoosePaginate = require('mongoose-paginate-v2');
const Product = require('../models/product.model');
const router = express.Router();

// Add pagination plugin to the product schema
Product.schema.plugin(mongoosePaginate);

// Existing route to be modified
router.get('/products', async (req, res) => {
  try {
    let { limit, page, sort, query } = req.query;

    // Set default values if query parameters are not provided
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    sort = sort || '';
    query = query || '';

    // Define your query object based on the provided parameters
    const queryObject = {};

    if (query) {
      // If query parameter is provided, use it to filter by category or availability
      queryObject.category = query;
    }

    // Create options object for pagination and sorting
    const options = {
      page,
      limit,
      sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : undefined,
    };

    // Use mongoose-paginate-v2 to query products based on the queryObject and options
    const result = await Product.paginate(queryObject, options);

    // Prepare the response object
    const response = {
      status: 'success',
      payload: result.docs, // Products requested
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${req.baseUrl}?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: result.hasNextPage ? `${req.baseUrl}?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
    };

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
