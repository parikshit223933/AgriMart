const express=require('express');
const router=express.Router();
const home=require('./home');
const users=require('./users');

router.use('/home', home);
router.use('/users', users);

module.exports=router;