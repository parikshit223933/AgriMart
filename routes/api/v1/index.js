const express=require('express');
const router=express.Router();
const home=require('./home');
const users=require('./users');
const product=require('./product');

router.use('/home', home);
router.use('/users', users);
router.use('/product', product);

module.exports=router;