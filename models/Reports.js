const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    username: String,
    pbId: String,
    message: String
})

module.exports = mongoose.model('reports', reportSchema);