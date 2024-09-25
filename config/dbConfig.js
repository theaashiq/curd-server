require('dotenv').config()
const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected Successfully')
    } catch(err)  {
        console.error(err)
    }
}

module.exports = connectDB