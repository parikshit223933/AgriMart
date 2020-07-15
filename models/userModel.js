const mongoose = require("mongoose");

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
			default: ''
		},
		profession: {
			type: String,
			default: ''
		},
		homeTown: {
			type: String,
			default: ''
		},
		birth: {
			type: Date,
			default: ''
		},
		contact: {
			type: String,
			default: ''
		},
		trusted: {
			type: Boolean,
			default: false
		},
		upVotes: {
			type: Number,
			default: 0
		},
		bookmarks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
        ],
        sex:{
            type:String,
        },
        facebook:{
            type:String,
            default:''
        },
        instagram:{
            type:String,
            default:''
        },
        googlePlus:{
            type:String,
            default:''
        },
        twitter:
        {
            type:String,
            default:''
        },
        portfolio:{
            type:String,
            default:''
        }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("User", userSchema);
