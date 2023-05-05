const mongoose = require('mongoose')

const suggestSchema = mongoose.Schema({
    username: String,
    pbId: String,
    message: String
})

module.exports = mongoose.model('suggestions', suggestSchema);