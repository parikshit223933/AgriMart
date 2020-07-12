const express=require('express');
const router=express.Router();
const homeApi=require('../../../controllers/api/v1/homeApi');

router.get('/', homeApi);

module.exports=router;