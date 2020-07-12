const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Condition: String,
    Asking: String,
    Image: String,
    Category: String,
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
