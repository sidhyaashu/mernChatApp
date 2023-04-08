const jwt = require('jsonwebtoken')
const User = require('../models/userM.js')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]

            // decode token id
            const decode = await jwt.verify(token,process.env.SECRET_KEY)

            req.user = await User.findById(decode.id).select("-password")

            next()
        } catch (error) {
            res.status(402)
            throw new Error("Not Authorized.. :(")
        }
    }

    if(!token){
        res.status(402)
        throw new Error("Not Authorized.. :( no token")
    }
})

module.exports ={protect}

