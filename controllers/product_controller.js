var Product = require("../models/productModel");
const { render } = require("ejs");

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
        console.log("******NEW PRODUCT******", product);
        return res.redirect('/');
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    } 
}

module.exports.showPageProduct = async (req, res)=>
{
  try{
      var product = await Product.findById(req.params.product_id).populate("reviews").exec();
      var options =
      {
        title: "AgriMart",
        product : product
      };
     
      return res.render('products/showPageProduct', options);
  }
  catch(err){
      console.log(`there is an errr ${err}`);
  } 
}