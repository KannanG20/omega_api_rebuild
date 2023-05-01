const mongoose = require('mongoose');

const whitelistSchema = mongoose.Schema({
    pbId: [String],
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model('whitelist', whitelistSchema)