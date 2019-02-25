var _ = require('underscore');
var Strength = require('../../models/strength');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){
  res.render('admin/strengthForm', {
    title: '新增实力',
    strength: {}
  })
};

exports.list = function(req, res){
  Strength
      .find({})
      .sort('meta.createAt')
      .exec(function(err, strength){
          if (err) {
              console.log(err);
          };

          var onitems = 0;

          for(var i = 0; i < strength.length; i++){
            strength[i].displayindex && onitems++;
          }

          res.render('admin/strengthList', {
              title: '实力列表',
              strength: strength,
              onitems: onitems
          });
      })
};

exports.del = function(req, res){
  var delList = (req.body.delList).split(',');
  
  if (delList.length > 0) {
    Strength.remove({ _id: { $in: delList } }, function(err, strength){
      if (err) {
          console.log(err)
      }else{
          res.json({success: 1});
      }
    });
  }
};
exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        Strength
          .findOne({_id: id})
          .exec(function(err, strength){
            res.render('admin/strengthForm', {
              title: '更新实力 ' + strength.name,
              strength: strength
            })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Strength.findById(id, function(err, strength) {
        if (err) {
            console.log(err);
        };

        strength.displayindex = on;
        strength.save(function(err, strength){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.strength._id;
    var strengthObj = req.body.strength;
    var _strength;

    if (id) {
        Strength.findById(id, function(err, strength) {
            if (err) {
                console.log(err);
            };

            _strength = _.extend(strength, strengthObj);
            _strength.save(function(err, strength){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/strength/list');
            });
        });
    }
    else{
        _strength = new Strength(strengthObj);

        _strength.save(function(err, strength){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/strength/list')
        });
    }
};