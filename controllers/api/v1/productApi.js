const Product = require("../../../models/productModel");
const path = require("path");

module.exports.createNewProduct = /* async */ (req, res) => {
	//send all details in req.body and image should be in req.file
	try {
		Product.uploadedImage(req, res, async (error) => {
			let { _id, ...newProduct } = req.body;
			let product = await Product.create(newProduct);
			product.coverImage = path.join(
				Product.imagePath,
				"./",
				req.file.filename
			);
			product.seller = _id;
			product.save();
			return res.json(200, {
				success: true,
				message: "Product Posted Successfully!",
				data: {
					product
				}
			});
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}

	// try{
	//     var newProduct = req.body;
	//     var product = await Product.create(newProduct);
	//     return res.json(200, {
	//         success:true,
	//         message:'Product Created Successfully!',
	//         data:{
	//             product
	//         }
	//     })
	// }
	// catch(err){
	//     return res.json(500, {
	//         success:false,
	//         message:'Internal Server Failure!'
	//     })
	// }
};


module.exports.getProducts=async (req, res)=>
{
    try
    {
        console.log(req.body);
        let allProducts=await Product.find({seller:req.body._id});
        return res.json(200, {
            success:true,
            data:{
                products:allProducts
            }
        })
    }
    catch(error)
    {
        return res.json(500, {
            success:false,
            message:'Internal Server Error!'
        })
    }
}