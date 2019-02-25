var Cooperation = require('../../models/cooperation');
var Footerinfo = require('../../models/footerinfo');
var _ = require('underscore');

exports.footer = function(req, res){
  var _footerinfo = {}
  Cooperation
  	.find({})
  	.exec(function(err, cooperation){
  Footerinfo
    .find({})
    .exec(function(err, footerinfo){
      if (err) {
          console.log(err);
      };


      if (footerinfo.length > 0) {
          _footerinfo = footerinfo[0]
      }

      res.render('admin/footerList', {
        title: '底部信息',
        cooperation: cooperation,
        footerinfo: _footerinfo
      });
    })

    })
}

exports.new = function(req, res){
    res.render('admin/footerForm', {
      title: '新增',
      footerinfo: {}
    })
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
      Footerinfo
        .findOne({_id: id})
        .exec(function(err, footerinfo){
          res.render('admin/footerForm', {
            title: '更新',
            footerinfo: footerinfo
          })
        })
    }
};

exports.save = function(req, res){
    var id = req.body.footerinfo._id;
    var footerinfoObj = req.body.footerinfo;
    var _footerinfo;

    if (id) {
        Footerinfo.findById(id, function(err, footerinfo) {
            if (err) {
                console.log(err);
            };

            _footerinfo = _.extend(footerinfo, footerinfoObj);
            _footerinfo.save(function(err, footerinfo){
                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/footer/view');
            });
        });
    }
    else{
        _footerinfo = new Footerinfo(footerinfoObj);

        _footerinfo.save(function(err, footerinfo){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/footer/view')
        });
    }
};

exports.cooperationNew = function(req, res){
  res.render('admin/cooperationForm', {
    title: '新增合作客户',
    cooperation: {}
  })
};

exports.cooperationSave = function(req, res){
	var id = req.body.cooperation._id;
  var cooperationObj = req.body.cooperation;
  var _cooperation

  if (id) {
      Cooperation.findById(id, function(err, cooperation) {
          if (err) {
              console.log(err);
          };

          _cooperation = _.extend(cooperation, cooperationObj);
          _cooperation.save(function(err, cooperation){


              if (err) {
                  console.log(err);
              };

              res.redirect('/admin/footer/view');
          });
      });
  }
  else{
      _cooperation = new Cooperation(cooperationObj);

      _cooperation.save(function(err, cooperation){
          
          if (err) {
              console.log(err)
          };

          res.redirect('/admin/footer/view')
      });
  }

}

exports.cooperationUpdate = function(req, res){
	var id = req.params.id;

    if (id) {
        Cooperation
          .findOne({_id: id})
          .exec(function(err, cooperation){
            res.render('admin/cooperationForm', {
              title: '更新合作客户 ' + cooperation.title,
              cooperation: cooperation
            })
          })
    }
}

exports.cooperationDel = function(req, res){
	var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Cooperation.remove({ _id: { $in: delList } }, function(err, cooperation){
        	if (err) {
                console.log(err)
            }else{
                res.json({success: 1});
            }            
        });
    }
}