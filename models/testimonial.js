const mongoose = require("mongoose");

const testimonials = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("Testimonial", testimonials);