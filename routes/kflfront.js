var express = require('express');
var router = express.Router();
var Footer = require('../app/controllers/front/footer');
var Index = require('../app/controllers/front/index');
var Product = require('../app/controllers/front/product');
var Video = require('../app/controllers/admin/video');
var Strength = require('../app/controllers/front/strength');
var Connectus = require('../app/controllers/front/connectus');
var News = require('../app/controllers/front/news');
var Recruit = require('../app/controllers/front/recruit');

/* Index */
router.get('/', Footer.footer, Index.index);
router.get('/index', Footer.footer, Index.index);
router.get('/video/:id', Footer.footer, Index.video);

/* Product */
router.get('/product', Footer.footer, Connectus.sideConnectus, Product.index);
router.get('/product/:id', Footer.footer, Connectus.sideConnectus, Product.detail);

/* Strength */
router.get('/strength', Footer.footer, Connectus.sideConnectus, Strength.index);
router.get('/strength/:id', Footer.footer, Connectus.sideConnectus, Strength.detail);

/* News */
router.get('/news', Footer.footer, News.index);
router.get('/news/:id', Footer.footer, Connectus.sideConnectus, News.detail);

/* Recruit */
router.get('/recruit', Footer.footer, Connectus.sideConnectus, Recruit.index);

/* Connectus */
router.get('/connectus', Footer.footer, Connectus.index);

module.exports = router;
