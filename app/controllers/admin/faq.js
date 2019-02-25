var _ = require('underscore');
var Faq = require('../../models/faq');
var path = require('path');

//addStar
exports.new = function(req, res){
  res.render('admin/faqForm', {
    title: '新增FAQ',
    faq: {}
  })
};

exports.list = function(req, res){
  Faq
      .find({})
      .sort('meta.createAt')
      .exec(function(err, faq){
          if (err) {
              console.log(err);
          };

          res.render('admin/faqList', {
              title: 'FAQ列表',
              faq: faq
          });
      })
};

exports.del = function(req, res){
  var _id = req.body._id;
  
  if (_id) {
    Faq.remove({_id: _id}, function(err){
      res.json({success: 1});
    })
  }else{
    res.json({success: 0});
  }
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        Faq
          .findOne({_id: id})
          .exec(function(err, faq){
            res.render('admin/faqForm', {
              title: '更新FAQ ' + faq.name,
              faq: faq
            })
          })
    }
};

exports.save = function(req, res){
    var id = req.body.faq._id;
    var faqObj = req.body.faq;
    var _faq;

    if (id) {
        Faq.findById(id, function(err, faq) {
            if (err) {
                console.log(err);
            };

            _faq = _.extend(faq, faqObj);
            _faq.save(function(err, faq){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/faq/list');
            });
        });
    }
    else{
        _faq = new Faq(faqObj);

        _faq.save(function(err, faq){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/faq/list')
        });
    }
};