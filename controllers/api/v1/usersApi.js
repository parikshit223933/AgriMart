const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");

/* action for signing in */
module.exports.create_session = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user || user.password != req.body.password) {
			//error code 422 denotes invalid input by the user! this if statement will be a result of invalid input!
			return res.json(422, {
				message: "Invalid email or password!"
			});
		}
		//if the user is found,
		return res.json(200, {
			message: "Sign in successful!",
			data: {
				token: jwt.sign(user.toJSON(), "secret", {
					expiresIn: 1000 * 60 * 300
				}) //secret key should be same as used in the passport jwt strategy config.
			}
		});
	} catch (error) {
		console.log(
			"There was an error in finding the user by email in the database!"
		);
		return res.json(200, {
			message: "Internal Server Error"
		});
	}
};
