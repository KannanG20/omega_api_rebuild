const { mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

const Roles = require("../models/roles")
const customErrors = require("../utils/customError.js");


exports.POST_ROLE = async (req, res, next)=> {
    try {
        const newUserRole = new Roles({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            user_access: req.body.user_access
        })

        if(newUserRole.password !== newUserRole.confirm_password){
            throw new customErrors("Password is not matched", 400)
        }

        const role = await newUserRole.save();
        res.status(200).json({
            status: "success",
            results: role
        })

    } catch (error) {
        return next(error)
    }
}

exports.GET_ROLES = async (req, res, next)=> {
    try {
        
        const getRoles = await Roles.find();
        if(!getRoles){
            throw new customErrors("Backend server is not responding", 400)
        }

        res.status(200).json({
            status: "success", 
            results: getRoles
        })

    } catch (error) {
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

        const updateRole = await Roles.findByIdAndUpdate(_id, updateReq )
        const getUpdatedRole = await Roles.findById(_id)
        res.status(200).json({
            status:"success",
            results: getUpdatedRole
        })

    } catch (error) {
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

        const deleteRole = await Roles.findByIdAndDelete(_id);
        res.status(200).send("Deleted role")

    } catch (error) {
        return next(error)
    }
}


