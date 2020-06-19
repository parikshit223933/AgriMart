var Product = require("../models/productModel");

module.exports.newProduct = async (req, res)=>
{
    try{
        var options =
        {
            title: "AgriMart"
        };
        return res.render('products/newProduct', options);
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    }
}
module.exports.postNewProduct = async (req, res)=>
{
    try{
        var newProduct = req.body.product;
        var product = await Product.create(newProduct);
        console.log(product);
        return res.redirect('/');
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    } 
}