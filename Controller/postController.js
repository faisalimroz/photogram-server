const post =require('../model/post')
const  mongoose  = require('mongoose');

const { ObjectId } = mongoose.Types; 
module.exports.createPost=async(req,res)=>{
try {
    const newPost= new post(req.body)
    const result= await newPost.save()
    res.status(200).json(result)
} catch (error) {
   console.log(error) 
}
}

module.exports.getUser=async(req,res)=>{
try {
    const result= await post.aggregate([
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

module.exports.getPostbyOne=async(req,res)=>{
  try {
    const id = req.params.id
    const result=await post.aggregate([
        {$match:{_id: new ObjectId(id)}},
        {
            $lookup:{
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as:'userDetils'
            }
        }
    ])
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
}

module.exports.deletePost=async(req,res)=>{
  try {
    const id=req.params.id
    const result=await post.deleteOne({_id:id});
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports.postSearch=async(req,res)=>{
  try {
    const { searchQuery } = req.query;

    const filter = {};
if (ObjectId.isValid(searchQuery)) {
  filter._id = searchQuery;
} else {
  filter.$or = [
    { email: { $regex: searchQuery, $options: 'i' } }, 
    { location: { $regex: searchQuery, $options: 'i' } },
  ];
}
    if (searchQuery) {
      const result=await post.find(filter).sort({createdAt:-1})
    res.status(200).json(result)
   }
   else {
    res.status(400).json({ status: false, message: 'Search query is required.' });
  }
  } catch (error) {
    console.log(error)
  }
}
