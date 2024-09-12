const mongoose = require('mongoose');

const commentSchema=mongoose.Schema({
    email:{
        type:String
    },
    comment:{
        type:String,
    },
    postId:{
        type:String,
    },
},{
    timestamps: true
})

const comment=mongoose.model('comment',commentSchema)

module.exports=comment;