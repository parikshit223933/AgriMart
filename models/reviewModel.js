const mongoose   = require("mongoose");

//Reviw Schema
let reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        // Defining min and max values
        min: 1,
        max: 5
    },

    // review text
    text: {
        required: true,
        type: String
    },

    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

    // Product associated with the review
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

module.exports = mongoose.model("Review", reviewSchema);