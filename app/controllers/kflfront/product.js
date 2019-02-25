var Product = require('../../models/product');

exports.index = function(req, res, next){
	var footer = req.footer;
	var side = req.side;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 6;
	var index = page * count;

	Product
		.find({})
		.populate('category', 'name')
		.sort('meta.createAt')
		.exec(function(err, product){

			var results = product.slice(index, index + count);

			res.render('front/product', {
				title: '产品展示',
				type: 'product',
				footer: footer,
				side: side,
				product: results,
				currentPage: page,
				totalPage: Math.ceil(product.length / count)
			})
		})
}

exports.detail = function(req, res, next){
	var footer = req.footer;
	var side = req.side;
	var id = req.params.id;

	if (id) {
		Product
			.findOne({_id: id})
			.exec(function(err, product){

				if (product) {
					res.render('front/productDetail', {
						title: product.name,
						product : product,
						footer: footer,
						side: side,
						type: 'product'
					})
				}else{
					res.render('error', {
						error: {
							status: 404
						}
					})
				}
			})
	}
}