const mongoose=require('mongoose');

const LOCAL_DB='mongodb://localhost/agrimart_development';
const onlineDbName='dbAgrimart';
const onlineDbPassword='password@123agrimart';
const ONLINE_DB=`mongodb+srv://dbAgrimart:${onlineDbPassword}@agrimart.r5grp.mongodb.net/${onlineDbName}?retryWrites=true&w=majority`;


mongoose.connect(LOCAL_DB, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });
const db=mongoose.connection;

db.on('error', console.log.bind('Error in connecting to the Database'));

db.once('open', function()
{
    console.log('Connected to the Database!');
});

module.exports=db;