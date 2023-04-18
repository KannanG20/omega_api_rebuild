const mongoose = require("mongoose");

const terms_conditions = mongoose.Schema({
    content : String,
})

module.exports = mongoose.model("TermsAndConditions", terms_conditions);