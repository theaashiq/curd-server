require('dotenv').config()
const mongoose = require('mongoose')

const mongo_uri = 'mongodb+srv://theaashiq:Livpop14131@cluster0.8qk1l.mongodb.net/curdDB?retryWrites=true&w=majority'
async function connectDB() {
    try {
        await mongoose.connect(mongo_uri)
        console.log('MongoDB connected Successfully')
    } catch(err)  {
        console.error(err)
    }
}

module.exports = connectDB