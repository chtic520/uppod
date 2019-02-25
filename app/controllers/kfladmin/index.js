var Banner = require('../../models/banner');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

exports.layout = function(req, res, next) {
	res.render('admin/iframe', { title: '卡孚莱-后台管理' });
}

exports.index = function(req, res, next) {
	Banner
		.find({})
		.exec(function(err, banners){
			console.log(banners)
			if (err) {
        console.log(err);
      };

      var onitems = 0;

      for(var i = 0; i < banners.length; i++){
      	banners[i].displayindex && onitems++;
      };

			res.render('admin/index', {
				title: '后台首页',
				banners: banners,
				onitems: onitems
			});
		})
}

exports.upload = function(req, res){
    var file = req.files.file;

    fs.readFile(file.path, function (err, data) {
      if (err) {
          console.log(err);
      }
      var timestamp = Date.now();
      var type = file.type.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../../', '/public/images/upload/' + poster);

      fs.writeFile(newPath, data, function (err) {
        if (err) {
            res.json({
                success: 0,
                err: err,
                file: file
            });
        }else{
            res.json({
                success: 1,
                path: '/images/upload/' + poster
            });
        }

      })
    })
};

exports.uploadCK = function(req, res){
    var file = req.files.upload;
    var callback = req.query.CKEditorFuncNum;

    fs.readFile(file.path, function (err, data) {
      if (err) {
          console.log(err);
      }
      var timestamp = Date.now();
      var type = file.type.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../../', '/public/images/ckeditor/' + poster);

      fs.writeFile(newPath, data, function (err) {
        if (err) {
            console.log(err);
        }

        res.send("<script type=\"text/javascript\">window.parent.CKEDITOR.tools.callFunction(" + callback + ",'/images/ckeditor/" + poster + "',''" + ")</script>")
      })
    })
    // res.send("<script type=\"text/javascript\">window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + "/images/play.png" + "',''" + ")</script>")
    // res.send("<script type=\"text/javascript\">alert(111)</script>")
};

exports.bannerNew = function(req, res){
    res.render('admin/bannerForm', {
          title: '新增banner图',
          banner: {}
        })
};

exports.bannerSave = function(req, res){
	var id = req.body.banner._id;
    var bannerObj = req.body.banner;
    var _banner

    if (id) {
        Banner.findById(id, function(err, banner) {
            if (err) {
                console.log(err);
            };

            _banner = _.extend(banner, bannerObj);
            _banner.save(function(err, banner){


                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/index');
            });
        });
    }
    else{
        _banner = new Banner(bannerObj);

        _banner.save(function(err, banner){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/index')
        });
    }
}

exports.bannerUpdate = function(req, res){
	var id = req.params.id;

    if (id) {
        Banner
          .findOne({_id: id})
          .exec(function(err, banner){
            res.render('admin/bannerForm', {
              title: '更新banner图 ' + banner.title,
              banner: banner
            })
          })
    }
}

exports.bannerDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Banner.findById(id, function(err, banner) {
        if (err) {
            console.log(err);
        };

        banner.displayindex = on;
        banner.save(function(err, banner){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.bannerDel = function(req, res){
	var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Banner.remove({ _id: { $in: delList } }, function(err, banner){
        	if (err) {
                console.log(err)
            }else{
                res.json({success: 1});
            }            
        });
    }
}