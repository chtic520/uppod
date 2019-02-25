var _ = require('underscore');
var Cooperation = require('../../models/cooperation');
var Footer = require('../../models/footerinfo');

exports.footer = function(req, res, next){
	Cooperation
		.find({})
		.sort('meta.createAt')
		.exec(function(err, cooperation){
	Footer
    .find({})
    .exec(function(err, footerinfo){
      if (err) {
          console.log(err);
      };

      var _footerinfo = {};


      if (footerinfo.length > 0) {
          _footerinfo = footerinfo[0];
      }

			var footer = {
				cooperation: cooperation,
				footerinfo: _footerinfo
			}

			req.footer = footer;
			
			next();
  })
	})
};