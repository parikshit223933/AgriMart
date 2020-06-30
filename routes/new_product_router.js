const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product_controller');
const passport = require('passport');
const passportLocal = require('../config/passport_local_strategy');

router.get('/new', passport.checkAuthentication, product_controller.newProduct);
router.get('/:product_id', passport.checkAuthentication, product_controller.showPageProduct);
router.get('/:product_id/edit', passport.checkAuthentication, product_controller.editProduct);
router.put('/:product_id/update', passport.checkAuthentication, product_controller.updateProduct);
router.delete('/:product_id/delete', passport.checkAuthentication, product_controller.deleteProduct);

/* remove the passport.checkAuthentication where ever it is not needed. (if you dont want an authentication check for that action to be performed.) */

module.exports = router;