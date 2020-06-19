const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');
const product_controller=require('../controllers/product_controller');


router.get('/', home_controller.home);


router.get('/products/new', product_controller.newProduct);

router.post('/',product_controller.postNewProduct);

//router.post('/products')

module.exports=router;