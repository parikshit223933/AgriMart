const User = require("../../../models/userModel");
const Product = require("../../../models/productModel");

//to shaw products in cart
module.exports.showCartProducts = async (req, res) => {
	//{userID}
	try {
		//find User
		const user = await User.findById(req.body.userId).populate({
			path: "cart",
			populate: {
				path: "product"
			}
		});
		return res.json(200, {
			success: true,
			data: {
				cart: await user.cart
			}
		});
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

//add product in cart or increase product quantity
module.exports.addProductToCart = async (req, res) => {
	//{userID, productID}
	try {
		let user = await User.findById(req.body.userId);
		let product = await Product.findById(req.body.productId);
		for (let i = 0; i < user.cart.length; i++) {
			if ((await user.cart[i].product.toString()) == product._id) {
				if (product.remainingQuantity > 0) {
					product.remainingQuantity -= 1;
					user.cart[i].quantity += 1;
					await product.save();
                    await user.save();
                    const populatedUser = await User.findById(req.body.userId).populate({
                        path: "cart",
                        populate: {
                            path: "product"
                        }
                    });
					return res.json(200, {
						success: true,
						data: {
							cart: await populatedUser.cart
						}
					});
				} else {
					return res.json(403, {
						success: false,
						message: "Out Of Stock!"
					});
				}
			}
		}
		if (product.remainingQuantity > 0) {
			product.remainingQuantity -= 1;
			await user.cart.push({ product: (await product)._id, quantity: 1 });
			await user.save();
			await product.save();
            const populatedUser = await User.findById(req.body.userId).populate({
                path: "cart",
                populate: {
                    path: "product"
                }
            });
			return res.json(200, {
				success: true,
				data: {
					cart: await populatedUser.cart
				}
			});
		} else {
			return res.json(403, {
				success: false,
				message: "Out Of Stock!"
			});
		}
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

//REMOVE PRODUCT FROM THE CART OR DECREASE PRODUCT QUANTITY.
module.exports.decreaseProductQuantity = async (req, res) => {
	//{userID, productID}
	try {
		let user = await User.findById(req.body.userId)
		let product = await Product.findById(req.body.productId);
		for (let i = 0; i < user.cart.length; i++) {
			if (product._id.toString() == user.cart[i].product.toString()) {
				if (user.cart[i].quantity > 1) {
					user.cart[i].quantity -= 1;
                    product.remainingQuantity += 1;
					await user.save();
                    await product.save();
					return res.json(200, {
						success: true,
						data: {
                            message:'Quantity decreased successfully',
                            deleted:false
						}
					});
                }
                else
                {
                    await user.cart.splice(i, 1);
                    product.remainingQuantity+=1;
                    await user.save();
                    await product.save();
                    return res.json(200, {
                        success:true,
                        data:{
                            message:'Product Completely removed from cart!',
                            deleted:true
                        }
                    })
                }
			}
        }
        return res.json(404, {
            success:false,
            message:'Product was not found in the cart!'
        })
        
	} catch (error) {
        console.log(error);
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};

module.exports.deleteProductFromCart = async (req, res) => {
	//{userID, productID}
	try {
		//find user
		const user = await User.findById(req.body.userId);
		//check if product exist in cart
		let flag = 0;
		for (let i = 0; i < user.cart.length; i++) {
			if (user.cart[i].product === req.body.productId) {
				//remove from cart as proiduct quant is 0
				user.cart.splice(i, 1);
				flag = 1;
				break;
			}
		}
		if (flag == 0) {
			//product not found in cart
			return res.json(501, {
				success: false,
				message: "You had not put this item in stock"
			});
		}
		user.save();
		console.log(user);
	} catch (error) {
		return res.json(500, {
			success: false,
			message: "Internal Server Error!"
		});
	}
};
