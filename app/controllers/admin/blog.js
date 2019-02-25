var _ = require('underscore');
var Blog = require('../../models/blog');
var CategoryBlog = require('../../models/categoryblog');

exports.new = function(req, res){
  CategoryBlog
    .find({})
    .exec(function(err, category){
      res.render('admin/blogForm', {
        title: '添加Blog',
        blog: {},
        category: category
      })
    })
};

exports.list = function(req, res){
  Blog
      .find({})
      .populate('category', 'name')
      .sort('meta.createAt')
      .exec(function(err, blog){
          if (err) {
              console.log(err);
          };

          res.render('admin/blogList', {
              title: 'Blog List',
              blog: blog
          });
      })
};

exports.del = function(req, res){
  var delList = (req.body.delList).split(',');
  
  if (delList.length > 0) {
    Blog.remove({ _id: { $in: delList } }, function(err, blog){
      CategoryBlog
                .find({})
                .exec(function(err, category){
                    for (var i = 0; i < category.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = category[i].blog.indexOf(delList[j]);
                           if (index > -1) {
                                category[i].blog.splice(index, 1);
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

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
        Blog
          .findOne({_id: id})
          .populate('category', 'name')
          .exec(function(err, blog){
            CategoryBlog
              .find({})
              .exec(function(err, category){
                res.render('admin/blogForm', {
                  title: '更新Blog-' + blog.title,
                  blog: blog,
                  category: category
                })
              })
          })
    }
};


exports.save = function(req, res){
    var id = req.body.blog._id;
    var blogObj = req.body.blog;
    var _category = blogObj.category;
    var _blog;

    if (id) {
        Blog.findById(id, function(err, blog) {
            if (err) {
                console.log(err);
            };

            _blog = _.extend(blog, blogObj);
            _blog.save(function(err, blog){
              var beforeSave = function(id){
                    var promise = new Promise(function(resolve, reject){
                        function handle(err, category){
                            if(err){
                                reject(err);
                            }else{
                                resolve(category)
                            }
                        }

                        CategoryBlog
                            .find({})
                            .exec(function(err, category){
                                for (var i = 0; i < category.length; i++) {
                                   var index = category[i].blog.indexOf(id);
                                   if (index > -1) {
                                        category[i].blog.splice(index, 1);
                                   }
                                   category[i].save(handle);
                                }
                            })
                    })
                    return promise;
                }
                

                beforeSave(id).then(function(category){
                    if (typeof _category == 'string') {
                        CategoryBlog
                            .findOne({_id: _category})
                            .exec(function(err, category){
                                category.blog.push(blog._id)

                                category.save()
                            })
                    }else{
                        for (var i = 0; i < _category.length; i++) {
                            
                            CategoryBlog
                                .findOne({_id: _category[i]})
                                .exec(function(err, category){
                                    category.blog.push(blog._id)
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

                res.redirect('/admin/blog/list');
            });
        });
    }
    else{
        _blog = new Blog(blogObj);

        _blog.save(function(err, blog){
            if (typeof _category == 'string') {
                CategoryBlog
                    .findOne({_id: _category})
                    .exec(function(err, category){
                        category.blog.push(blog._id)

                        category.save()
                    })
            }else{
                for (var i = 0; i < _category.length; i++) {
                    
                    CategoryBlog
                        .findOne({_id: _category[i]})
                        .exec(function(err, category){
                            category.blog.push(blog._id)
                            category.save()
                        })
                }
            }
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/blog/list')
        });
    }
};

exports.category = function(req, res){
    var categoryObj = req.body.category;
    var _category;

    _category = new CategoryBlog(categoryObj);

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

exports.categoryList = function(req, res){
    CategoryBlog
        .find({})
        .populate('blog', 'title')
        .sort('meta.createAt')
        .exec(function(err, category){
            if (err) {
                console.log(err);
            };

            res.render('admin/blogCategoryList', {
                title: 'Blog标签列表',
                category: category
            })
        })
}

exports.categoryDel = function(req, res){
  var delList = (req.body.delList).split(',');
    
    if (delList.length > 0) {
        CategoryBlog.remove({ _id: { $in: delList } }, function(err, category){
            Blog
                .find({})
                .exec(function(err, blog){
                    for (var i = 0; i < blog.length; i++) {
                        for (var j = 0; j < delList.length; j++) {
                           var index = blog[i].category.indexOf(delList[j]);
                           if (index > -1) {
                                blog[i].category.splice(index, 1);
                                blog[i].save()
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