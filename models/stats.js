const mongoose = require('mongoose')

const statObj = mongoose.Schema({
    rank: Number,
    playername: String,
    kd: Number,
})

const statSchema = mongoose.Schema({
   stats: {
    type: [statObj],
    default: null
   }
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("Stats", statSchema);
