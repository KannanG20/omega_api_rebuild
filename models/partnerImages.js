const mongoose = require("mongoose");

const PartnerImage = mongoose.Schema({
    image: String
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("PartnerImage", PartnerImage);