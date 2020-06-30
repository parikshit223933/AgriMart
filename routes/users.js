const express=require('express');
const router=express.Router();
const users_controller=require('../controllers/users_controller');

router.get('/sign_in', users_controller.sign_in);
router.get('/sign_up', users_controller.sign_up);
router.post('/create', users_controller.create);
router.post('/create_session', users_controller.createSession);
router.get('/profile', users_controller.user_profile);
router.get('/sign_out', users_controller.sign_out);

module.exports=router;