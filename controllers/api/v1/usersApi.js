const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const Token = require("../../../models/tokenModel");
const cryptoRandomString = require("crypto-random-string");
const saltRound = 10;
const queue = require("../../../config/kue");
const authMailer = require("../../../mailers/authMailer");
const signUpMailer = require("../../../mailers/signUpMailer");
const loginMailWorker = require("../../../workers/loginMailWorker");
const signUpMailWorker = require("../../../workers/signUpMailWorker");
const tokenMailer = require("../../../mailers/tokenMailer");
const forgotPasswordWorker = require("../../../workers/forgotPasswordWorker");
/**
 * @WARNING : DO NOT REMOVE THE UNUSED REQUIRES.
 */

/* action for signing in */
module.exports.create_session = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user) {
			//error code 422 denotes invalid input by the user! this if statement will be a result of invalid input!
			return res.json(422, {
				success: false,
				message: "Invalid email or password! Please try again."
			});
		}
		//match input password with hash of correct password in db IF THE USER IS FOUND IN THE DB
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			//error code 422 denotes invalid input by the user! this if statement will be a result of invalid input!
			return res.json(422, {
				success: false,
				message: "Invalid email or password! Please try again."
			});
		}
		//if the user is found and the password also matched,
		// authMailer(user);
		//sending the login mail to the corresponding user!
		try {
			let job = queue.create("emails", user._doc).save(function (error) {
				if (error) {
					console.log(error);
					return;
				}
				console.log(`Job is enqueued with job id ${job.id}`);
			});
		} catch (error) {
			console.log(error);
		}

		let { password, ...expanded_user } = user._doc;
		return res.json(200, {
			message: "Sign in successful!",
			success: true,
			data: {
				token: jwt.sign(expanded_user, "secret"), //secret key should be same as used in the passport jwt strategy config.
				user: expanded_user //Not sharing the password
			}
		});
	} catch (error) {
		console.log(error);
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
	User.findOne({ email: req.body.email }, async (error, user) => {
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
			//create hash of password
			try {
				const salt = await bcrypt.genSalt(saltRound);
				const hash = await bcrypt.hash(req.body.password, salt);

				User.create(
					{
						name: req.body.name,
						email: req.body.email,
						password: hash
					},
					(error, user) => {
						if (error) {
							return res.json(400, {
								success: false,
								message:
									"There was an error in creating a new user in the database!"
							});
						}
						//user created successfully, now i can send an email corresponding to sign up
						let job = queue
							.create("signUpMailer", user)
							.save(function (error) {
								if (error) {
									console.log(error);
									return;
								}
								console.log(
									`Job is enqueued with job id ${job.id}`
								);
							});
						return res.json(200, {
							success: true,
							message: "User Signed up successfully"
						});
					}
				);
			} catch (error) {
				return res.json(500, {
					success: false,
					message: "Internal Server Error!"
				});
			}
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
	//req.body={oldPassword:..., newPassword:..., confirmNewPassword:...}
	if (req.body.oldPassword) {
		//request is to change the password
		let newParams = req.body;
		if (Object.keys(newParams).length != 4) {
			return res.json(422, {
				success: false,
				message: "Unprocessable Entity!"
			});
		}
		if (
			"confirmNewPassword" in newParams &&
			"oldPassword" in newParams &&
			"newPassword" in newParams &&
			"_id" in newParams
		) {
			if (newParams.confirmNewPassword != newParams.newPassword) {
				return res.json(422, {
					success: false,
					message: "Input Error by the user!"
				});
			}
			try {
				let user = await User.findById(newParams._id);
				if (user.password != newParams.oldPassword) {
					return res.json(422, {
						success: false,
						message: "Wrong Old Password!"
					});
				}
				let new_user = await User.findOneAndUpdate(
					{ _id: newParams._id },
					{ password: newParams.newPassword },
					{ new: true }
				);
				new_user.save();
				let { password, ...expanded_user } = new_user._doc;
				let new_token = await jwt.sign(expanded_user, "secret");
				return res.json(200, {
					message: "Update successful!",
					success: true,
					data: {
						token: new_token, //secret key should be same as used in the passport jwt strategy config.
						user: expanded_user //Not sharing the password
					}
				});
			} catch (error) {
				console.log(
					"There was an error in updating the user in the database!"
				);
				return res.json(500, {
					success: false,
					message: "Internal Server Error!"
				});
			}
		} else {
			return res.json(422, {
				success: false,
				message: "Required Fields not found!"
			});
		}
	} else {
		//request to change details except password!
		try {
			let new_credentials = req.body;
			console.log(new_credentials);
			let user = await User.findOneAndUpdate(
				{ _id: new_credentials._id },
				new_credentials,
				{ new: true }
			);
			user.save();
			let { password, ...expanded_user } = user._doc;
			let newToken = await jwt.sign(expanded_user, "secret");

			return res.json(200, {
				message: "Update successful!",
				success: true,
				data: {
					token: newToken, //secret key should be same as used in the passport jwt strategy config.
					user: expanded_user //Not sharing the password
				}
			});
		} catch (error) {
			console.log(
				"There was an error in updating the user in the database!"
			);
			return res.json(500, {
				success: false,
				message: "Internal Server Error!"
			});
		}
	}
};

module.exports.uploadAvatar = (req, res) => {
	try {
		User.uploadedAvatar(req, res, async function (error) {
			try {
				let user = await User.findById(req.body._id);
				if (!user) {
					return res.json(404, {
						success: false,
						message: "User Not Found!"
					});
				}
				if (!req.file) {
					return res.json(404, {
						success: false,
						message: "No file uploaded!"
					});
				}
				//if user already has an avatar then I'll need to delete it to avoid running out of space in the storage!
				if (req.body.avatar) {
					if (
						fs.existsSync(
							path.join(__dirname, "../../../", req.body.avatar)
						)
					) {
						fs.unlinkSync(
							path.join(__dirname, "../../../", req.body.avatar)
						);
					}
				}

				user.avatar = path.join(
					User.avatarPath,
					"./",
					req.file.filename
				);
				console.log(user.avatar);
				user.save();

				let { password, ...expanded_user } = user._doc;
				let new_token = jwt.sign(expanded_user, "secret");

				return res.json(200, {
					message: "Update successful!",
					success: true,
					data: {
						token: new_token,
						user: expanded_user
					}
				});
			} catch (error) {
				console.log(error);
				return res.json(500, {
					success: false,
					message: "Internal Server Error!"
				});
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};
module.exports.forgotPassword = async (req, res) => {
	//req={email:...}
	if (!req.body.email) {
		return res.json(404, {
			success: false,
			message: "Empty email field!"
		});
	}
	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.json(404, {
			success: false,
			message: "User does not exist!, Please Sign Up!"
		});
	}

	let randomAccessToken = cryptoRandomString({
		length: 100,
		type: "url-safe"
	});
	let token = await Token.create({
		accessToken: randomAccessToken,
		user: user._id,
		isValid: true
	});
	token.save();

	let job = queue
		.create("forgot_password", {
			email: user.email,
			url: `http://localhost:3000/forgot-password/reset-password/${randomAccessToken}`,
			name: user.name
		})
		.save(function (error) {
			if (error) {
				console.log(error);
				return res.json(500, {
					success: false,
					message: "Internal server Error!"
				});
			}
			console.log(`Job is enqueued with job id ${job.id}`);
			return res.json(200, {
				success: true,
				data: {
					message: "Kindly check your Inbox!"
				}
			});
		});
};
module.exports.resetPassword = async (req, res) => {
	let { confirmPassword, newPassword, token } = req.body;
	if (!confirmPassword || !newPassword) {
		return res.json(422, {
			success: false,
			message: "Fields can't be empty!"
		});
	}
	if (!token) {
		res.json(404, {
			success: false,
			message: "No token found in request!"
		});
	}
	if (confirmPassword != newPassword) {
		return res.json(422, {
			success: false,
			message: "Passwords in both the fields should be same!"
		});
	}
	let dbToken = await Token.findOne({ accessToken: token });
	if (!dbToken) {
		return res.json(404, {
			success: false,
			message: "Invalid Link! You can't change password using this link!"
		});
	}
	if (!dbToken.isValid) {
		return res.json(401, {
			success: false,
			message: "Token Expired! You cant reset password using this link!"
		});
	}

	let user = await User.findById(dbToken.user);

	const salt = await bcrypt.genSalt(saltRound);
	const hash = await bcrypt.hash(newPassword, salt);

	user.password = hash;
	user.save();
	token.isValid = false;
	dbToken.save();

	return res.json(200, {
		success: true,
		data: {
			message: "Password Changed Successfully! Proceed to login."
		}
	});
};

module.exports.upvote = async (req, res) => {
	// req.body={userId:..., voter}
	try {
		let user = await User.findById(req.body.userId);
		if (!user) {
			return res.json(404, {
				success: false,
				message: "User does not exist!"
			});
        }
        if(! await User.findById(req.body.voter))
        {
            return res.json(401, {
                success:false,
                message:'Unauthorized user!'
            })
        }
        if(user.upVotes.includes(req.body.voter))
        {
            return res.json(401, {
                success:false,
                message:'Already UpVoted!'
            })
        }
		user.upVotes.push(req.body.voter);
        await user.save();
		return res.json(200, {
			success: true,
			data: {
                message: "Upvoted!",
                upVotes:user.upVotes
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

module.exports.downvote = async (req, res) => {
	// req.body={userId:..., voter}
	try {
		let user = await User.findById(req.body.userId);
		if (!user) {
			return res.json(404, {
				success: false,
				message: "User does not exist!"
			});
        }
        if(! await User.findById(req.body.voter))
        {
            return res.json(401, {
                success:false,
                message:'Unauthorized user!'
            })
        }
        if(!user.upVotes.includes(req.body.voter))
        {
            return res.json(401, {
                success:false,
                message:'Already downVoted!'
            })
        }
        user.upVotes=user.upVotes.filter(upvote=>
            {
                if(upvote==req.body.voter)
                {
                    return false;
                }
                return true;
            });
        await user.save();
		return res.json(200, {
			success: true,
			data: {
                message: "Downvoted!",
                upVotes:user.upVotes
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};
