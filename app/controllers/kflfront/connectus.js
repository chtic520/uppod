var Connectus = require('../../models/connectus');

exports.sideConnectus = function(req, res, next){
	var _connectus = {};

	Connectus
		.find({})
		.exec(function(err, connectus){
			if (err) {
				console.log(err)
			}

			if (connectus.length > 0) {
				_connectus = connectus[0];
			}

			req.side = _connectus;

			next();
		})
}

exports.index = function(req, res, next){
	var _connectus = {};
	var footer = req.footer;

	Connectus
		.find({})
		.exec(function(err, connectus){
			if (err) {
				console.log(err);
			}

			if (connectus.length > 0) {
				_connectus = connectus[0];
			}

			res.render('front/connectus', {
				title: '联系我们',
				type: 'connectus',
				footer: footer,
				connectus: _connectus
			})
		})
}