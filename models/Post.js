const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true
    },
    asking: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: Buffer,
    },
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
