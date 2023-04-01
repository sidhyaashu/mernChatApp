const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const  mongoose  = require('mongoose')
const colors = require('colors')
const errorMiddleware = require('./middleware/errorMiddleware.js')

dotenv.config()
connectDB()
const PORT = process.env.SERVER_PORT || 3000
app.use(express.json())



//router
app.use('/api/user',require('./routes/userR.js'))




//error handler
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)


mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>console.log(`SERVER CONNECTED : ${PORT}`.red.bold))
})