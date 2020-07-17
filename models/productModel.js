const mongoose = require("mongoose");
const multer = require("multer");
const path=require('path');
const IMAGE_PATH=path.join('uploads/products');

//Product Schema
let productSchema = new mongoose.Schema({
	name: {
		type: String
	},

	coverImage: {
		type: String
	},

	price: {
		type: Number
	},

	description: {
		type: String
	},

	category: {
		type: String
	},

	minimumOrderQuantity: {
		type: Number
	},

	remainingQuantity: {
		type: Number
	},

	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5
	},

	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	],

	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},

	Buyers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
});

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, path.join(__dirname, "../", IMAGE_PATH));
    },
    filename:function(req, file, callback)
    {
        callback(null, file.fieldname+'-'+Date.now());
    }
});

//static methods
productSchema.statics.uploadedImage=multer({storage:storage}).single('coverImage');
productSchema.statics.imagePath=IMAGE_PATH;

module.exports = mongoose.model("Product", productSchema);
