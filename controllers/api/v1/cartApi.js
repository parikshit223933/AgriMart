const User = require("../../../models/userModel");

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

