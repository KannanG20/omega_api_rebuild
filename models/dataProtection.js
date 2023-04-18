const mongoose = require("mongoose");

const dataProtection = mongoose.Schema({
    content : String,
})

module.exports = mongoose.model("DataProtection", dataProtection);