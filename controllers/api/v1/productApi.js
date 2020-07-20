const Product = require("../../../models/productModel");
const path = require("path");
const fs = require("fs");

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

module.exports.getProducts = async (req, res) => {
	try {
		let allProducts = await Product.find({ seller: req.body._id });
		return res.json(200, {
			success: true,
			data: {
				products: allProducts
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* get all the products bought by the user */
module.exports.getBoughtProducts = async (req, res) => {
	//req.body._id
	try {
		let extractedProducts = await Product.find({
			"Buyers.user": req.body._id
		});
		return res.json(200, {
			success: true,
			data: {
				products: extractedProducts
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* to edit a product */
module.exports.editProduct = (req, res) => {
	try {
		Product.uploadedImage(req, res, async (error) => {
			try {
				if (error) {
					return res.json(500, {
						success: false,
						message: "Internal Server Error!"
					});
				}
				let product = await Product.findById(req.body.productId);
				if (!product) {
					return res.json(404, {
						success: false,
						message: "No such Product Found!"
					});
				}
				if (product.seller != req.body.userId) {
					return res.json(401, {
						success: false,
						message: "Unauthorized user!"
					});
				}
				if (req.file) {
					if (
						fs.existsSync(
							path.join(
								__dirname,
								"../../../",
								product.coverImage
							)
						)
					) {
						fs.unlinkSync(
							path.join(
								__dirname,
								"../../../",
								product.coverImage
							)
						);
					}
					product.coverImage = path.join(
						Product.imagePath,
						"./",
						req.file.filename
					);
				}
				const { productId, userId, ...changes } = req.body;
				for (let key in changes) {
					product[key] = changes[key];
				}
				product.save();
				return res.json(200, {
					success: true,
					data: {
						product
					}
				});
			} catch (error) {
				console.log(error);
				return res.json(500, {
					success: false,
					message: "Internal Server Error!"
				});
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* DELETING A PRODUCT */
module.exports.deleteProduct = async (req, res) => {
	//in request we are getting userId and productId
	try {
		let product = await Product.findById(req.body.productId);
		if (product.seller != req.body.userId) {
			return res.json(401, {
				success: false,
				message: "Unauthorized User!"
			});
		}
		if (!product) {
			return res.json(404, {
				success: false,
				message: "Product not found!"
			});
		}

		if (
			fs.existsSync(path.join(__dirname, "../../../", product.coverImage))
		) {
			fs.unlinkSync(
				path.join(__dirname, "../../../", product.coverImage)
			);
		}

        await Product.findByIdAndDelete(req.body.productId);
        console.log(req.body.productId)
		return res.json(200, {
			success: true,
			data: {
				message: "Product Deleted Successfully!"
			}
		});
	} catch (error) {
		console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* To get all the details of a single product */
module.exports.getSingleProduct = async (req, res) => {
	//product id in request.body
	try {
		let product = await Product.findById(req.body.productId)
			.populate({
                path:'reviews',
                populate:{
                    path:'likes'
                },
                populate:{
                    path:'dislikes'
                },
                populate:{
                    path:'author'
                }
            })
            .populate("seller");// CAUTION: THE PASSWORD IS ALSO SENT ALONG WITH THE RESPONSE WHEN I HAVE POPULATED THE SELLER! PLEASE REMOVE THE PASSWORD FROM THE RESPONSE.
            return res.json(200, {
			success: true,
			data: {
				product
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server error!"
		});
	}
};
