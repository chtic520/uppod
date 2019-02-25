var mongoose = require('mongoose');
var StrengthSchema = require('../schemas/strength');
var Strength = mongoose.model('Strength', StrengthSchema);

module.exports = Strength;