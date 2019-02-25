var _ = require('underscore');
var Recruit = require('../../models/recruit');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){
  res.render('admin/recruitForm', {
    title: '新增招聘',
    recruit: {}
  })
};

exports.list = function(req, res){
  Recruit
      .find({})
      .sort('meta.createAt')
      .exec(function(err, recruit){
          if (err) {
              console.log(err);
          };

          var onitems = 0;

          for(var i = 0; i < recruit.length; i++){
            recruit[i].displayindex && onitems++;
          }

          res.render('admin/recruitList', {
              title: '招聘列表',
              recruit: recruit,
              onitems: onitems
          });
      })
};

exports.del = function(req, res){
  var _id = req.body._id;
  
  if (_id) {
    Recruit.remove({_id: _id}, function(err){
      res.json({success: 1});
    })
  }else{
    res.json({success: 0});
  }
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        Recruit
          .findOne({_id: id})
          .exec(function(err, recruit){
            res.render('admin/recruitForm', {
              title: '更新招聘 ' + recruit.name,
              recruit: recruit
            })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Recruit.findById(id, function(err, recruit) {
        if (err) {
            console.log(err);
        };

        recruit.displayindex = on;
        recruit.save(function(err, recruit){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.recruit._id;
    var recruitObj = req.body.recruit;
    var _recruit;

    if (id) {
        Recruit.findById(id, function(err, recruit) {
            if (err) {
                console.log(err);
            };

            _recruit = _.extend(recruit, recruitObj);
            _recruit.save(function(err, recruit){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/recruit/list');
            });
        });
    }
    else{
        _recruit = new Recruit(recruitObj);

        _recruit.save(function(err, recruit){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/recruit/list')
        });
    }
};