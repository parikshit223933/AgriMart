const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkOutApi = require("../../../controllers/api/v1/checkOut");

router.post(
	"/createPayment",
	/* passport.authenticate("jwt", { session: false }), */
	checkOutApi.createPayment
);

module.exports = router;