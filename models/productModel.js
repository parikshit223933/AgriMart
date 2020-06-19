const mongoose   = require("mongoose");

//Product Schema
let productSchema = new mongoose.Schema({
    name: String,

    image: String,

    price: Number,
    
    description: String,

    category: String,
    
    minimumOrderQuantity : Number,
    //rating of the product
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    //reviews of the product
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    //seller of the produt
    seller: 
    {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String
    }
});

module.exports = mongoose.model("Product",productSchema);