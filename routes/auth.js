const router = require("express").Router();
const { body } = require('express-validator');

const authController = require("../controllers/authController")

// Validate Response Data
const validateData = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").trim()  
]

router.post('/auth', validateData,authController.POST_USER)

module.exports = router