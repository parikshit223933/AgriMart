const Review                = require("../models/reviewModel"),
    Product                 = require("../models/productModel")

module.exports = 
{
    createReview: async (req, res) => 
    {
        try
        {
            let prod = await Product.findById(req.params.product_id).populate("reviews").exec();
            console.log(req.body);
            try 
            {
                //create review using form submissions
                let review = await Review.create(req.body.review);
                //add author and associated Product to the review
                //review.author = req.user._id;
                review.product = prod._id;
                //save review
                review.save();
                //push into that product's reviews array
                await prod.reviews.push(review);
                // calculate the new average review for the campground
                prod.rating = calculateAverage(prod.reviews);
                //save spot
                await prod.save();
                console.log("*****PRODUCT AFTER CREATING REVIEW*******", prod);
                //req.flash("success", "Your review has been successfully added.");
                return res.redirect('/product/' + prod._id);
            } 
            catch (err) 
            {
                console.log(err);
                return res.redirect("back");
            }
        }
        catch (err) 
        {
            console.log(err);
            //req.flash("error", "Something went wrong");
            return res.redirect("back");
        }
    },

    editReview: async (req, res) => 
    {
        try
        {
            //find Product   
            const prod = await Product.findById(req.params.product_id);
            try
            {
                //find review with provided id
                let foundReview = await Review.findById(req.params.review_id);

                //create custom options that we are goig to use in our ejs file
                const options = {
                    title: "Edit Review",
                    review: foundReview,
                    product: prod
                }
                res.render("../views/review/updateReviewpage.ejs", options);
            }
            catch(err)
            {
                console.log(err);
                //req.flash("error", "Review not found");
                res.redirect("back");
            }
        }
        catch(err)
        {
            console.log(err);
            //req.flash("error", "Product not found");
            return res.redirect("back");
        }
    },

    updateReview: async (req, res) => 
    {
        //update review
        try
        {
            const newReview = await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
            try
            {
                let prod = await Product.findById(req.params.product_id).populate("reviews").exec();
                // recalculate campground average
                prod.rating = calculateAverage(prod.reviews);
                //save changes
                prod.save();
                console.log("******Product on updating review******", prod);
                //req.flash("success", "Your review successfully edited.");
                res.redirect('/product/' + prod._id);
            }
            catch (err)
            {
                console.log(err);
                //req.flash("error", "Product not found");
                return res.redirect("back");
            }
        }
        catch (err)
        {
            console.log(err);
            //req.flash("error", "Review Not Found");
            return res.redirect("back");
        }
    },

    deleteReview: async (req, res) => 
    {
        //find review 
        try 
        {
            await Review.findByIdAndRemove(req.params.review_id);
            try 
            {
                let prod = await Product.findById(req.params.product_id).populate("reviews").exec();
                // recalculate campground average
                prod.rating = calculateAverage(prod.reviews);
                //save changes
                prod.save();
                console.log("******PRODUCT ON DELETING REVIEW******", prod);
                //req.flash("success", "Your review successfully deleted.");
                res.redirect('/product/' + prod._id);
            } 
            catch (err) 
            {
                console.log(err);
                //req.flash("error", "Product Not Found");
                return res.redirect("back");
            }
        }
        catch (err) 
        {
            console.log(err);
            //req.flash("error", "Review Not Found");
            return res.redirect("back");
        }
    }
}

function calculateAverage(reviews) 
{
    //check reviews length
    if (reviews.length === 0) 
    {
        return 0;
    }
    let sum = 0;

    //find sum of rating
    reviews.forEach((element) =>
    {
        sum += element.rating;
    });

    //calculate rating
    let res = sum / reviews.length;
    res = res.toPrecision(2); //for upto 2 decimal

    return res;
}