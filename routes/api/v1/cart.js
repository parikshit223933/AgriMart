const express = require("express");
const router = express.Router();
const passport = require("passport");
const cartApi = require("../../../controllers/api/v1/cartApi");

router.post(
	"/get-all-products",
	passport.authenticate("jwt", { session: false }),
	cartApi.showCartProducts
);
router.post(
	"/add-product-to-cart",
	passport.authenticate("jwt", { session: false }),
	cartApi.addProductToCart
);
router.post(
    "/decrease-product-quantity",
    passport.authenticate("jwt", { session: false }),
	cartApi.decreaseProductQuantity
)
router.post(
    "/delete-product-from-cart",
    passport.authenticate("jwt", { session: false }),
	cartApi.deleteProductFromCart
)

module.exports = router;
