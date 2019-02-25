var Faq = require('../../models/faq');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	
	var result = {
		title: 'FAQ',
		type: 'faq',
		top: top,
		footer: footer
	}

	Faq
		.find({})
		.sort('meta.updateAt')
		.exec(function(err, faq){
			result.faq = faq;

			res.render('front/faq', result);
		})
};

