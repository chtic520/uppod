var Product = require('../../models/product');
var Banner = require('../../models/banner');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	
	var result = {
		title: 'HOME',
		type: 'index',
		top: top,
		footer: footer
	}
	Banner
		.find({'displayindex': true})
		.sort('meta.updateAt')
		.exec(function(err, banner){
			result.banner = banner;
	Product
		.find({'displayindex': true})
		.populate('category', 'name')
		.sort('meta.updateAt')
		.exec(function(err, product){
			result.product = product;

			res.render('front/index', result);
		})
		})
};

