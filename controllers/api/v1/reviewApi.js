const Product = require("../../../models/productModel");
const User = require("../../../models/userModel");
const Review = require("../../../models/reviewModel");

module.exports.createReview = async (req, res) => {
	try {
		let newReview = await Review.create(req.body);
		let product = await Product.findById(req.body.product);
        await product.reviews.push(newReview._id);
		await product.save();
		let newProduct = await Product.findById(req.body.product)
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
				product: newProduct
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
