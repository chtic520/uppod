var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProductSchema = new Schema({
	name: String,
	price: String,
	salePrice: String,
	pic: [String],
	summary: String,
	brief: String,
	link: String,
	shopAdd: [{
		country: String,
		link: String
	}],
	parameter: [{
		parameName: String,
		parameContent: String
	}],
	weight: {
		type: Number,
		default: 0
	},
	star: {
		type: Number,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	},
	guideFlow: {
		type: Number,
		default: 0
	},
	displayindex: {
		type: Boolean,
		default: false
	},
	isSale: {
		type: Boolean,
		default: false
	},
	category: [{
		type: ObjectId,
		ref: 'CategoryProduct'
	}],
	comment: [{
		type: ObjectId,
		ref: 'Comment'
	}],
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

ProductSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});

ProductSchema.statics = {
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

module.exports = ProductSchema