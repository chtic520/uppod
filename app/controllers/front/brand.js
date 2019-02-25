var Brand = require('../../models/brand');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	
	var result = {
		title: 'Brand Story',
		type: 'brandstory',
		top: top,
		footer: footer
	}

	Brand
		.find({})
		.sort('meta.updateAt')
		.exec(function(err, brand){
			result.brand = brand.length > 0 ? brand[0] : {};

			res.render('front/brandStory', result);
		})
};

