require('dotenv').config()
const mongoose = require('mongoose')

let isConnected; // Track connection status

const mongo_uri = process.env.MONGO_URI
// const mongo_uri = 'mongodb+srv://theaashiq:Livpop14131@cluster0.8qk1l.mongodb.net/curdDB?retryWrites=true&w=majority'

async function connectDB() {
    if (isConnected) {
        console.log('MongoDB connection is already established');
        return;
    }
    try {
        const db = await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected Successfully')
    } catch(err)  {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;