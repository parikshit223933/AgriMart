const express               = require('express');
const router                = express.Router();
const home_controller       = require('../controllers/home_controller');
const new_product_router    = require('./new_product_router');
const reviewRoute           = require('./review_route');
const product_controller    = require('../controllers/product_controller');
const users_router          =require('./users');
const passport              =require('passport');
const passportLocal         =require('../config/passport_local_strategy');
const api                   =require('./api')

/* whereever i have user the middleware passport.checkAuthentication, only there, an authentication check will be made and only then the controllers will be allowed to perform some action, otherwise the user will be thrown back to sign in page */

router.get('/', passport.checkAuthentication, home_controller.home);
router.use('/product', passport.checkAuthentication, new_product_router);
router.post('/', passport.checkAuthentication, product_controller.postNewProduct);
router.use('/product/:product_id/review', passport.checkAuthentication, reviewRoute);
router.use('/users', users_router);
router.use('/api', api);

module.exports=router;