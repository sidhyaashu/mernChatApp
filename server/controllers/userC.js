const User = require('../models/userM.js')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken.js')

const register =asyncHandler(async(req,res)=>{
    const {
        name,
        email,
        password,
        pic
    } = req.body

    if(!name || !email || !password){
        res.status(400).json({message:"All feilds require"})
    }

    const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!(email.match(emailFormat))) return res.status(400).json({message:"Invalid Email Format"})
    

    try {
        const existUser = await User.findOne({email})

        if(existUser){
            res.status(400).json({message:"User Already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            pic
        })

        const userInfo = {
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        }

        if(!user){
            res.status(400).json({message:"User Not Created"})
        }else{
            res.status(201).json(userInfo)
        }


    } catch (error) {
        res.status(500).json({message:"error -> ",error})
    }


})



const login =asyncHandler(async(req,res)=>{
    const {
        email,
        password,
    } = req.body

    if(!email || !password){
        res.status(400).json({message:"All feilds require"})
    }

    try {
        const foundUser = await User.findOne({email})

        if(!foundUser){
            res.status(400).json({message:"User Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,foundUser.password)

        const userInfo={
            _id:foundUser._id,
            name:foundUser.name,
            email:foundUser.email,
            pic:foundUser.pic,
            token:generateToken(foundUser._id)
        }

        if(!matchPassword){
            res.status(400).json({message:"Invalid Creadientials"})
        }else{
            res.status(200).json(userInfo)
        }


    } catch (error) {
        res.status(500).json({message:"error -> ",error})
    }


})

//api/user?search=sidhya
const allUsers = asyncHandler(async(req,res)=>{
    const keywords = req.query.search 
    ?{
        $or:[
            {name:{$regex: req.query.search , $options:"i" }},
            {email:{$regex: req.query.search , $options:"i" }},
        ]
    } :{} ;

    const users = await User.find(keywords).find({ _id : { $ne : req.user._id }})

    res.status(200).send(users)
})




module.exports = {
    register,
    login,
    allUsers
}