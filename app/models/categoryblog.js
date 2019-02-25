var mongoose = require('mongoose');
var CategoryBlogSchema = require('../schemas/categoryblog');
var CategoryBlog = mongoose.model('CategoryBlog', CategoryBlogSchema);

module.exports = CategoryBlog;