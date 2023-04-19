const mongoose = require("mongoose");

const dataProtection = mongoose.Schema({
    content : String,
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("DataProtection", dataProtection);