const like=require('../model/like');



module.exports.createLike = async (req, res) => {
    try {
        const { email, postId } = req.body;

        const existingLike = await like.findOne({ email, postId });

        if (existingLike) {
            return res.status(400).json({ error: 'User has already liked this post' });
        }
        const newLike = new like({ email, postId });
        const result = await newLike.save();

        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating like:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports.getLikes=async(req,res)=>{
    try {
        const result= await like.aggregate([
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

    module.exports.deleteLike=async(req,res)=>{
          try {
             const id=req.params.id
             if (!id) {
                return res.status(400).json({ error: 'Invalid like id' });
            }
             const result= await like.deleteOne({_id:id})
             res.status(200).json(result)
          } catch (error) {
            console.log(error)
          }
    }