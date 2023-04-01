const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MONGODB CONNECTED : ${conn.connection.host}`.bgBlue.bold)
    } catch (error) {
        console.log(` ERROR -> ${error}`)
        process.exit()
    }
}

module.exports = connectDB