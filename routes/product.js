var express = require('express');
var router = express.Router();
var Product = require('../app/controllers/front/product');
var Top = require('../app/controllers/front/top');
var Footer = require('../app/controllers/front/footer');

/* Index */
router.get('/', Top.top, Footer.footer, Product.index);
router.get('/product/:id', Top.top, Footer.footer, Product.category);
router.get('/product/detail/:id', Top.top, Footer.footer, Product.detail);

module.exports = router;
