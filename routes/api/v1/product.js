const express=require('express');
const router=express.Router();
const passport=require('passport');
const productApi=require('../../../controllers/api/v1/productApi');

router.post('/create', passport.authenticate('jwt', {session:false}), productApi.createNewProduct);
//since i dont want the session cookies to be generated so i have written session:false
module.exports=router;