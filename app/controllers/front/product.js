var Product = require('../../models/product');
var CategoryProduct = require('../../models/categoryproduct');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;
	
	var result = {
		title: 'SHOP',
		type: 'shop',
		baseUri: 'shop',
		top: top,
		footer: footer,
		currentPage: page
	}

	Product
		.find({})
		.populate('category', 'name')
		.sort('meta.updateAt')
		.exec(function(err, product){
			result.product = product.slice(index, index + count);
			result.totalPage = Math.ceil(product.length / count);

			res.render('front/product', result);
		})
};

exports.category = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;
	var id = req.params.id;

	var result = {
		top: top,
		footer: footer,
		currentPage: page
	}

	CategoryProduct
		.findOne({_id: id})
		.populate({
			path: 'product',
			select: '_id name price salePrice pic star isSale'
		})
		.exec(function(err, category){
			result.product = category.product.slice(index, index + count);
			result.totalPage = Math.ceil(category.product.length / count);
			result.type = category._id;
			result.categoryName = category.name;

			res.render('front/product', result);
		})
}

exports.detail = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	var id = req.params.id;

	var result = {
		title: 'SHOP',
		type: 'detail',
		baseUri: 'shop',
		top: top,
		footer: footer
	}

	Product
		.findOne({_id: id})
		.populate("category", "name")
		.exec(function(err, product){
			result.product = product;

			res.render('front/productDetail', result);
		})
}

