const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User =  require("../models/userModel");
const bcrypt = require("bcryptjs");

//registering user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    } 
  });
  

  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

// const authUser = asyncHandler(async function(req, res){
//     const {email, password} = req.body;
//     const user = await User.findOne({ email });

//     if(user){
//         if(user.matchPassword(password)){
//             res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id)
//         });
//         } else {
//             res.status(401);
//             throw new Error("Invalid password");
//         }
//     } else {
//         res.status(401);
//         throw new Error("Invalid id or password");
//     }
// });

const allUsers = asyncHandler(async (req, res)=>{
    //finding the user by name or email either is fine
    const keyword = req.query.search ? {
        $or: [
            {name: { $regex: req.query.search, $options: "i"}},
            {email: { $regex: req.query.search, $options: "i"}}
        ]
    } : {};
    const user = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(user);
});


module.exports = {registerUser, authUser, allUsers}