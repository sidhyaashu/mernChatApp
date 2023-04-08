const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatM.js")
const User = require('../models/userM.js')



const accessChat = asyncHandler(async(req,res)=>{
    // one-to-one chat
    const { userId } = req.body

    if(!userId){
        console.log("UserId params not sent with request")
        res.sendStatus(400)
    }

    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{ $elemMatch : {$eq : req.user._id }}},
            {users:{ $elemMatch : {$eq : userId }}},
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    });

    if(isChat.length >0){
        res.send(isChat[0])
    }else{
        var chatData ={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        };

        try {
            const createdChat = await Chat.create(chatData)

            const fullChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            )

            res.status(201).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})



//.then((result)=>res.status(200).send(result))
const fetchChats = asyncHandler(async(req,res)=>{
    try {
        Chat.find({users:{ $elemMatch: { $eq: req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email",
            });
        
            res.status(200).send(results)
        })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})




const createGroupChat = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please Fill All The Feilds"})
    }

    var users = JSON.parse(req.body.users)
    if(users.length < 2){
        return res.status(400).send("More than 2 users are required")
    }

    users.push(req.user) // all user and owner in the group

    try {
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users,
            isGroupChat:true,
            groupAdmin:req.user
        })

        const fullGroupChat = await Chat.find({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")

        res.status(201).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})




const renameGroup = asyncHandler(async(req,res)=>{
    const { chatId , chatName} = req.body

    try {
        const updateedGroupName = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new:true }
        )
        .populate("users","-password")
        .populate("groupAdmin","-password")

        if(!updateedGroupName){
            res.status(404)
            throw new Error("Chat Not Found")
        }else{
            res.json(updateedGroupName)
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})




const removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId , userId } = req.body

    try {
        const removeFromGroup = await Chat.findByIdAndUpdate(
            chatId,
            {$pull: { users: userId}},
            { new:true }
        )
        .populate("users","-password")
        .populate("groupAdmin","-password")

        if(!removeFromGroup){
            res.status(404)
            throw new Error("Chat Not Found")
        }else{
            res.json(removeFromGroup)
        }

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})




const addToGroup = asyncHandler(async(req,res)=>{
    const { chatId , userId } = req.body

    try {
        const addedToGroup = await Chat.findByIdAndUpdate(
            chatId,
            {$push: { users: userId}},
            { new:true }
        )
        .populate("users","-password")
        .populate("groupAdmin","-password")

        if(!addedToGroup){
            res.status(404)
            throw new Error("Chat Not Found")
        }else{
            res.json(addedToGroup)
        }

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})




module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup
}