const mongoose = require('mongoose')
const env = require('./environment')
const LOCAL_DB = `mongodb://mongodb-server:27017/${env.db}`
// const ONLINE_DB=env.db_online;

/**
 * @WARNING : WE DO NOT NEED ONLINE DB NOW. DB WILL BE CREATED ON AWS ITSELF. PRODUCT TESTING IS ALREADY DONE. REMOVE IT IF YOU WANT TO.
 */

mongoose
    .connect(LOCAL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        connectTimeoutMS: 10000,
    })
    .then(function () {
        console.log('MongoDB is connected')
    })
    .catch((error) => {
        console.log(error)
    })

const db = mongoose.connection

module.exports = db
