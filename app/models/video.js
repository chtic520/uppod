var mongoose = require('mongoose');
var VideoSchema = require('../schemas/video');
var Video = mongoose.model('Video', VideoSchema);

module.exports = Video;