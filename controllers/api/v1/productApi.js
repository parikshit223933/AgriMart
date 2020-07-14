const Product=require('../../../models/productModel');

module.exports.createNewProduct = async (req, res)=>
{
    try{
        var newProduct = req.body;
        var product = await Product.create(newProduct);
        return res.json(200, {
            success:true,
            message:'Product Created Successfully!',
            data:{
                product
            }
        })
    }
    catch(err){
        return res.json(500, {
            success:false,
            message:'Internal Server Failure!'
        })
    } 
}