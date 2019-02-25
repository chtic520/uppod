var express = require('express');
var router = express.Router();
var User = require('../app/controllers/admin/user');

/* User handle */
router.get('/login', User.showLogin);
router.post('/login', User.login);
router.get('/register', User.showRegister);
router.post('/register', User.register);
router.get('/logout', User.logout);


module.exports = router;
