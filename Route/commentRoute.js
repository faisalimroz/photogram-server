const express=require('express');
const commentController=require('../Controller/commentController');
const { verifyJwt } = require('../Token/verifyJwt');
const router=express.Router();

router.route('/').post(commentController.createComment).get(commentController.getComment);


module.exports=router