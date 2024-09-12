const express=require('express');
const postController=require('../Controller/postController');
const { verifyJwt } = require('../Token/verifyJwt');
const router=express.Router();

router.route('/').post(postController.createPost).get(postController.getUser);
router.route('/search').get(postController.postSearch);
router.route('/:id').get(postController.getPostbyOne).delete(postController.deletePost)

module.exports=router