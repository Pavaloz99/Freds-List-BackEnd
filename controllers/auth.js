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
                createdUser
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
            console.log(req.session)
            res.json({
                message: "You are successfully logged in",
                auth: true,
            })
        } else {
            res.json({
                messeage: "Unable to login"
            })
        }
        // console.log(foundUser)
        // if(!foundUser){
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Incorrect Email or Password"
        //     });
        // }
        // const match = await bcrypt.compare(req.body.password, foundUser.password);
        // if(!match) {
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Incorrect Email or Password"
        //     });
        // }
        // console.log(req.session.id)
         
        // return foundUser;
        
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
        console.log(req.session)
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


module.exports = {
    register,
    account,
    login,
    logout,
}