const mongoose = require("mongoose");

const privacyPolicy = mongoose.Schema({
    content : String,
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("PrivacyPolicy", privacyPolicy);
