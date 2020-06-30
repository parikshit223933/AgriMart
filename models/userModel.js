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
        type: String,
        requiured:true
    },
    
    avatar: {
        type: String
    }
},
{
    timestamps:true,
}
);


module.exports = mongoose.model("User", userSchema);