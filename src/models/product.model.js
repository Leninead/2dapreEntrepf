const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = "products";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    max: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: String,
});

// Add pagination plugin to the product schema
productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productCollection, productSchema);

module.exports = productsModel;

