const express=require('express');

const userController=require('../../Controller/userController');
const { verifyJwt } = require('../../Token/verifyJwt');
const router=express.Router();
router.route('/').get(userController.getUser)
router.route('/stack').get(userController.countUser)
router.route('/:id').get(userController.getUserOnebyId).patch(userController.updateProfile)

module.exports=router