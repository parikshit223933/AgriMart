const passport = require('passport');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/userModel");

let options = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: "secret" //this has to be changed during production (used to encrypt the token)
};
passport.use(
	new JWTStrategy(options, function (jwtPayload, done) {
		User.findById(jwtPayload._id, function (error, user) {
			if (error) {
				console.log(
					"Error in finding user from JWT's payload user id!"
				);
				return;
			}
			if (user) {
				done(null, user);
			} else {
                done(null, false);
			}
		});
	})
);

module.exports=passport;