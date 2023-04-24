const router = require("express").Router();
const { body } = require('express-validator');

const testimonialController = require("../controllers/testimonialController")

// Validate Response Data
const validateData = [
    body("description").trim(),
    body("author").trim(),
    body("role").trim()
]

router.post('/testimonial', validateData, testimonialController.POST_TESTIMONIAL);
router.get('/testimonials', testimonialController.GET_TESTIMONIAL);

module.exports = router