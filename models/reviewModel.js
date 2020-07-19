const mongoose = require("mongoose");

//Reviw Schema
let reviewSchema = new mongoose.Schema({
    // comment and rating 
    reviewText: {
        type: String,
        required: true
    },

    reviewTitle:{
        type:String,
        Default:"" 
    },

    rating: {
        type: Number,
        required: true,
        // Define min and max values
        min: 1,
        max: 5
    },

    likes:{
        type:Number,
        default:0
    },

    dislikes:{
        type:Number,
        default:0
    },

    // author
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // Product associated with the review
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Review", reviewSchema);