const mongoose = require("mongoose");

const privacyPolicy = mongoose.Schema({
    content : String,
})

module.exports = mongoose.model("PrivacyPolicy", privacyPolicy);
