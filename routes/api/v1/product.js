const express=require('express');
const router=express.Router();
const passport=require('passport');
const productApi=require('../../../controllers/api/v1/productApi');

router.post('/create', passport.authenticate('jwt', {session:false}), productApi.createNewProduct);
router.post('/get-products', passport.authenticate('jwt', {session:false}), productApi.getProducts);
router.post('/get-bought-items', passport.authenticate('jwt', {session:false}), productApi.getBoughtProducts);
router.post('/edit-product', passport.authenticate('jwt', {session:false}), productApi.editProduct);
router.post('/delete-product', passport.authenticate('jwt', {session:false}), productApi.deleteProduct);
router.post('/get-single-product', passport.authenticate('jwt', {session:false}), productApi.getSingleProduct);


//since i dont want the session cookies to be generated so i have written session:false
module.exports=router;