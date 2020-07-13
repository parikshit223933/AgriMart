const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeApi=require('../../../controllers/api/v1/homeApi');

router.get('/', homeApi);//By session:false I mean to stop session cookies from being generated.

module.exports=router;