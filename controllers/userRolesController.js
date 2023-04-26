const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")

const Roles = require("../models/roles")
const customErrors = require("../utils/customError.js");


exports.POST_ROLE = async (req, res, next)=> {
    try {
         
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()});
        }
        const salt = 10
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const confirmHashedPassword = await bcrypt.hash(req.body.confirm_password, salt);

        const newUserRole = new Roles({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            confirm_password: confirmHashedPassword,
            user_access: req.body.user_access
        })

        if(req.body.password != req.body.confirm_password){
            throw new customErrors("Password not matched", 400)
        }

        await newUserRole.save();
        res.status(200).json({
            status: "success",
            results: "Created User Role"
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.GET_ROLES = async (req, res, next)=> {
    try {
        
        const getRoles = await Roles.find().select(['-password','-confirm_password']);
        if(!getRoles){
            throw new customErrors("Backend server is not responding", 400)
        }

        res.status(200).json({
            status: "success", 
            results: getRoles
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.GET_SINGLE_ROLE = async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        const getUpdatedRole = await Roles.findById(_id).select(['-password','-confirm_password'])
        res.status(200).json({
            status:"success",
            results: getUpdatedRole
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.UPDATE_ROLE = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        const updateReq = {
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            confirm_password: req.body.password,
            user_access : req.body.user_access
        }

        await Roles.findByIdAndUpdate(_id, updateReq )
        res.status(200).json({
            status:"success",
            results: "Updated user role"
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.DELETE_ROLE = async (req, res, next) => {
    try {
        
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        await Roles.findByIdAndDelete(_id);
        res.status(200).send("Deleted role")

    } catch (error) {
        console.log(error);
        return next(error)
    }
}


