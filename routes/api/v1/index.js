const express=require('express');
const router=express.Router();
const home=require('./home');

router.use('/home', home);

module.exports=router;