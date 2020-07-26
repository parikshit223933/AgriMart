const User = require("../../../models/userModel");
const Product = require("../../../models/productModel");

//to shaw products in cart 
module.exports.showCartProducts = async (req, res) => { //{userID}
	try {
        //find User
        const user = await User.findById(req.body.userId).populate('cart').exec();
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
module.exports.addProductToCart = async (req,res) => { //{userID, productID}
    try {
        //find user
        const user = await User.findById(req.body.userId);
        //find product
        const product = await Product.findById(req.body.productId);
        //check if product exist in cart
        let flag = 0;
        for(let i = 0; i < user.cart.length; i++)
        {
            if(user.cart[i].productId === req.body.productId) {
                //check that much quantity availaible or not
                if(user.cart[i].quantity + 1 > product.remainingQuantity) {
                    return res.json(501, {
                        success: false,
                        message: "No more stock left"
                    })
                }
                user.cart[i].quantity += 1;
                flag = 1;
                break;
            }
        }
        if(flag == 0) {
            user.cart.push({ "productId": req.body.productId, "quantity": 1});
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

//remove product from cart
module.exports.removeProductFromCart = async (req, res) => { //{userID, productID}
    try {
        //find user
        const user = await User.findById(req.body.userId);
        //check if product exist in cart
        let flag = 0;
        for(let i = 0; i < user.cart.length; i++)
        {
            if(user.cart[i].productId === req.body.productId) {
                //check that much quantity availaible or not
                user.cart[i].quantity -= 1;
                if(user.cart[i].quantity === 0) {
                    //remove from cart as proiduct quant is 0
                    user.cart.splice(i, 1);
                }
                flag = 1;
                break;
            }
        }
        if(flag == 0) {
            //so no product in cart with that product id
            return res.json(501, {
                success: false,
                message: "You had not put this item in stock"
            })
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

module.exports.deleteProductFromCart = async (req, res) => { //{userID, productID}
    try {
        //find user
        const user = await User.findById(req.body.userId);
        //check if product exist in cart
        let flag = 0;
        for(let i = 0; i < user.cart.length; i++)
        {
            if(user.cart[i].productId === req.body.productId) {
                //remove from cart as proiduct quant is 0
                user.cart.splice(i, 1);
                flag = 1;
                break;
            }
        }
        if(flag == 0) {
            //product not found in cart
            return res.json(501, {
                success: false,
                message: "You had not put this item in stock"
            })
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