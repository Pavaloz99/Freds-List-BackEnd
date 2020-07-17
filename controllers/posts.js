const db = require('../models');
const multer = require('multer');


const index = async (req, res) => {
    await db.Post.find({}).populate('User').exec( (err, foundPosts) => {
        if (err) console.log('Error in postsIndex:', err)

        if(!foundPosts) return res.json({
            message: 'No Posts found in database.'
        });

        res.status(200).json({posts: foundPosts})
    });
}


const grabOne = (req, res) => {
    db.Post.findById(req.params.id).populate('User').exec((err, foundPost) => {
        if (err) console.log(err);

        if(!foundPost) return res.json({
            message: 'No such Post found in database'
        });
        console.log(req.session)
        res.status(200).json({post: foundPost});
    });
}

const findCategory = (req, res) => {
    console.log(req.body);
    db.Post.find({Category: req.body}).populate('User').exec((err, foundPost) => {
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}


const create = async (req, res) => {
    try{
    let post = await db.Post.create({...req.body, User: req.session.User._id});
    console.log(req.body);
    let user = await db.User.findById(req.session.User._id);
    console.log("This one", req.session);

        post.image = await req.file.buffer;
        await post.save();
        await user.totalListings ++;
        await user.Posts.push(post);
        await user.save();
        

        res.status(201).json({ post: post});
    } catch(err) {
        console.log(err);
    }
}


const editPost = async (req, res) => {
    try {
        const updatedPost = await db.Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(req.file);
        
        updatedPost.image = await req.file.buffer;
        await updatedPost.save();

        res.status(200).json({
            status: "200",
            message: "Post Updated Successfully",
            post: updatedPost,
        });
    } catch(err){
        console.log(err)
    }
}



const drop = async (req, res) => {
    try{
    const deletedPost = await db.Post.findByIdAndDelete(req.params.id);
    if(deletedPost.User){
        const removeUser = await db.User.remove({
            Posts: deletedPost._id,
        });
    }
    res.status(200).json({
        status: 200,
        message: "Post Deleted Successfully"
    });
    } catch(err) {
    console.log(err);
    }
}


module.exports = {
    index,
    create,
    drop,
    grabOne,
    editPost,
    findCategory,
}