const router = require("express").Router();
const { body } = require('express-validator');

const companyController = require("../controllers/companyController")

// Validate Response Data
const validateData = [
    body("Name").trim().isAlpha().withMessage("firstname should not consist numeric values").isLength({ max: 15 }).withMessage("maximum 15 characters allowed"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("phoneNo").trim().isNumeric().withMessage("Only Numbers allowed").isMobilePhone().withMessage("Invalid mobile number")  
]

// post Single User
router.post('/company', validateData, companyController.post_company);

// Get All Users
router.get('/companies', companyController.get_companies);

// Get Single User
router.get('/company/:id', companyController.get_single_company);

// Update Single User
router.put('/company/:_id', companyController.update_company);

module.exports = router;



