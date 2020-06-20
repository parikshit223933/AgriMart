const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password:
    {
        type: String
    },
    avatar: {
        type: String
    }
});


module.exports = mongoose.model("User", userSchema);