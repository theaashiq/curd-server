require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://theaashiq:Livpop14131@cluster0.8qk1l.mongodb.net/curdDB?retryWrites=true&w=majority'
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected Successfully')
    } catch(err)  {
        console.error(err)
    }
}

module.exports = connectDB