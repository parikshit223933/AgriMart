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

/* now we want to send the decrypted data of currently logged in user to the views */
/* here we need to check if the user is authenticated. only then we will send the data to views */
/* isAuthenticated is a function provided by passport, using this we can check if the request we are recieving is authenticated or not. */
passport.checkAuthentication=(req, res, next)=>/* yes you guessed it right! this is a middleware! :) we'll be using this function as a middleware in routes */
{
    if(req.isAuthenticated())
    {
        return next();/*  if the user is authenticated, then proceed to the next function (controller's action) */
    }
    /* if the user is not signed in, redirect it to the sign in page. */
    return res.redirect('/users/sign_in');
}

passport.setAuthenticatedUser=(req, res, next)=>
{
    if(req.isAuthenticated())
    {
        /* req.user contains the current signed in user. from the session cookie. and we are just sending this to the locals for the views.*/
        res.locals.user=req.user
    }
    next();
}

module.exports=passport;