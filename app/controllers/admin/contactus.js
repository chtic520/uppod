var _ = require('underscore');
var Contactus = require('../../models/contactus');
var fs = require('fs');
var path = require('path');

exports.new = function(req, res){
    res.render('admin/contactusForm', {
      title: '新增',
      contactus: {}
    })
};

exports.view = function(req, res){
    var _contactus = {}
    Contactus
        .find({})
        .exec(function(err, contactus){
            if (err) {
                console.log(err);
            };

            if (contactus.length > 0) {
                _contactus = contactus[0]
            }

            res.render('admin/contactus', {
                title: '联系我们',
                contactus: _contactus
            });
        })
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
      Contactus
	      .findOne({_id: id})
	      .exec(function(err, contactus){
	        res.render('admin/contactusForm', {
	          title: '更新',
	          contactus: contactus
	        })
	      })
    }
};

exports.save = function(req, res){
    var id = req.body.contactus._id;
    var contactusObj = req.body.contactus;
    var _contactus;
    console.log(contactusObj)

    if (id) {
        Contactus.findById(id, function(err, contactus) {
            if (err) {
                console.log(err);
            };

            _contactus = _.extend(contactus, contactusObj);
            _contactus.save(function(err, contactus){
                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/contactus/view');
            });
        });
    }
    else{
        _contactus = new Contactus(contactusObj);

        _contactus.save(function(err, contactus){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/contactus/view')
        });
    }
};

exports.map = function(req, res){
    res.render('admin/getPoint', {
      title: '拾取坐标'
    })
};