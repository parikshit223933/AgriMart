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

/* delete a review */
module.exports.deleteReview = async (req, res) => {
	//in request.body i will get productId and reviewId
	try {
		let product = await Product.findById(req.body.productId);
        let review = await Review.findById(req.body.reviewId);
        console.log(req.body.userId, product.seller);
        
        if(req.body.userId!=product.seller)
        {
            return res.json(401, {
                success:false,
                message:'You are Unauthorized to perform this action!'
            })
        }

		await product.reviews.filter((review) => review != req.body.reviewId);
        
        switch(review.rating)
        {
            case 1:
                product.one-=1;
                break
            case 2:
                product.two-=1;
                break;
            case 3:
                product.three-=1;
                break;
            case 4:
                product.four-=1;
                break;
            case 5:
                product.five-=1;
                break;
        }
        await review.remove();
        await product.save();

		let newProduct = await Product.findById(req.body.productId)
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
				message: "Review Deleted Successfully!",
				product:newProduct
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
