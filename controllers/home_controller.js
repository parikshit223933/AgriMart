const Product = require("../models/productModel");

module.exports.home=async (req, res)=>
{
    try
    {
        var products = await Product.find({}); 
        var options =
        {
            title: "AgriMart",
            products: products
        };
        return res.render('home', options);
    }
    catch(error)
    {
        if(error)
        {
            console.log('There was some error in opening the home page!');
            console.log(error);
        }
    }
}