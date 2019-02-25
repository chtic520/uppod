var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/admin/index');
var User = require('../app/controllers/admin/user');
var Product = require('../app/controllers/admin/product');
var Faq = require('../app/controllers/admin/faq');
var Blog = require('../app/controllers/admin/blog');
var Brand = require('../app/controllers/admin/brand');
var ContactUs = require('../app/controllers/admin/contactus');
var Top = require('../app/controllers/admin/top');

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
router.post('/product/isSale', User.signinRequired, User.adminRequired, Product.sale);
router.post('/product/category', User.signinRequired, User.adminRequired, Product.category);
router.post('/product/category/display', User.signinRequired, User.adminRequired, Product.categoryDisplay);
router.get('/product/category', User.signinRequired, User.adminRequired, Product.categoryList);
router.delete('/product/category', User.signinRequired, User.adminRequired, Product.categoryDel);

/* FAQ */
router.get('/faq/list', User.signinRequired, User.adminRequired, Faq.list);
router.delete('/faq/del', User.signinRequired, User.adminRequired, Faq.del);
router.get('/faq/update/:id', User.signinRequired, User.adminRequired, Faq.update);
router.post('/faq/new', User.signinRequired, User.adminRequired, Faq.save);
router.get('/faq/new', User.signinRequired, User.adminRequired, Faq.new);

/* Blog */
router.get('/blog/list', User.signinRequired, User.adminRequired, Blog.list);
router.delete('/blog/del', User.signinRequired, User.adminRequired, Blog.del);
router.get('/blog/update/:id', User.signinRequired, User.adminRequired, Blog.update);
router.post('/blog/save', User.signinRequired, User.adminRequired, Blog.save);
router.get('/blog/new', User.signinRequired, User.adminRequired, Blog.new);
router.post('/blog/category', User.signinRequired, User.adminRequired, Blog.category);
router.get('/blog/category', User.signinRequired, User.adminRequired, Blog.categoryList);
router.delete('/blog/category', User.signinRequired, User.adminRequired, Blog.categoryDel);

/* Brand */
router.get('/brand/view', User.signinRequired, User.adminRequired, Brand.view);
router.get('/brand/new', User.signinRequired, User.adminRequired, Brand.new);
router.post('/brand/save', User.signinRequired, User.adminRequired, Brand.save);
router.get('/brand/update/:id', User.signinRequired, User.adminRequired, Brand.update);

/* ContactUs */
router.get('/contactus/view', User.signinRequired, User.adminRequired, ContactUs.view);
router.get('/contactus/new', User.signinRequired, User.adminRequired, ContactUs.new);
router.post('/contactus/save', User.signinRequired, User.adminRequired, ContactUs.save);
router.get('/contactus/update/:id', User.signinRequired, User.adminRequired, ContactUs.update);

/* Top */
router.get('/top/view', User.signinRequired, User.adminRequired, Top.index);
router.get('/social/new', User.signinRequired, User.adminRequired, Top.socialNew);
router.post('/social/save', User.signinRequired, User.adminRequired, Top.socialSave);
router.get('/social/update/:id', User.signinRequired, User.adminRequired, Top.socialUpdate);
router.delete('/social/del', User.signinRequired, User.adminRequired, Top.socialDel);

module.exports = router;
