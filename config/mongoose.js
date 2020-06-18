const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/agrimart_development', { useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection;

db.on('error', console.log.bind('Error in connecting to the Database'));

db.once('open', function()
{
    console.log('Connected to the Database!');
});

module.exports=db;