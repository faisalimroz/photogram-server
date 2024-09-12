const express=require('express')
const likeControler=require('../Controller/likeControler');
const { verifyJwt } = require('../Token/verifyJwt');
const router=express.Router();

router.route('/').post(likeControler.createLike).get(likeControler.getLikes);
router.route('/:id').get().delete(likeControler.deleteLike);

module.exports=router