const express=require('express');
const router=express.Router();

router.get('/', home_controller.home);

module.exports=router;