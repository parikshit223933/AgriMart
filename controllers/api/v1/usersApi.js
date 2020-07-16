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
				user: {
					name: user.name,
					email: user.email,
					avatar: user.avatar,
					_id: user._id,
					profession: user.profession,
					homeTown: user.homeTown,
					birth: user.birth,
					contact: user.contact,
					trusted: user.trusted,
					upVotes: user.upVotes,
					bookmarks: user.bookmarks,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					facebook: user.facebook,
					instagram: user.instagram,
					googlePlus: user.googlePlus,
					twitter: user.twitter,
					portfilio: user.portfolio,
					sex: user.sex
				} //Not sharing the password
			}
		});
	} catch (error) {
		console.log(
			"There was an error in finding the user by email in the database!"
		);
		return res.json(500, {
			message:
				"Internal Server Error. Please try after some time. If the issue persists, Please mail us at agrimartOfficial@gmail.com",
			success: false
		});
	}
};

/* action for signing up */
module.exports.createUser = (req, res) => {
	if (req.body.password != req.body.confirm_password) {
		//if the passwords entered in the "password" and confirm password" field are not same, then the user will be redirected back to the page he came from.
		return res.json(401, {
			success: false,
			message:
				"The password in the password field does not match with the password in the confirm password field!"
		});
	}
	User.findOne({ email: req.body.email }, (error, user) => {
		if (error) {
			console.log(
				"There was an error in finding the user from the database. (signing up)",
				error
			);
			return res.json(401, {
				success: false,
				message:
					"There was an error in finding the user from the database. (signing up)"
			});
		}
		if (!user) {
			//if the user does not exists in the database, then we'll need to create the user
			User.create(
				{
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				},
				(error, user) => {
					if (error) {
						return res.json(400, {
							success: false,
							message:
								"There was an error in creating a new user in the database!"
						});
					}
					return res.json(200, {
						success: true,
						message: "User Signed up successfully"
					});
				}
			);
		} //the user who is trying to sign up, is already present in the database (his email)
		else {
			return res.json(400, {
				success: false,
				message: "User already exists!"
			});
		}
	});
};
module.exports.update = async (req, res) => {
	try {
        let new_credentials = req.body;
        console.log(new_credentials);
		let user = await User.findOneAndUpdate(
			{_id:new_credentials._id},
            new_credentials,
            {new:true}
		);
        let newToken = await jwt.sign(user.toJSON(), "secret");
		return await res.json(200, {
			message: "Update successful!",
			success: true,
			data: {
				token: newToken, //secret key should be same as used in the passport jwt strategy config.
				user: {
					name: user.name,
					email: user.email,
					avatar: user.avatar,
					_id: user._id,
					profession: user.profession,
					homeTown: user.homeTown,
					birth: user.birth,
					contact: user.contact,
					trusted: user.trusted,
					upVotes: user.upVotes,
					bookmarks: user.bookmarks,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					facebook: user.facebook,
					instagram: user.instagram,
					googlePlus: user.googlePlus,
					twitter: user.twitter,
					portfilio: user.portfolio,
					sex: user.sex
				} //Not sharing the password
			}
        }
        );
    } 
    catch (error) {
		console.log("There was an error in updating the user in the database!");
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};
