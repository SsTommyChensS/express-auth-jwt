const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    information: {
        fullname: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: 'male'
        }, 
        age: {
            type: Number,
            default: 18
        },
        address: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    } 
})

module.exports = mongoose.model('User', userSchema)