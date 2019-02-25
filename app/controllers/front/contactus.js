var ContactUs = require('../../models/contactus');

exports.index = function(req, res, next){
	var top = req.top;
	var footer = req.footer;
	
	var result = {
		title: 'Contact Us',
		type: 'contactus',
		top: top,
		footer: footer
	}

	ContactUs
		.find({})
		.sort('meta.updateAt')
		.exec(function(err, contactus){
			result.contactus = contactus.length > 0 ? contactus[0] : {};

			res.render('front/contactus', result);
		})
};

