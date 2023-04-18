const mongoose = require("mongoose");

const privacyPolicy = require("../models/privacypolicy");
const dataProtection = require("../models/dataProtection");
const aboutUs = require("../models/aboutus");
const termsAndConditions = require("../models/termsandconditions");
const customErrors = require("../utils/customError");


// Get Terms and Conditions
exports.get_terms_and_conditions = async (req, res, next)=>{

    try {
        const getCms = await termsAndConditions.findOne();
        if(getCms == null){
           let termsData = new termsAndConditions();
           const cms = await termsData.save();
           return res.status(200).json(cms);
        }
        res.status(200).json(getCms);
    } catch (error) {
        return next(error);
    }

}
// Update Terms and Conditions
exports.put_terms_and_conditions = async (req, res, next)=>{

    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const updateCms = await termsAndConditions.findByIdAndUpdate(_id, {content : req.body.content});
        if(!updateCms){
            throw new customErrors("No cms found", 404);
        }
        const getUpdatedCms = await termsAndConditions.findById(_id);
        res.status(200).json(getUpdatedCms);

    } catch (error) {
        return next(error);
    }

}

// Get About Us
exports.get_about_us = async (req, res, next)=>{

    try {

        const getCms = await aboutUs.findOne();
        if(getCms == null){
           let aboutSchema = new aboutUs();
           const cms = await aboutSchema.save();
           return res.status(200).json(cms);
        }
        res.status(200).json(getCms);
    } catch (error) {
        return next(error);
    }
}
// Update About Us
exports.put_about_us = async (req, res, next)=>{

    try {
        
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const updateCms = await aboutUs.findByIdAndUpdate(_id, {content : req.body.content});
        if(!updateCms){
            throw new customErrors("No cms found", 404);
        }

        const getUpdatedCms = await aboutUs.findById(_id);
        res.status(200).json(getUpdatedCms);

    } catch (error) {
        return next(error);
    }
}

// Get Data Protection
exports.get_data_protection = async (req, res, next)=>{

    try {

        const getCms = await dataProtection.findOne();
        if(getCms == null){
           const dataProtectSchema = new dataProtection();
           const cms = await dataProtectSchema.save();
           return res.status(200).json(cms);
        }
        res.status(200).json(getCms);
    } catch (error) {
        return next(error);
    }
}
// Update Data Protection
exports.put_data_protection = async (req, res, next)=>{
    
    try {
        
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const updateCms = await dataProtection.findByIdAndUpdate(_id, {content : req.body.content});
        if(!updateCms){
            throw new customErrors("No cms found", 404);
        }

        const getUpdatedCms = await dataProtection.findById(_id);
        res.status(200).json(getUpdatedCms);

    } catch (error) {
        return next(error);
    }
}

// Get Privacy Policy
exports.get_privacy_policy = async (req, res, next)=>{
    try {

        const getCms = await privacyPolicy.findOne();
        if(getCms == null){
           let privacySchema = new privacyPolicy();
           const cms = privacySchema.save();
           return res.status(200).json(cms);
        }
        res.status(200).json(getCms);
    } catch (error) {
        return next(error);
    }
}
// Update Privacy Policy
exports.put_privacy_policy = async (req, res, next)=>{

    try {
        
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const updateCms = await privacyPolicy.findByIdAndUpdate(_id, {content : req.body.content});
        if(!updateCms){
            throw new customErrors("No cms found", 404);
        }

        const getUpdatedCms = await privacyPolicy.findById(_id);
        res.status(200).json(getUpdatedCms);

    } catch (error) {
        return next(error);
    }
}