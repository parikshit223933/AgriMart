const Product = require("../../../models/productModel");
const User = require("../../../models/userModel");
const Review = require("../../../models/reviewModel");
const roundTo = require("round-to");

module.exports.createReview = async (req, res) =>
{
    try
    {
        /*
            we are getting the following items in the req.body
            {
                reviewText: ...
                reviewTitle: ...
                rating: ...
                author:     ... Author is the user who is trying to create that review
                product:   ... 
            } 
        */
        
        let reviews=await Review.find({author:req.body.author});
        for(let review of reviews)
        {
            if(review.product.toString()==req.body.product)
            {
                return res.json(405, {
                    success:false,
                    message:'You have already created a review for this product!'
                });
            }
        }


        let newReview = await Review.create(req.body);
        let product = await Product.findById(req.body.product);
        await product.reviews.push(newReview._id);
        switch (req.body.rating)
        {
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
        product.rating = parseInt(req.body.rating);
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
    } catch (error)
    {
        console.log(error);
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
};

/* delete a review */
module.exports.deleteReview = async (req, res) =>
{
    //in request.body i will get productId and reviewId
    try
    {
        let product = await Product.findById(req.body.productId);
        let review = await Review.findById(req.body.reviewId);
        console.log(req.body.userId, product.seller);

        if (req.body.userId != product.seller)
        {
            return res.json(401, {
                success: false,
                message: "You are Unauthorized to perform this action!"
            });
        }

        await product.reviews.filter((review) => review != req.body.reviewId);

        switch (review.rating)
        {
            case 1:
                product.one -= 1;
                break;
            case 2:
                product.two -= 1;
                break;
            case 3:
                product.three -= 1;
                break;
            case 4:
                product.four -= 1;
                break;
            case 5:
                product.five -= 1;
                break;
        }
        product.rating = roundTo(
            (product.one * 1 +
                product.two * 2 +
                product.three * 3 +
                product.four * 4 +
                product.five * 5) /
            (product.reviews.length - 1),
            2
        );
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
                product: newProduct
            }
        });
    } catch (error)
    {
        console.log(error);
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
};

/* to update a review */
module.exports.updateReview = async (req, res) =>
{
    //req.body={userId, productId, reviewId, reviewTitle, rating, reviewText}

    // get the review from the review id
    //first check if the user who is making the update request created that review or not
    //if reviewTitle exists in the req.body, then update the reviw.reviewTitle
    //if rating exists in the req.body, then update the reviw.rating
    //if reviewText exists in the req.body, then update the reviw.reviewText
    //save the review in the db, [review.save]
    //from the product id get the product and populate its review and all necessary fields
    // now if rating field is present in the req.body, you also need to update the product.one or two or.... based on the req.body.rating (use the switch case!)
    //send this product in the response.

    try
    {
        let review = await Review.findById(req.body.reviewId);

        let previous_rating = await review.rating;

        console.log("PREVIOUS RATING", previous_rating);

        if (req.body.userId != review.author)
        {
            return res.json(401, {
                success: false,
                message:
                    "This user is not allowed to perform this action! (Unauthorized request)"
            });
        }
        if (req.body.reviewTitle)
        {
            review.reviewTitle = req.body.reviewTitle;
        }
        if (req.body.reviewText)
        {
            review.reviewText = req.body.reviewText;
        }
        if (req.body.rating)
        {
            review.rating = req.body.rating;
        }
        await review.save();
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
                    path: "author" //CAUTION: The user's password is also send along with it. Either encrypt the password or remove it from the response
                }
            })
            .populate("seller");

        if (req.body.rating)
        {
            // removing the previous rating from the product
            switch (previous_rating)
            {
                case 1:
                    product.one -= 1;
                    break;
                case 2:
                    product.two -= 1;
                    break;
                case 3:
                    product.three -= 1;
                    break;
                case 4:
                    product.four -= 1;
                    break;
                case 5:
                    product.five -= 1;
                    break;
            }
            // Adding the new rating to the product
            switch (req.body.rating)
            {
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
            }
        }
        product.rating = roundTo(
            (product.one * 1 +
                product.two * 2 +
                product.three * 3 +
                product.four * 4 +
                product.five * 5) /
            (product.reviews.length - 1),
            2
        );
        await product.save();
        console.log(product);
        return res.json(200, {
            success: true,
            data: {
                product
            }
        });
    } catch (error)
    {
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
};

/* handle toggling likes on reviews */
module.exports.likeReview = async (req, res) =>
{
    //req.body={reviewId, userId}
    try
    {
        let review = await Review.findById(req.body.reviewId);
        if (review.likes.includes(req.body.userId))
        {
            review.likes = await review.likes.filter((like) =>
            {
                return like != req.body.userId;
            });
            await review.save();
            let product = await Product.findById(review.product)
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
                    product,
                    status: false //which means "like is removed"
                }
            });
        } else
        {
            //before pushing the user to the likes array, I need to check if the user has disliked the post previously or not
            if (review.dislikes.includes(req.body.userId))
            {
                review.dislikes = await review.dislikes.filter((dislike) =>
                {
                    return dislike != req.body.userId;
                });
            }
            await review.likes.push(req.body.userId);
            await review.save();
            let product = await Product.findById(review.product)
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
                    product,
                    status: true //which means "like is added"
                }
            });
        }
    } catch (error)
    {
        console.log(error);
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
};
module.exports.dislikeReview = async (req, res) =>
{
    //req.body={reviewId, userId}
    try
    {
        let review = await Review.findById(req.body.reviewId);
        if (review.dislikes.includes(req.body.userId))
        {
            review.dislikes = await review.dislikes.filter((dislike) =>
            {
                return dislike != req.body.userId;
            });
            await review.save();
            let product = await Product.findById(review.product)
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
                    product,
                    status: false//dislike is removed
                }
            });
        } else
        {
            //before dislikig a review i need to check if the user has liked it previously or not.
            if (review.likes.includes(req.body.userId))
            {
                review.likes = await review.likes.filter((like) =>
                {
                    return like != req.body.userId;
                });
            }
            await review.dislikes.push(req.body.userId);
            await review.save();
            let product = await Product.findById(review.product)
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
                    product,
                    status: true//dislike is added
                }
            });
        }
    } catch (error)
    {
        console.log(error);
        return res.json(500, {
            success: false,
            message: "Internal Server Error!"
        });
    }
};
