const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");

/* action for signing in */
module.exports.create_session = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user || user.password != req.body.password) {
			//error code 422 denotes invalid input by the user! this if statement will be a result of invalid input!
			return res.json(422, {
				success: false,
				message: "Invalid email or password! Please try again."
			});
		}
		//if the user is found,
		return res.json(200, {
			message: "Sign in successful!",
			success: true,
			data: {
				token: jwt.sign(user.toJSON(), "secret"), //secret key should be same as used in the passport jwt strategy config.
				user:{
                    name:user.name,
                    email:user.email,
                    avatar:user.avatar,
                    _id:user._id
                }
			}
		});
	} catch (error) {
		console.log(
			"There was an error in finding the user by email in the database!"
		);
		return res.json(200, {
			message:
				"Internal Server Error. Please try after some time. If the issue persists, Please mail us at agrimartOfficial@gmail.com",
			success: false
		});
	}
};
