const mongoose = require('mongoose')
const Schema = mongoose.Schema

//chatName
//isGroupChat
//users
//latestUser
//groupAdmin

const chatSchema = new Schema({
    chatName:{
        type:String,
        trim:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true})

const Chat = mongoose.model('Chat',chatSchema)
module.exports = Chat