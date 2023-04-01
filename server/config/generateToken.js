const jwt = require('jsonwebtoken')
const KEY = process.env.SECRET_KEY


const generateToken =(id)=>{
    return jwt.sign({id},KEY,{expiresIn:"30d"});
}

module.exports = generateToken