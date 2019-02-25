var _ = require('underscore');
var Product = require('../../models/product');
var CategoryProduct = require('../../models/categoryproduct');
var Blog = require('../../models/blog');

exports.footer = function(req, res, next) {

    Product
        .find({})
        .limit(5)
        .sort({'weight': -1})
        .exec(function(err, product) {
    CategoryProduct
        .find({})
        .sort('meta.updateAt')
        .exec(function(err, categoryproduct) {
    Blog
        .find({})
        .limit(6)
        .sort('meta.updateAt')
        .exec(function(err, blog){

            var footer = {
                product: product,
                categoryproduct: categoryproduct,
                blog: blog
            }

            req.footer = footer;

            next();
        })
        })
        })
};