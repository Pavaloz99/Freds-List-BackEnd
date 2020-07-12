const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    message: String,
    Post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;