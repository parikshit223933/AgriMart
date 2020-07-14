var Product = require("../models/productModel");
/* IT WILL TAKE ME TO A PAGE WHEREI CAN CREATE A NEW PRODUCT /////////////////////////////////////////////////////////////// */
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
/* FOR CREATING A NEW PRODUCT ////////////////////////////////////////////////////////////////////////////////////////// */
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
/* TO GET ALL THE DETAILS OF A PARTICULAR PRODUCT ////////////////////////////////////////////////////////////////////////////// */
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

/* TO EDIT A PARTICUALR PRODUCT IT wILL TAKE US TO THE EDIT PRODUCT PAGE //////////////////////////////////////////////////////*/

module.exports.editProduct = async (req, res)=>
{
    try{
        var product = await Product.findById(req.params.product_id);
        var options =
        {
            title: "AgriMart",
            product: product    
        };
        return res.render('products/editProduct', options);
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    }
}

/* THE NEW UPDATED PRODUCT IS CREATED HERE AFTER THE EDIT ACTION //////////////////////////////////////////////////////////////// */
module.exports.updateProduct = async (req, res)=>
{
    try{
        var updateProduct = req.body.product;
        var product = await Product.findByIdAndUpdate(req.params.product_id, updateProduct) ;
        console.log("******NEW PRODUCT******", product);
        return res.redirect('/product/'+ req.params.product_id);
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    } 
}
/* THIS ACTION WILL BE CALLED TO DELETE A PARTICULAR PRODUCT //////////////////////////////////////////////////////////////////// */
module.exports.deleteProduct = async (req, res)=>
{
    try{
      await  Product.findByIdAndDelete(req.params.product_id);
      console.log("Succesfully product deleted")
      res.redirect('/');
    }
    catch(err){
        console.log(`there is an errr ${err}`);
    } 
}