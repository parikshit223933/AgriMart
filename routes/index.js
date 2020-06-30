const express               = require('express');
const router                = express.Router();
const home_controller       = require('../controllers/home_controller');
const new_product_router    = require('./new_product_router');
const reviewRoute           = require('./review_route');
const product_controller    = require('../controllers/product_controller');
const users_router=require('./users');

router.get('/', home_controller.home);
router.use('/product', new_product_router);
router.post('/',product_controller.postNewProduct);
router.use('/product/:product_id/review', reviewRoute);
router.use('/users', users_router);

module.exports=router;