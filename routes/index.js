const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');
const new_product_router=require('./new_product_router');
const product_controller=require('../controllers/product_controller');

router.get('/', home_controller.home);
router.use('/products', new_product_router);
router.post('/',product_controller.postNewProduct);

module.exports=router;