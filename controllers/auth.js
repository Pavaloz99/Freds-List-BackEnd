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

const account = async (req, res) => {
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

const logout = async (req, res) => {
    await req.session.destroy();
}


const addUserLike = async (req, res) => {
    try {
        console.log(req.session)
        let currentUser = await db.User.findById(req.session.User._id);
        let user = await db.User.findById(req.params.id);
        if(currentUser._id.toString() !== user._id.toString()){

            await user.Rating.push(1);
            await user.save();

            await currentUser.hasRated.push(user._id);
            await currentUser.save();
            

            res.status(200).json({
                user: user,
                message: "You liked this user"
            });
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

            await user.Rating.push(0);
            await user.save();

            await currentUser.hasRated.push(user._id);
            await currentUser.save();
            

            res.status(200).json({
                user: user,
                message: "You liked this user"
            });
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

    if(currentUser._id.toString() !== user._id.toString()){

        await currentUser.Following.push(user._id);
        await userToFollow.Followers.push(currentUser._id);

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
    account,
    login,
    logout,
    addUserDislike,
    addUserLike,
    follow,
}