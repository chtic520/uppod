var _ = require('underscore');
var Video = require('../../models/video');
var util = require("util");
var fs = require('fs');
var path = require('path');

exports.uploadVideo = function(req, res){
    var file = req.files.file;
    var type = file.type.split('/')[1];

    if (type != "3gp" && type != "mp4" && type != "rmvb" && type != "mov" && type != "avi" && type != "m4v") {
      res.json({
          success: false,
          msg: "上传的文件类型错误!"
      });
    }

    fs.readFile(file.path, function (err, data) {
      if (err) {
          console.log(err);
      }
      var timestamp = Date.now();
      var type = file.type.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../../', '/public/video/' + poster);

      fs.writeFile(newPath, data, function (err) {
        if (err) {
            console.log(err);
        }

        res.json({
            success: true,
            path: '/video/' + poster
        });
      })
    })
}

exports.new = function(req, res){
    res.render('admin/videoForm', {
      title: '新增视频',
      video: {}
    })
};

exports.del = function(req, res){
  var delList = (req.body.delList).split(',');
  
  if (delList.length > 0) {
    Video.remove({ _id: { $in: delList } }, function(err, news){
      if (err) {
          console.log(err)
      }else{
          res.json({success: 1});
      }
    });
  }
};

exports.list = function(req, res){
    Video
        .find({})
        .exec(function(err, video){
            if (err) {
                console.log(err);
            };

            var onitems = 0;

            for(var i = 0; i < video.length; i++){
              video[i].displayindex && onitems++;
            }

            res.render('admin/videoList', {
                title: '视频管理',
                video: video,
                onitems: onitems
            });
        })
};

exports.update = function(req, res){
    var id = req.params.id;

    if (id) {
      Video
          .findOne({_id: id})
          .exec(function(err, video){
            res.render('admin/videoForm', {
              title: '更新视频',
              video: video
            })
          })
    }
};

exports.save = function(req, res){
    var id = req.body.video._id;
    var videoObj = req.body.video;
    var _video;

    if (id) {
        Video.findById(id, function(err, video) {
            if (err) {
                console.log(err);
            };

            _video = _.extend(video, videoObj);
            _video.save(function(err, video){
                if (err) {
                    console.log(err);
                };

                res.redirect('/admin/video/list');
            });
        });
    }
    else{
        _video = new Video(videoObj);

        _video.save(function(err, video){
            
            if (err) {
                console.log(err)
            };

            res.redirect('/admin/video/list')
        });
    }
};

exports.display = function(req, res){
    var id = req.body.id;
    var on = req.body.on;

    if (id) {
      Video.findById(id, function(err, video) {
        if (err) {
            console.log(err);
        };

        video.displayindex = on;
        video.save(function(err, video){
            if (err) {
                console.log(err);
            };

            res.json({success: 1});
        });
      });
    }

};