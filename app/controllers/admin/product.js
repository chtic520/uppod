var _ = require('underscore');
var Product = require('../../models/product');
var CategoryProduct = require('../../models/categoryproduct');
var fs = require('fs');
var path = require('path');

//addproduct
exports.new = function(req, res){

    CategoryProduct
        .find({})
        .exec(function(err, category){
        res.render('admin/productForm', {
              title: '新增产品',
              product: {},
              category: category
            })
        })
};

exports.list = function(req, res){
    Product
        .find({})
        .populate('category', 'name')
        .sort('meta.createAt')
        .exec(function(err, product){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < product.length; i++){
              product[i].displayindex && onitems++;
            }

            res.render('admin/productList', {
                title: '产品展示',
                product: product,
                onitems: onitems
            });
        })
};

exports.categoryList = function(req, res){
    CategoryProduct
        .find({})
        .populate('product', 'name')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/productCategoryList', {
                title: '产品标签列表',
                category: category
            })
        })
}

exports.del = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        Product.remove({ _id: { $in: delList } }, function(err, product){
            CategoryProduct
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].product.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].product.splice(index, 1);
                                category[i].save()
                           }
                        }
                        
                    }
                    if (err) {
                        console.log(err)
                    }else{
                        res.json({success: 1});
                    }
                })
            
        });
    }
};

exports.categoryDel = function(req, res){
    var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryProduct.remove({ _id: { $in: delList } }, function(err, category){
            Product
                .find({})
                .exec(function(err, product){
                    for (var i = 0; i < product.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = product[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                product[i].category.splice(index, 1);
                                product[i].save()
                           }
                        }
                        
                    }
                    if (err) {
                        console.log(err)
                    }else{
                        res.json({success: 1});
                    }
                })
            
        });
    }
}

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        Product
          .findOne({_id: id})
          .populate('category', 'name _id')
          .exec(function(err, product){
            CategoryProduct
              .find({})
              .exec(function(err, category){
                res.render('admin/productForm', {
                  title: '更新产品 ' + product.name,
                  product: product,
                  category: category
                })
              })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Product.findById(id, function(err, product) {
        if (err) {
            console.log(err);
        };

        product.displayindex = on;
        product.save(function(err, product){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.categoryDisplay = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      CategoryProduct.findById(id, function(err, category) {
        if (err) {
            console.log(err);
        };

        category.displayindex = on;
        category.save(function(err, category){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.sale = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Product.findById(id, function(err, product) {
        if (err) {
            console.log(err);
        };

        product.isSale = on;
        product.save(function(err, product){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.product._id;
    var productObj = req.body.product;
    var _category = productObj.category;
    var _product;

    console.log(productObj)

    if (id) {
        Product.findById(id, function(err, product) {
            if (err) {
                console.log(err);
            };

            _product = _.extend(product, productObj);
            _product.save(function(err, product){
                var beforeSave = function(id){
                    var promise = new Promise(function(resolve, reject){
                        function handle(err, category){
                            if(err){
                                reject(err);
                            }else{
                                resolve(category)
                            }
                        }

                        CategoryProduct
                            .find({})
                            .exec(function(err, category){
                                for (var i = 0; i < category.length; i++) {
                                   var index = category[i].product.indexOf(id);
                                   if (index > -1) {
                                        category[i].product.splice(index, 1);
                                   }
                                   category[i].save(handle);
                                }
                            })
                    })
                    return promise;
                }
                

                beforeSave(id).then(function(category){
                    if (typeof _category == 'string') {
                        CategoryProduct
                            .findOne({_id: _category})
                            .exec(function(err, category){
                                category.product.push(product._id)

                                category.save()
                            })
                    }else{
                        for (var i = 0; i < _category.length; i++) {
                            
                            CategoryProduct
                                .findOne({_id: _category[i]})
                                .exec(function(err, category){
                                    category.product.push(product._id)
                                    category.save()
                                })
                        }
                    }
                }, function(err){
                    console.log('出错了', err);
                })

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/product/list');
            });
        });
    }
    else{
        _product = new Product(productObj);

        _product.save(function(err, product){
            if (typeof _category == 'string') {
                CategoryProduct
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.product.push(product._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryProduct
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.product.push(product._id)
                            category.save()
                        })
                }
            }
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/product/list')
        });
    }
};



exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryProduct(categoryObj);

    _category.save(function(err, category){
        if (err) {
            console.log(err)
        };

        res.json({
          success: 1,
          category: category
        })
    });
};