const mongoose = require('mongoose');

const userSchema=mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','employ','admin'],
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }

},{
    timestamps: true
})

const user = mongoose.model('user', userSchema);

module.exports = user;