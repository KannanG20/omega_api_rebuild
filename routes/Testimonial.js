const router = require("express").Router();
const express = require("express")
const app = express();

const testimonialController = require("../controllers/testimonialController")
const customError = require('../middlewares/Errors')

const validateData = app.use('/', (req, res, next)=>{
    const { body: data } = req
    try {
        if(!data.description){
           throw new customError('Description is mandatory', 400)
        }else if(!data.author){
            throw new customError('Author Name is mandatory', 400)
        }else if(!data.role){
            throw new customError('Author Role is mandatory', 400)
        }
    } catch (error) {
        return next()
    }
    next();
})

router.post('/testimonial', validateData,testimonialController.POST_TESTIMONIAL);
router.get('/testimonials', testimonialController.GET_TESTIMONIAL);
router.get('/testimonial/:_id', testimonialController.GET_SINGLE_TESTIMONIAL)
router.put('/testimonial/:_id', testimonialController.PUT_TESTIMONIAL)
router.delete('/testimonial/:_id', testimonialController.DELETE_TESTIMONIAL)

module.exports = router