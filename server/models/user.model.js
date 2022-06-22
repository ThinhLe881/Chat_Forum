const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 320
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    posts: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 0
    },
    likedPosts: [String]
},{
    collection: 'users'
})

module.exports = mongoose.model('users', User);