const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    rank: Number,
    playername: String,
    kd: Number,
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("Stats", statSchema);
