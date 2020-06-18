const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const routes=require('./routes');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
/* used for session cookie */
const session=require('express-session');
const flash=require('connect-flash');
const mongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');

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

app.use(session(
    {
        name:'AgriMart',
        secret:'something',
        saveUninitialized:false,
        resave:false,
        cookie:
        {
            maxAge:(1000*60*100)
        },
        store:new mongoStore(
            {
                mongooseConnection:db,
                autoRemove:'disabled'
            },
            function(error)
            {
                console.log(error||'Connect mongo Setup is working fine!');
            }
        )
    }
));

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);

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