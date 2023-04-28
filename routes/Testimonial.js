const router = require("express").Router();

const testimonialController = require("../controllers/testimonialController")
const validation = require('../middlewares/TestimonialValidation')


router.post('/testimonial', validation, testimonialController.POST_TESTIMONIAL);
router.get('/testimonials', testimonialController.GET_TESTIMONIAL);
router.get('/testimonial/:_id', testimonialController.GET_SINGLE_TESTIMONIAL)
router.put('/testimonial/:_id', testimonialController.PUT_TESTIMONIAL)
router.delete('/testimonial/:_id', testimonialController.DELETE_TESTIMONIAL)

module.exports = router