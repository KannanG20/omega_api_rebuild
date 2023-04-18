const { mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

const Company = require("../models/company");
const customErrors = require("../utils/customError.js");


// Get All Users
exports.get_companies = async (req, res, next)=>{
    try {
        const companies = await Company.find()
        if(companies.length < 0){
           return res.status(200).json({
                status : "success",
                results: "No Companies"
            })
        }
        res.status(200).json({
            status : "success",
            results: companies
        });
    } catch (error) {
        return next(new customErrors("something gone wrong", 404));
    }
}

// Post Company
exports.post_company = async (req, res, next)=>{
    try {

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()});
        }

        const newCompany = new Company({
            Name: req.body.Name,
            companyName : req.body.companyName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            message: req.body.message
        })

        const company = await newCompany.save();
        res.status(200).json(company);

    } catch (error) {
        return next(error);
    }
}

// Get Single Company
exports.get_single_company = async (req, res, next)=>{
    try {
        const { id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(id)
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        let company = await Company.findById(id);
        if(!company) {
            throw new customErrors(`company not found with the given id : ${id}`, 404);
        }
        res.status(200).json(company);
    } catch (error) {
        next(error);
    }
}

// Update Single Company
exports.update_company = async (req, res, next)=>{
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        let company = await Company.findByIdAndUpdate(_id, {status : true});
        if(!company){
            throw new customErrors(`company not found with the given id: ${_id}`, 404);
        }
        const getUpdatedcompany = await Company.findById(_id);
        res.status(200).json(getUpdatedcompany);

    } catch (error) {
        next(error);
    }
};