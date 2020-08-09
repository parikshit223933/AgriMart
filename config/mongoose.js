const mongoose=require('mongoose');
const env=require('./environment');
const LOCAL_DB=`mongodb://localhost/${env.db}`;
// const ONLINE_DB=env.db_online;

/**
 * @WARNING : WE DO NOT NEED ONLINE DB NOW. DB WILL BE CREATED ON AWS ITSELF. PRODUCT TESTING IS ALREADY DONE. REMOVE IT IF YOU WANT TO.
 */

mongoose.connect(LOCAL_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db=mongoose.connection;

db.on('error', console.log.bind('Error in connecting to the Database'));

db.once('open', function()
{
    console.log('Connected to the Database!');
});

module.exports=db;