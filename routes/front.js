var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/front/index');
var Faq = require('../app/controllers/front/faq');
var Blog = require('../app/controllers/front/blog');
var Brand = require('../app/controllers/front/brand');
var ContactUs = require('../app/controllers/front/contactus');
var Top = require('../app/controllers/front/top');
var Footer = require('../app/controllers/front/footer');

/* Index */
router.get('/', Top.top, Footer.footer, Index.index);
router.get('/index', Top.top, Footer.footer, Index.index);
router.get('/faq', Top.top, Footer.footer, Faq.index);
router.get('/brandstory', Top.top, Footer.footer, Brand.index);
router.get('/contactus', Top.top, Footer.footer, ContactUs.index);
router.get('/blog', Top.top, Footer.footer, Blog.index);
router.get('/blog/detail/:id', Top.top, Footer.footer, Blog.detail);

module.exports = router;
