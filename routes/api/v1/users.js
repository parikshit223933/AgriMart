const express=require('express');
const router=express.Router();
const usersApi=require('../../../controllers/api/v1/usersApi');
const  Passport  = require('passport');

router.post('/create-session', usersApi.create_session);
router.post('/create', usersApi.createUser);
router.post('/update-user', Passport.authenticate('jwt', {session:false}),usersApi.update);

module.exports=router