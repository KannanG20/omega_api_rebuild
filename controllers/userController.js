const { mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')

const Whitelist = require('../models/whitelist')
const User = require("../models/users.js");
const customErrors = require("../utils/customError.js");


// Get All Users
exports.get_users = async (req, res, next)=>{
    try {
        const users = await User.find().select(['-password'])
        if(users.length < 0){
           return res.status(200).json({
                status : "success",
                results: "No Users"
            })
        }
        res.status(200).json({
            status : "success",
            results: users
        });
    } catch (error) {
        return next(new customErrors("something gone wrong", 404));
    }
}

// Post User
exports.post_user_registration = async (req, res, next)=>{
    try {

        if(!req.body.username || !req.body.pbId || !req.body.password){
            return res.status(400).json({
                status: 'failed',
                error: 'All fields are mandatory'
            })
        }
        
        const whitelistlogs = await Whitelist.findOne();
        console.log(whitelistlogs);
        const whitelistedPbs = whitelistlogs.pbId;
        let isWhitelisted = false; // Initialize isWhitelisted to false

        whitelistedPbs.forEach((pbid) => {
        if (pbid === req.body.pbId) {
            isWhitelisted = true;
        }
        });
        const salt = 10
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            pbId: req.body.pbId,
            password: hashPassword,
            whitelist: isWhitelisted
        })

        await newUser.save();
        res.status(200).json({
            status: "success",
            results: "created user"
        });

    } catch (error) {
        console.log(error)
        return next(error);
    }
}

exports.post_user_login = async (req, res, next) => {
    try {
      const userData = {
        pbId: req.body.pbId,
        password: req.body.password,
      };
  
      const user = await User.findOne({ pbId: userData.pbId });
      if (!user) {
        return res.status(404).json({
          status: "failed",
          results: "INVALID CREDENTIALS",
        });
      }
  
      const checkPassword = await bcrypt.compare(userData.password, user.password);
      if (checkPassword) {
        // Deselect the password field before sending the response
        user.password = undefined;
        return res.status(200).json({
          status: "success",
          results: user,
        });
      } else {
        return res.status(404).json({
          status: "failed",
          results: "INVALID CREDENTIALS",
        });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
  

// Get Single User
exports.get_single_user = async (req, res, next)=>{
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id)
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        let user = await User.findById(_id).select(['-password']);
        if(!user) {
            throw new customErrors(`user not found with the given id : ${_id}`, 404);
        }
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
}

// Update Single User
exports.update_user = async (req, res, next)=>{
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        let user = await User.findByIdAndUpdate(_id, {status : true});
        if(!user){
            throw new customErrors(`user not found with the given id: ${_id}`, 404);
        }
        const getUpdatedUser = await User.findById(_id).select(['-password']);
        res.status(200).json(getUpdatedUser);

    } catch (error) {
        return next(error);
    }
};

exports.delete_user = async (req, res, next)=>{
    try {
        
        const { _id } = req.params;
        const deleteUser = User.findByIdAndDelete(_id)
        if(!deleteUser) return res.status(404).json({
            status: 'failed',
            error: "user not found"
        })

        return res.status(200).send("deleted user")

    } catch (error) {
        console.log(error)
        return next(error)
    }
}