const { mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

const User = require("../models/users.js");
const customErrors = require("../utils/customError.js");


// Get All Users
exports.get_users = async (req, res, next)=>{
    try {
        const users = await User.find()
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
exports.post_user = async (req, res, next)=>{
    try {

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()});
        }

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            message: req.body.message
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        return next(error);
    }
}

// Get Single User
exports.get_single_user = async (req, res, next)=>{
    try {
        const { id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(id)
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        let user = await User.findById(id);
        if(!user) {
            throw new customErrors(`user not found with the given id : ${id}`, 404);
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
        const getUpdatedUser = await User.findById(_id);
        res.status(200).json(getUpdatedUser);

    } catch (error) {
        return next(error);
    }
};