var _ = require('underscore');
var News = require('../../models/news');
var fs = require('fs');
var path = require('path');

//addStar
exports.new = function(req, res){
  res.render('admin/newsForm', {
    title: '添加资讯',
    news: {}
  })
};

exports.list = function(req, res){
  News
      .find({})
      .sort('meta.createAt')
      .exec(function(err, news){
          if (err) {
              console.log(err);
          };

          var onitems = 0;

          for(var i = 0; i < news.length; i++){
            news[i].displayindex && onitems++;
          }

          res.render('admin/newsList', {
              title: '最新资讯',
              news: news,
              onitems: onitems
          });
      })
};

exports.del = function(req, res){
  var delList = (req.body.delList).split(',');
  
  if (delList.length > 0) {
    News.remove({ _id: { $in: delList } }, function(err, news){
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
        News
          .findOne({_id: id})
          .exec(function(err, news){
            res.render('admin/newsForm', {
              title: '更新资讯 ' + news.name,
              news: news
            })
          })
    }
};


exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      News.findById(id, function(err, news) {
        if (err) {
            console.log(err);
        };

        news.displayindex = on;
        news.save(function(err, news){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};

exports.save = function(req, res){
    var id = req.body.news._id;
    var newsObj = req.body.news;
    var _news;

    if (id) {
        News.findById(id, function(err, news) {
            if (err) {
                console.log(err);
            };

            _news = _.extend(news, newsObj);
            _news.save(function(err, news){

                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/news/list');
            });
        });
    }
    else{
        _news = new News(newsObj);

        _news.save(function(err, news){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/news/list')
        });
    }
};