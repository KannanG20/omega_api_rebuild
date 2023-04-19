const mongoose = require("mongoose");

const terms_conditions = mongoose.Schema({
    content : String,
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("TermsAndConditions", terms_conditions);