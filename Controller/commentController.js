const comment =require('../model/comment')
const  mongoose  = require('mongoose');
const { ObjectId } = mongoose.Types; 
module.exports.createComment=async(req,res)=>{
try {
    const newComment= new comment(req.body)
    const result= await newComment.save()
    res.status(200).json(result)
} catch (error) {
   console.log(error) 
}
}

module.exports.getComment=async(req,res)=>{
try {
    const result= await comment.aggregate([
        {
            $lookup:{
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as:'userDetils'
            }
        },{
            $sort: {
              'createdAt': -1, // Sort by 'createdAt' field in descending order (newest to oldest)
            },
          },
    ])
    res.status(200).json(result)
} catch (error) {
   console.log(error) 
}
}