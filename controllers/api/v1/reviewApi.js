const Product = require("../../../models/productModel");
const User = require("../../../models/userModel");
const Review = require("../../../models/reviewModel");

module.exports.createReview = async (req, res) => {
	try {
		console.log(req.body);
		let newReview = await Review.create(req.body);
		let product = await Product.findById(req.body.product);
		await product.reviews.push(newReview._id);
		switch (req.body.rating) {
			case "1":
				product.one += 1;
				break;
			case "2":
				product.two += 1;
				break;
			case "3":
				product.three += 1;
				break;
			case "4":
				product.four += 1;
				break;
			case "5":
				product.five += 1;
				break;
			default:
				break;
		}
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
		console.log(newProduct);
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
