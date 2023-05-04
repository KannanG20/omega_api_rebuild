const mongoose = require('mongoose')

const statObj = mongoose.Schema({
    rank: Number,
    playername: String,
    kd: Number,
})

const statSchema = mongoose.Schema({
   stats: [statObj]
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("Stats", statSchema);
