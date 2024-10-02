const mongoose = require('mongoose')

const getISTDateTime = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST (5 hours 30 minutes)
    return new Date(now.getTime() + istOffset);
}

const mainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        set: v => v.toLowerCase()
    },
    lastName: {
        type: String,
        required: true,
        set: v => v.toLowerCase()
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validate 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v <= Date.now();  // Ensure dob is not in the future
            },
            message: props => `${props.value} is not a valid date of birth!`
        }
    },
    age : {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        set: v => v.toLowerCase()
    },
    gender : {
        type: String,
        required: true,
        set: v => v.toLowerCase()
    },
    createdAt: {
        type: Date,
        default: getISTDateTime
    },
    lastUpdatedAt: {
        type: Date
    },
    customerId: {
        type: String,
        required: true
    }

}, {collection: 'main'})

const MainData = mongoose.model('Main', mainSchema)

module.exports = MainData