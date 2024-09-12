const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
    email:{
        type:String
    },
    caption:{
        type:String,
    },
 image:{
        type:String
    },
    like:[{
        type:Number,
        default: 0
    }]
},{
    timestamps: true
})

const post=mongoose.model('post',postSchema)

module.exports=post;