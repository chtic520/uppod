var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BlogSchema = new Schema({
	title: String,
	subtitle: String,
	author: String,
	content: String,
	pic: String,
	category: [{
		type: ObjectId,
		ref: 'CategoryBlog'
	}],
	views: {
		type: Number,
		default: 0
	},
	displayindex: {
		type: Boolean,
		default: false
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

BlogSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});

BlogSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

module.exports = BlogSchema