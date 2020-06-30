const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/userModel');

/* Authentication */
/* telling the passport to use local strategy. */
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done)/* in this function we will find a user and establish its identity */
{
    User.findOne({email:email}, function(error, user)
    {
        if(error)
        {
            console.log('Unable tto find the user in the database: Passport-local-strategy', error);
            return done(error);
        }
        if(!user||user.password!=password)//if the user is not found in the database or the password entered by the user does not match with that in the database
        {
            console.log('Invalid Username/password!');
            return done(null, false);/* there was no error, but the user is not found. */
        }
        return done(null, user);
    });
}
));

//serializing the user to decide which key is to be set in the cookies
passport.serializeUser(function(user, done)
{
    done(null, user.id);
});
//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done)
{
    User.findById(id, (error, user)=>
    {
        if(error)
        {
            console.log('Error when deserializing the user: passport-local-strategy', error);
        }
        done(null, user);
    });
});

module.exports=passport;