const { validationResult } = require("express-validator");
const mongoose = require("mongoose")

const Testimonial = require("../models/testimonial");
const customErrors = require("../utils/customError.js");

exports.POST_TESTIMONIAL = async (req, res, next)=> {

    try {

        const newTesti = new Testimonial({
            description: req.body.description,
            author: req.body.author,
            role: req.body.role
        })

        const saveTesti = await newTesti.save();
        res.status(200).json({
            status: "success",
            results: saveTesti,
        });
    } catch (error) {
        return next(error)
    }
}

exports.GET_TESTIMONIAL = async (req, res, next)=>{
    try {
        
        const getTesti = await Testimonial.find();
        if(!getTesti){
            throw new customErrors('No Testimonials Found', 404)
        }
        res.status(200).json({
            status: "Success",
            results: getTesti
        });
    } catch (error) {
        return next(error)
    }
}

exports.GET_SINGLE_TESTIMONIAL =async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        const getTesti = await Testimonial.findById(_id)
        res.status(200).json({
            status:"success",
            results: getTesti
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.PUT_TESTIMONIAL = async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        const updateReq = {
            description: req.body.description
        }

        const updateTesti = await Testimonial.findByIdAndUpdate(_id, updateReq )
        const getUpdatedTesti = await Testimonial.findById(_id)
        res.status(200).json({
            status:"success",
            results: getUpdatedTesti
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.DELETE_TESTIMONIAL = async (req, res, next)=> {
    try {
        
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }

        const deleteTesti = await Testimonial.findByIdAndDelete(_id);
        res.status(200).send("Deleted Testimonial")

    } catch (error) {
        console.log(error);
        return next(error)
    }
}