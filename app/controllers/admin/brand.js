var _ = require('underscore');
var Brand = require('../../models/brand');
var path = require('path');

//addStar
exports.new = function(req, res){
  res.render('admin/brandForm', {
    title: '新增Brand Story',
    brand: {}
  })
};

exports.view = function(req, res){
    var _brand = {}
    Brand
        .find({})
        .exec(function(err, brand){
            if (err) {
                console.log(err);
            };

            if (brand.length > 0) {
                _brand = brand[0]
            }

            res.render('admin/brandList', {
                title: 'Brand Story',
                brand: _brand
            });
        })
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
      Brand
	      .findOne({_id: id})
	      .exec(function(err, brand){
	        res.render('admin/brandForm', {
	          title: '更新Brand Story',
	          brand: brand
	        })
	      })
    }
};

exports.save = function(req, res){
    var id = req.body.brand._id;
    var brandObj = req.body.brand;
    var _brand;

    if (id) {
        Brand.findById(id, function(err, brand) {
            if (err) {
                console.log(err);
            };

            _brand = _.extend(brand, brandObj);
            _brand.save(function(err, brand){
                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/brand/view');
            });
        });
    }
    else{
        _brand = new Brand(brandObj);

        _brand.save(function(err, brand){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/brand/view')
        });
    }
};