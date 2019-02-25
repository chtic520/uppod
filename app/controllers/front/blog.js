var Blog = require('../../models/blog');
var CategoryBlog = require('../../models/categoryblog');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 12;
	var index = page * count;
	
	var result = {
		title: 'Blog',
		type: 'blog',
		top: top,
		footer: footer,
		currentPage: page
	}

	Blog
		.find({})
		.populate('category', 'name')
		.sort('meta.updateAt')
		.exec(function(err, blog){
			result.blog = blog.slice(index, index + count);
			result.totalPage = Math.ceil(blog.length / count);

			res.render('front/blog', result);
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
		title: 'Blog',
		type: 'blogDetail',
		top: top,
		footer: footer
	}

	Blog
		.findOne({_id: id})
		.populate('category', 'name')
		.exec(function(err, blog){
			result.blog = blog;

			res.render('front/blogDetail', result);
		})
}

