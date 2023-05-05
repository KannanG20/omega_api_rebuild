const mongoose = require('mongoose')

const serverSchema = mongoose.Schema({
    private: {
        type: String,
        default: null
    },
    public: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('servers', serverSchema);