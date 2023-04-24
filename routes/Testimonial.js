const router = require("express").Router();

const testimonialController = require("../controllers/testimonialController")


router.post('/testimonial', testimonialController.POST_TESTIMONIAL);
router.get('/testimonials', testimonialController.GET_TESTIMONIAL);

module.exports = router