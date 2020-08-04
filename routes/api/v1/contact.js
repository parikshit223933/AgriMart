const express=require('express');
const router=express.Router();
const messagingApi=require('../../../controllers/api/v1/messagingApi');

router.post('/contact-agrimart', messagingApi);

module.exports=router;