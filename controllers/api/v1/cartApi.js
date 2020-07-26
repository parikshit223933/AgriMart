const User = require("../../../models/userModel");
const Product = require("../../../models/productModel");

//to shaw products in cart 
module.exports.showCartProducts = async (req, res) => {
	try {
        //find User
        const user = await User.findById(req.user._id).populate('cart').exec();
        console.log(user);
		return res.json(200, {
			success: true,
			data: {
				products: user.cart
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

//add product in cart
module.exports.addProductToCart = async (req,res) => {
    try {
        //find user
        const user = await User.findById(req.user._id);
        //check if product exist in cart
        let flag = 0;
        for(let i = 0; i < user.cart.length; i++)
        {
            if(user.cart[i]._id === req.body.productId) {
                user.cart[i].quantity += 1;
                flag = 1;
                break;
            }
        }
        if(flag == 0) {
            user.cart.push({ "product": req.body.productId, "quantity": 1});
        }
        user.save();
        console.log(user);
    } catch (error) {
        return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
    }
}