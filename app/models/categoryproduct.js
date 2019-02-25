var mongoose = require('mongoose');
var CategoryProductSchema = require('../schemas/categoryproduct');
var CategoryProduct = mongoose.model('CategoryProduct', CategoryProductSchema);

module.exports = CategoryProduct;