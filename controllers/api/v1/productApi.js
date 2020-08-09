const Product = require("../../../models/productModel");
const Review = require("../../../models/reviewModel");
const path = require("path");
const fs = require("fs");
const newProductMailer = require("../../../mailers/newProductMailer");
const newProductMailerWorker = require("../../../workers/newProductMailWorker");
const queue = require("../../../config/kue");

module.exports.createNewProduct = /* async */ (req, res) => {
	//send all details in req.body and image should be in req.file
	try {
		Product.uploadedImage(req, res, async (error) => {
			try {
				if (!req.file) {
					return res.json(422, {
						success: false,
						message: "Please provide an image for the product!"
					});
				}
				let { _id, userEmail, ...newProduct } = req.body;
				let product = await Product.create(newProduct);
				product.coverImage = path.join(
					Product.imagePath,
					"./",
					req.file.filename
				);
				product.seller = _id;
				product.save();

				let job = queue
					.create("new_product_mailer", { product, userEmail })
					.save(function (error) {
						if (error) {
							console.log(error);
							return;
						}
						console.log(`Job is enqueued with job id ${job.id}!`);
					});

				return res.json(200, {
					success: true,
					message: "Product Posted Successfully!",
					data: {
						product
					}
				});
			} catch (error) {
				console.log(error);
				return res.json(422, {
					success: false,
					message: "Error in creating a new product!"
				});
			}
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
		//before deleting the product we have to delete all the reviews of that product
		await Review.deleteMany({ _id: { $in: product.reviews } });

		await Product.findByIdAndDelete(req.body.productId);
		console.log(req.body.productId);
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
				path: "reviews",
				populate: {
					path: "likes"
				},
				populate: {
					path: "dislikes"
				},
				populate: {
					path: "author"
				}
			})
			.populate("seller"); // CAUTION: THE PASSWORD IS ALSO SENT ALONG WITH THE RESPONSE WHEN I HAVE POPULATED THE SELLER! PLEASE REMOVE THE PASSWORD FROM THE RESPONSE.
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

/* To get products category-wise */
module.exports.CategorizedProduct = async (req, res) => {
	//neither do i neeed authorization token for this nor do i need the user. categorized products should be avaibale to all users!

	//req.body={category}
	try {
		let products = await Product.find({ category: req.body.category }); //population is not needed
		console.log(req.body.category);
		return res.json(200, {
			success: true,
			data: {
				products
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* To get some random 10 items from each category for home page rendering */
module.exports.getRandomProds = async (req, res) => {
	try {
		let obj = new Object();
		let products = await Product.find({});
		for (let product of products) {
			if (!obj[product.category]) {
				obj[product.category] = [];
				obj[product.category].push(product);
			} else {
				if (obj[product.category].length == 10) {
					continue;
				}
				obj[product.category].push(product);
			}
		}
		return res.json(200, {
			success: true,
			data: {
				products: obj
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

/* SEARCHING FOR A PRODUCT */
module.exports.searchProduct = async (req, res) => {
    //req.body={searchStr:'...', }
    if(!req.body.searchStr)
    {
        return res.json(404, {
            success:false,
            message:'No input found!'
        });
    }
	try {
		let products = await Product.find({
			name: { $regex: req.body.searchStr, $options: "i" }
		})
			.populate({
				path: "reviews",
				populate: {
					path: "likes"
				},
				populate: {
					path: "dislikes"
				},
				populate: {
					path: "author"
				}
			})
			.populate("seller");

		return res.json(200, {
			success: true,
			data: {
				products
			}
		});
	} catch (error) {
        console.log(error);
        return res.json(500, {
            success:false,
            message:'Internal server error!'
        })
    }
};
