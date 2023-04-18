const router = require("express").Router();
const { body } = require('express-validator');

const userController = require("../controllers/userController")

// Validate Response Data
const validateData = [
    body("firstname").trim().isAlpha().withMessage("firstname should not consist numeric values").isLength({ max: 15 }).withMessage("maximum 15 characters allowed"),
    body("lastname").isAlpha().withMessage("lastname should not consist numeric values").isLength({ max: 15 }).withMessage("maximum 15 characters allowed"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("phoneNo").trim().isNumeric().withMessage("Only Numbers allowed").isMobilePhone().withMessage("Invalid mobile number")  
]

// post Single User
router.post('/user', validateData, userController.post_user);

// Get All Users
router.get('/users', userController.get_users);

// Get Single User
router.get('/user/:id', userController.get_single_user);

// Update Single User
router.put('/user/:_id', userController.update_user);

module.exports = router;



