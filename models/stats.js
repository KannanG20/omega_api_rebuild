const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    rank: Number,
    playername: String,
    score: Number,
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("Stats", statSchema);
