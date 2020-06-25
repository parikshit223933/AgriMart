const express=require('express');
const router=express.Router();
const product_controller=require('../controllers/product_controller');

router.get('/new', product_controller.newProduct);
router.get('/:product_id', product_controller.showPageProduct);
router.get('/:product_id/edit', product_controller.editProduct);
router.put('/:product_id/update', product_controller.updateProduct);
router.delete('/:product_id/delete', product_controller.deleteProduct);

module.exports=router;