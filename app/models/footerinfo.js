var mongoose = require('mongoose');
var FooterinfoSchema = require('../schemas/footerinfo');
var Footerinfo = mongoose.model('Footerinfo', FooterinfoSchema);

module.exports = Footerinfo;