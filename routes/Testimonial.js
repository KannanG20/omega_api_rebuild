const router = require("express").Router();
const express = require("express")
const app = express();

const testimonialController = require("../controllers/testimonialController")

const validateData = app.use('/testimonial', (req, res, next)=>{
    const { body: data } = req

    if(!data.description){
        return res.status(400).json({
            status: "failed",
            error: "Please provide description"
        })
    }else if(!data.author){
        return res.status(400).json({
            status: "failed",
            error: "Please provide author name"
        })
    }else if(!data.role){
        return res.status(400).json({
            status: "failed",
            error: "Please provide author role"
        })
    }
    next();
})

router.post('/testimonial', validateData,testimonialController.POST_TESTIMONIAL);
router.get('/testimonials', testimonialController.GET_TESTIMONIAL);
router.get('/testimonial/:_id', testimonialController.GET_SINGLE_TESTIMONIAL)
router.put('/testimonial/:_id', testimonialController.PUT_TESTIMONIAL)
router.delete('/testimonial/:_id', testimonialController.DELETE_TESTIMONIAL)

module.exports = router