const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars"); //the path where we will be storing all the avatars

let userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true
		},

		name: {
			type: String,
			required: true
		},

		password: {
			type: String,
			requiured: true
		},

		avatar: {
			type: String,
			default: ""
		},
		profession: {
			type: String,
			default: ""
		},
		homeTown: {
			type: String,
			default: ""
		},
		birth: {
			type: Date,
			default: ""
		},
		contact: {
			type: String,
			default: ""
		},
		trusted: {
			type: Boolean,
			default: false
		},
		upVotes: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
		bookmarks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		],
		sex: {
			type: String
		},
		facebook: {
			type: String,
			default: ""
		},
		instagram: {
			type: String,
			default: ""
		},
		googlePlus: {
			type: String,
			default: ""
		},
		twitter: {
			type: String,
			default: ""
		},
		portfolio: {
			type: String,
			default: ""
        },
        cart:[
            {
                product: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
             
        ]
	},
	{
		timestamps: true
	}
);

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//this file is the file from the reqeuest we have made by the form
		cb(null, path.join(__dirname, "../", AVATAR_PATH));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	}
});

//static methods
// static functions are called upon the whole class. they are not called on the instances of the class
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('file');//single, because I dont want an array of files/avatars
userSchema.statics.avatarPath=AVATAR_PATH;

module.exports = mongoose.model("User", userSchema);
