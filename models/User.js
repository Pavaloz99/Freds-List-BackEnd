const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Rating: [Number],
    Followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    Following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    Watchlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    Chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    Posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    hasLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    hasDisliked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    signupDate: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;