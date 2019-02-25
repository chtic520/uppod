var mongoose = require('mongoose');
var SocialAccountSchema = require('../schemas/social-account');
var SocialAccount = mongoose.model('SocialAccount', SocialAccountSchema);

module.exports = SocialAccount;