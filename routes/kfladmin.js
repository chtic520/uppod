var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/admin/index');
var User = require('../app/controllers/admin/user');
var Product = require('../app/controllers/admin/product');
var News = require('../app/controllers/admin/news');
var Strength = require('../app/controllers/admin/strength');
var Recruit = require('../app/controllers/admin/recruit');
var ConnectUs = require('../app/controllers/admin/connectus');
var Footer = require('../app/controllers/admin/footer');
var Video = require('../app/controllers/admin/video');

/* Admin Index */
router.get('/', User.signinRequired, User.adminRequired, Index.layout);
router.get('/index', User.signinRequired, User.adminRequired, Index.index);
router.post('/header/updatep', User.signinRequired, User.adminRequired, User.hearderUpdatep);

/* Banner */
router.get('/banner/new', User.signinRequired, User.adminRequired, Index.bannerNew);
router.post('/banner/new', User.signinRequired, User.adminRequired, Index.bannerSave);
router.get('/banner/update/:id', User.signinRequired, User.adminRequired, Index.bannerUpdate);
router.post('/banner/display', User.signinRequired, User.adminRequired, Index.bannerDisplay);
router.delete('/banner/del', User.signinRequired, User.adminRequired, Index.bannerDel);

/* Upload */
router.post('/upload', User.signinRequired, User.adminRequired, Index.upload);
router.post('/ckeditor/upload', User.signinRequired, User.adminRequired, Index.uploadCK);

/* User */
router.get('/users/list', User.signinRequired, User.adminRequired, User.list);
router.delete('/users/del', User.signinRequired, User.adminRequired, User.del);
router.post('/users/updatep', User.signinRequired, User.adminRequired, User.updatep);
router.post('/users/updater', User.signinRequired, User.adminRequired, User.updater);
router.post('/users/new', User.signinRequired, User.adminRequired, User.save);
router.get('/users/new', User.signinRequired, User.adminRequired, User.new);
router.post('/users/role', User.signinRequired, User.adminRequired, User.adminRole);

/* Product */
router.get('/product/new', User.signinRequired, User.adminRequired, Product.new);
router.post('/product/new', User.signinRequired, User.adminRequired, Product.save);
router.get('/product/list', User.signinRequired, User.adminRequired, Product.list);
router.delete('/product/del', User.signinRequired, User.adminRequired, Product.del);
router.get('/product/update/:id', User.signinRequired, User.adminRequired, Product.update);
router.post('/product/display', User.signinRequired, User.adminRequired, Product.display);
router.post('/product/category', User.signinRequired, User.adminRequired, Product.category);
router.get('/product/category', User.signinRequired, User.adminRequired, Product.categoryList);
router.delete('/product/category', User.signinRequired, User.adminRequired, Product.categoryDel);

//News
router.get('/news/list', User.signinRequired, User.adminRequired, News.list);
router.delete('/news/del', User.signinRequired, User.adminRequired, News.del);
router.get('/news/update/:id', User.signinRequired, User.adminRequired, News.update);
router.post('/news/new', User.signinRequired, User.adminRequired, News.save);
router.get('/news/new', User.signinRequired, User.adminRequired, News.new);
router.post('/news/display', User.signinRequired, User.adminRequired, News.display);

//Strength
router.get('/strength/list', User.signinRequired, User.adminRequired, Strength.list);
router.delete('/strength/del', User.signinRequired, User.adminRequired, Strength.del);
router.get('/strength/update/:id', User.signinRequired, User.adminRequired, Strength.update);
router.post('/strength/new', User.signinRequired, User.adminRequired, Strength.save);
router.get('/strength/new', User.signinRequired, User.adminRequired, Strength.new);
router.post('/strength/display', User.signinRequired, User.adminRequired, Strength.display);

//Recruit
router.get('/recruit/list', User.signinRequired, User.adminRequired, Recruit.list);
router.delete('/recruit/del', User.signinRequired, User.adminRequired, Recruit.del);
router.get('/recruit/update/:id', User.signinRequired, User.adminRequired, Recruit.update);
router.post('/recruit/new', User.signinRequired, User.adminRequired, Recruit.save);
router.get('/recruit/new', User.signinRequired, User.adminRequired, Recruit.new);

//ConnectUs
router.get('/connectus/view', User.signinRequired, User.adminRequired, ConnectUs.view);
router.get('/connectus/new', User.signinRequired, User.adminRequired, ConnectUs.new);
router.post('/connectus/save', User.signinRequired, User.adminRequired, ConnectUs.save);
router.get('/connectus/update/:id', User.signinRequired, User.adminRequired, ConnectUs.update);
router.get('/map/point', User.signinRequired, User.adminRequired, ConnectUs.map);

//Video
router.get('/video/list', User.signinRequired, User.adminRequired, Video.list);
router.get('/video/new', User.signinRequired, User.adminRequired, Video.new);
router.post('/video/save', User.signinRequired, User.adminRequired, Video.save);
router.get('/video/update/:id', User.signinRequired, User.adminRequired, Video.update);
router.post('/video/display', User.signinRequired, User.adminRequired, Video.display);
router.post('/video/upload', User.signinRequired, User.adminRequired, Video.uploadVideo);
router.delete('/video/del', User.signinRequired, User.adminRequired, Video.del);

//Footer
router.get('/footer/view', User.signinRequired, User.adminRequired, Footer.footer);
router.get('/cooperation/new', User.signinRequired, User.adminRequired, Footer.cooperationNew);
router.post('/cooperation/save', User.signinRequired, User.adminRequired, Footer.cooperationSave);
router.get('/cooperation/update/:id', User.signinRequired, User.adminRequired, Footer.cooperationUpdate);
router.delete('/cooperation/del', User.signinRequired, User.adminRequired, Footer.cooperationDel);
router.get('/footer/new', User.signinRequired, User.adminRequired, Footer.new);
router.post('/footer/save', User.signinRequired, User.adminRequired, Footer.save);
router.get('/footer/update/:id', User.signinRequired, User.adminRequired, Footer.update);

module.exports = router;
