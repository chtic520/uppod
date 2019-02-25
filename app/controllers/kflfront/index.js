var Product = require('../../models/product');
var Banner = require('../../models/banner');
var Strength = require('../../models/strength');
var News = require('../../models/news');
var Video = require('../../models/video');

exports.index = function(req, res, next){
	var footer = req.footer;
	
	var result = {
		title: '首页',
		type: 'index',
    	footer: footer
	}
	Banner
		.find({'displayindex': true})
		.sort('meta.updateAt')
		.exec(function(err, banner){
			result.banner = banner;
	Video
		.find({'displayindex': true})
		.sort('meta.updateAt')
		.exec(function(err, video){
			result.video = video;
	Product
		.find({'displayindex': true})
		.populate('category', 'name')
		.sort('meta.updateAt')
		.exec(function(err, product){
			result.product = product;
	Strength
		.find({'displayindex': true})
		.sort('meta.updateAt')
		.exec(function(err, strength){
			result.strength = strength;
	News
		.find({'displayindex': true})
		.sort('meta.updateAt')
		.exec(function(err, news){
			result.news = news;
			
			res.render('front/index', result);
		})
		})
		})
		})
		})
};

exports.video = function(req, res, next){
	var id = req.params.id;

	if (id) {
		Video
			.findOne({_id: id})
			.exec(function(err, video){

				if (video) {
					res.render('front/videoPlay', {
						video : video
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

