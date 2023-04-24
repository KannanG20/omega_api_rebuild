const { validationResult } = require("express-validator");

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