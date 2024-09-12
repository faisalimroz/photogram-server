const mongoose = require('mongoose');

const likeSchema=mongoose.Schema({
    postId:{
        type:String
    },
    email:{
        type:String
    }
},{
    timestamps: true
})

const like=mongoose.model('like',likeSchema)

module.exports=like