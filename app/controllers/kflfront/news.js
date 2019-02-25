var News = require('../../models/news');

exports.index = function(req, res){
	var footer = req.footer;
	var page = parseInt(req.query.page, 10) || 0;
	var count = 6;
	var index = page * count;

	News
		.find({})
		.sort('meta.createAt')
		.exec(function(err, news){
			if (err) {
				console.log(err);
			}

			var results = news.slice(index, index + count);

			res.render('front/news', {
				title: '最新咨询',
				type: 'news',
				footer: footer,
				news: results,
				currentPage: page,
				totalPage: Math.ceil(news.length / count)
			})
		})
}

exports.detail = function(req, res, next){
	var footer = req.footer;
	var side = req.side;
	var id = req.params.id;

	if (id) {
		News
			.findOne({_id: id})
			.exec(function(err, news){

				if (news) {
					res.render('front/newsDetail', {
						title: news.title,
						news : news,
						footer: footer,
						side: side,
						type: 'news'
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
