const express=require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');
const passport=require('passport');
const passportLocal=require('../config/passport_local_strategy');

router.get('/sign_in', users_controller.sign_in);
router.get('/sign_up', users_controller.sign_up);
router.get('/profile', passport.checkAuthentication , users_controller.user_profile);
router.post('/create', users_controller.create);
router.get('/sign_out', users_controller.destroy_session);
/* using passport as a middleware to authenticate */
/* failureRedirect denotes that if the session fails to be created due to some reason, then what is to be done next */
/* "local" denotes that we are using the local strategy */
/* authenticate is the inbuilt function in passport to authenticate the user */
router.post('/create_session',  passport.authenticate('local', {failureRedirect:'/users/sign_in'}), users_controller.create_session);

module.exports=router;