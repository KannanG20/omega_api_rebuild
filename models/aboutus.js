const mongoose = require("mongoose");

const aboutus = mongoose.Schema({
    content : String,
})

module.exports = mongoose.model("AboutUs", aboutus);