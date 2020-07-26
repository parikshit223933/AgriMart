const express = require("express");
const router = express.Router();
const passport = require("passport");
const cartApi = require("../../../controllers/api/v1/cartApi");

router.get(
	"/",
	/* passport.authenticate("jwt", { session: false }), */
	cartApi.showCartProducts
);

module.exports = router;
