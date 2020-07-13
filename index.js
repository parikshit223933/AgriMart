const express               = require('express');
const cookieParser          = require('cookie-parser');
const app                   = express();
const port                  = 8000;
const methodOverride        = require("method-override"); //support PUT or DELETE
const routes                = require('./routes');
const expressLayouts        = require('express-ejs-layouts');
const db                    = require('./config/mongoose');
/* used for session cookie */
const session               = require('express-session');
const passport              = require('passport');
const passportLocal         = require('./config/passport_local_strategy');
const passportJwt           =require('./config/passport-jwt-strategy');
const flash                 = require('connect-flash');
const mongoStore            = require('connect-mongo')(session);/* connect mongo is used to store the session information in the database so that the session information dosen't get lost if the server is restarted. */
const sassMiddleware        = require('node-sass-middleware');
const cors=require('cors');

/* conversion of sass to css */
app.use(sassMiddleware(
    {
        src:'./assets/scss',
        dest:'./assets/css',
        debug:true,
        outputStyle:'expanded',
        prefix:'/css'
    }
));
/* This is the express session, created during setting up of passport local strategy. we need to create a session for the user. */
app.use(session(
    {
        name:'AgriMart',
        secret:'something',/* this secret is used to encode and decode the key's value in the cookie during creation of the session. */
        /* we will encrypt user id. this secret is for that*/
        /* TODO: change the secret in the production mode. */
        saveUninitialized:false,/* whenever there is a request which is not innitialized, which means that a session which is not initialized which further means that the user has not logged in, i.e. the id is not established, in that case do I want to save extra dummy data in the session cookie? NO OBVIOUSLY NOT! that is why it is set to false. */
        resave:false,/* when the identity is established, or some sort of data is already available in the session cookie, do i want to re-write it? i.e. overwrite the same thing again? NO! */
        cookie:
        {
            maxAge:(1000*60*300)/* This defines the age for which the user will be logged in. after this time interval, he will be logged out. i.e. session over */
            /* this is in milli seconds. for now it is 300 minutes */
        },
        /* mongo store is used to store the session cookie in the db */
        store:new mongoStore(
            {
                mongooseConnection:db,/* this is the mongodb connection */
                autoRemove:'disabled'/* do i want it to get removed automatically? NO NOT AT ALL!, if yes, then where will our session information be stored permanently? */
            },
            function(error)/* in case the connection is not established, then this function is called. */
            {
                console.log(error||'Connect mongo Setup is working fine!');/* if there is an error, it will be shown else, the string will be shown. */
            }
        )/* just this much is needed to store the session information. */
    }
));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(expressLayouts);

app.use(passport.initialize());/* initializing passport globally */
app.use(passport.session());/* it will maintain the session for us */

app.use(passport.setAuthenticatedUser);//An authentication check will be made on each passport session initialization and user details will be given to res.locals to pass them further to views (check the setAuthenticatedUser function in passport_local_strategy file in configs folder.)
/* Now there is an issue, with what i have done uptill here. authentication and all will be checked properly, but whenever I re start the server, the user will be logged out automatically. here mongostore comes to the rescue... */

app.use(cors());//for cross origin data sharing
app.use('/', routes);
app.use(express.static('./assets'));

/* making the uploads path available to the browser */
app.use('/uploads', express.static(__dirname+'/uploads'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('case sensitive routing', false);
app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, (error)=>
{
    if(error)
    {
        console.log(`Error in running the server @ port ${port}`);
        return;
    }
    console.log(`Server is running on the port ${port}`);
})