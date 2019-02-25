var _ = require('underscore');
var SocialAccount = require('../../models/social-account');
var CategoryProduct = require('../../models/categoryproduct');

exports.top = function(req, res, next) {
    SocialAccount
        .find({})
        .sort('meta.createAt')
        .exec(function(err, social) {
    CategoryProduct
		.find({'displayindex': true})
		.populate('product', 'name pic')
		.sort('meta.updateAt')
		.exec(function(err, categoryproduct){
            req.top = {
            	categoryproduct: categoryproduct,
                social: social
            };

            next();
        })
		})
};