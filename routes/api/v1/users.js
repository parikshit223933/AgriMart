const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/usersApi");
const Passport = require("passport");

router.post("/create-session", usersApi.create_session);
router.post("/create", usersApi.createUser);
router.post('/OAuth2-Authenticate', usersApi.OAuth2);
router.post(
    "/update-user",
    Passport.authenticate("jwt", { session: false }),
    usersApi.update
);
router.post(
    "/upload-avatar",
    Passport.authenticate("jwt", { session: false }),
    usersApi.uploadAvatar
);
router.post('/forgot-password', usersApi.forgotPassword);
router.post('/reset-password', usersApi.resetPassword);
router.post('/upvote', Passport.authenticate('jwt', { session: false }), usersApi.upvote);
router.post('/downvote', Passport.authenticate('jwt', { session: false }), usersApi.downvote);

module.exports = router;
