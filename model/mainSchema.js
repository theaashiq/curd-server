const mongoose = require('mongoose')

const mainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    workStatus: {
        type: String,
    },
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    }
}, {collection: 'main'})

const MainData = mongoose.model('Main', mainSchema)

module.exports = MainData