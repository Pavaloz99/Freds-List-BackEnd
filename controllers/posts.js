const db = require('../models');

const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) console.log('Error in postsIndex:', err)

        if(!foundPosts) return res.json({
            message: 'No Posts found in database.'
        });

        res.status(200).json({posts: foundPosts})
    });
}

const create = (req, res) => {
    db.Post.create(req.body, (err, savedPost) => {
        if (err) console.log("Error in postsCreate:", err);
        res.status(201).json({ post: savedPost});
    })
}

module.exports = {
    index,
    create,
}