const mongoose = require("mongoose")

const teamAdata = mongoose.Schema({
    score: {
        type:  Number,
        default: null
    },
    players: {
        type: [String],
        default: null
    } 
})

const teamBdata = mongoose.Schema({
    score: {
        type:  Number,
        default: null
    },
    players: {
        type: [String],
        default: null
    } 
})

const livedataSchema = mongoose.Schema({
    partysize: {
        type: Number,
        default: null
    },
    teamA: teamAdata,
    teamB: teamBdata,
    livechat: {
        type: [String],
        default: null
    }
})

module.exports = mongoose.model("livedata", livedataSchema)