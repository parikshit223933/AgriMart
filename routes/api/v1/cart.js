const express = require("express");
const router = express.Router();
const passport = require("passport");
const cartApi = require("../../../controllers/api/v1/cartApi");

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	cartApi.showCartProducts
);
router.post(
	"/addProductToCart",
	passport.authenticate("jwt", { session: false }),
	cartApi.addProductToCart
);
router.post(
    "/removeProductFromCart",
    passport.authenticate("jwt", { session: false }),
	cartApi.addProductToCart
)

module.exports = router;
