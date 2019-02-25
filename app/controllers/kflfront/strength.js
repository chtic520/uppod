var Strength = require('../../models/strength');

exports.index = function(req, res, next){
	var footer = req.footer;
	var side = req.side;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 6;
	var index = page * count;

	Strength
		.find({})
		.sort('meta.updateAt')
		.exec(function(err, strength){

			var results = strength.slice(index, index + count);

			res.render('front/strength', {
				title: '实力展示',
				type: 'strength',
				footer: footer,
				side: side,
				strength: results,
				currentPage: page,
				totalPage: Math.ceil(strength.length / count)
			})
		})
}

exports.detail = function(req, res, next){
	var footer = req.footer;
	var side = req.side;
	var id = req.params.id;

	if (id) {
		Strength
			.findOne({_id: id})
			.exec(function(err, strength){

				if (strength) {
					res.render('front/strengthDetail', {
						title: strength.title,
						strength : strength,
						footer: footer,
						side: side,
						type: 'strength'
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