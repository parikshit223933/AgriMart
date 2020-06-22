const mongoose = require("mongoose");

//Reviw Schema
let reviewSchema = new mongoose.Schema({
    // comment and rating 
    comment: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        // Define min and max values
        min: 1,
        max: 5
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
});

module.exports = mongoose.model("Review", reviewSchema);