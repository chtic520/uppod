var mongoose = require('mongoose');
var ContactusSchema = require('../schemas/contactus');
var Contactus = mongoose.model('Contactus', ContactusSchema);

module.exports = Contactus;