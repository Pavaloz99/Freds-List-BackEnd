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

const findCategoryElectronics = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Electronics"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryHomeAndBath = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Home And Bath"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryClothing = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Clothing"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryPetSupplies = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Pet Supplies"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryBeautyAndHealth = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Beauty And Health"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryToys = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Toys"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategoryHandmade = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Handmade"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
        if(err) console.log(err);

        if(!foundPost) return res.json({
            message: "No such Posts found"
        });
        res.status(200).json({post: foundPost});
    });
}

const findCategorySports = (req, res) => {
    console.log(req.body);
    db.Post.find({category: "Sports"}).populate('User').exec((err, foundPost) => {
        console.log(foundPost)
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
    findCategoryElectronics,
    findCategoryBeautyAndHealth,
    findCategoryClothing,
    findCategoryHandmade,
    findCategoryHomeAndBath,
    findCategoryPetSupplies,
    findCategorySports,
    findCategoryToys,
}