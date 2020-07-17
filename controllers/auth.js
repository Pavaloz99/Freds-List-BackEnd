const db = require('../models');
const express = require("express");
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
    try {
        const foundUser =  await db.User.findOne({email: req.body.email});

        if (foundUser) {
            return res.status(400).json({
                status: 400,
                message: "Email address has already been registered. Please try again"
            });
        }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const createdUser = await db.User.create({ ...req.body, password: hash}); // question this
            req.session.User = createdUser;

            return res.status(201).json({
                status: 201,
                message: "success",
                createdUser: createdUser,
            });
    } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Something went wrong. Please try again"
            });
        }
}

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({email: req.body.email})
        if(foundUser) {
            req.session.User = foundUser;
            console.log("this", req.session)
            res.status(200).json({
                message: "You are successfully logged in",
                auth: true,
            })
        } else {
            res.status(401).json({
                message: "Unable to login"
            })
        }
     
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again"
        });
    }
}

const myAccount = async (req, res) => {
    try{
    if(req.session){
        console.log("this", req.session)
    await db.User.findById(req.session.User, function(err, foundUser){
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(foundUser);
        }
    })
    }
} catch(err) {
    console.log(err);
}

   
}

const anyAccount = async (req, res) => {
    await db.User.findById(req.params.id).populate('Posts').exec((err, foundUser) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(foundUser);
        }
    }); 
    } 


const logout = async (req, res) => {
    await req.session.destroy();
}


const addUserLike = async (req, res) => {
    try {
        console.log(req.session)
        let currentUser = await db.User.findById(req.session.User._id);
        let user = await db.User.findById(req.params.id);
            if(currentUser._id.toString() !== user._id.toString()){
                if(currentUser.hasLiked.includes(user._id)){
                    await user.Rating.pop();
                    await user.save();
                    console.log("hello");
                    for(let i = 0; i < currentUser.hasLiked.length; i++){
                        console.log(currentUser.hasLiked[i].toString() === user._id.toString())
                        if(currentUser.hasLiked[i].toString() === user._id.toString()){
                            await currentUser.hasLiked.splice(i, 1);
                            await currentUser.save();
                        }
                    }
    
                    res.status(200).json({
                        user: currentUser,
                        message: "You removed your like"
                    });
                } else if(currentUser.hasDisliked.includes(user._id)){
                    await user.Rating.shift();
                    await user.Rating.push(1);
                    await user.save();

                    for(let i = 0; i < currentUser.hasDisliked.length; i++){
                        if(currentUser.hasDisliked[i].toString() === user._id.toString()){
                            await currentUser.hasDisliked.splice(i, 1);
                        }
                    }
                    
                    await currentUser.hasLiked.push(user._id);
                    await currentUser.save();

                    res.status(200).json({
                        user: currentUser,
                        message: "You swapped to liked"
                    })
                }
                  else{

            await user.Rating.push(1);
            await user.save();

            await currentUser.hasLiked.push(user._id);
            await currentUser.save();
            

            res.status(200).json({
                user: user,
                message: "You liked this user"
            });
        }
        } else {
            console.log("Nice Try");
            res.status(401).json({
                Message: "Nope"
            })
        }
    } catch(err){
        console.log(err)
    }
}

const addUserDislike = async (req, res) => {
    try {
        let currentUser = await db.User.findById(req.session.User._id);
        let user = await db.User.findById(req.params.id);

        if(currentUser._id.toString() !== user._id.toString()){
            if(currentUser.hasDisliked.includes(user._id)){
                await user.Rating.shift();
                await user.save();

                for(let i = 0; i < currentUser.hasDisliked.length; i++){
                    if(currentUser.hasDisliked[i].toString() === user._id.toString()){
                        await currentUser.hasDisliked.splice(i, 1);
                    }
                }
                await currentUser.save();

                res.status(200).json({
                    user: user,
                    message: "You removed your dislike"
                });
            } else if(currentUser.hasLiked.includes(user._id)){
                await user.Rating.pop();
                await user.Rating.unshift(0);
                await user.save();

                    for(let i = 0; i < currentUser.hasLiked.length; i++){
                        if(currentUser.hasLiked[i].toString() === user._id.toString()){
                            await currentUser.hasLiked.splice(i, 1);
                            await currentUser.save();
                        }
                    }
                    
                    await currentUser.hasDisliked.push(user._id);
                    await currentUser.save();
                    res.status(200).json({
                        message: "Swapped to Unlike"
                    })
            } 
            else{
            await user.Rating.unshift(0);
            await user.save();

            await currentUser.hasDisliked.push(user._id);
            await currentUser.save();
            

            res.status(200).json({
                user: user,
                message: "You liked this user"
            });
            }
        } else {
            console.log("Nice Try");
            res.status(401).json({
                message: "Nope"
            })
        }
    } catch(err){
        console.log(err)
    }
}

const follow = async (req, res) => {
    let currentUser = await db.User.findById(req.session.User._id);
    let userToFollow = await db.User.findById(req.params.id);

    if(currentUser._id.toString() !== userToFollow._id.toString()){

        await currentUser.Following.push(userToFollow._id);
        await userToFollow.Followers.push(currentUser._id);

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({
            status: 200,
            message: `You've followed ${userToFollow.username}`,
        });
    } else {
        res.status(401).json({
            message: "Nope"
        });
    }
}


module.exports = {
    register,
    myAccount,
    anyAccount,
    login,
    logout,
    addUserDislike,
    addUserLike,
    follow,
}