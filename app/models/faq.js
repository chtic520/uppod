var mongoose = require('mongoose');
var FaqSchema = require('../schemas/faq');
var Faq = mongoose.model('Faq', FaqSchema);

module.exports = Faq;