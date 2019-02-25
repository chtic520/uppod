var Recruit = require('../../models/recruit');

exports.index = function(req, res, next){
	var footer = req.footer;
	var side = req.side;

	Recruit
		.find({})
		.sort('meta.updateAt')
		.exec(function(err, recruit){
			res.render('front/recruit', {
				title: '产品展示',
				type: 'recruit',
				footer: footer,
				side: side,
				recruit: recruit
			})
		})
}