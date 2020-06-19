const express=require('express');
const router=express.Router();
const product_controller=require('../controllers/product_controller');

router.get('/new', product_controller.newProduct);

module.exports=router;