const express = require('express')
const app = express()
const dotenv = require('dotenv')



dotenv.config()
const DB = process.env.MONGO_URL
const PORT = process.env.SERVER_PORT || 3000


app.get('/',(req,res)=>{
    res.status(200).send("Hi i am from server")
})




app.listen(PORT,()=>{
    console.log(`SERVER CONNECTED : ${PORT}`)
})