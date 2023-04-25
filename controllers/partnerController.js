const mongoose = require("mongoose");

const PartnerImage = require("../models/partnerImages");
const customErrors = require("../utils/customError.js");

exports.POST_IMAGE = async (req, res, next) => {
    try {
        
        const newImg = new PartnerImage({
            image : req.file.path
        })

        const saveImg = await newImg.save();
        if (!saveImg) {
            throw new customErrors("Failed to read the file", 400);
        }
        
        res.status(200).json({
            status: "success",
            results: "Image successfully added"
        })

    } catch (error) {
        return next(error)
    }
}

exports.GET_IMAGES = async (req, res, next)=> {
    try {
        const data = await PartnerImage.find();
        if(!data){
            throw new customErrors("Backend server is not responding", 400)
        }
        res.status(200).json({
            status: "success",
            results: data
        })
    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.DELETE_IMAGE = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const deleteImg = await PartnerImage.findByIdAndDelete(_id);
        res.status(200).json({
            status: "success",
            results: "Deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}