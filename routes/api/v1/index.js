const express=require('express');
const router=express.Router();
const home=require('./home');
const users=require('./users');
const product=require('./product');
const review=require('./review');
const cart = require('./cart');

router.use('/home', home);
router.use('/users', users);
router.use('/product', product);
router.use('/review', review);
router.use('/cart', cart);

module.exports=router;