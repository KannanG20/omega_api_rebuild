const mongoose = require("mongoose")

const playersA = mongoose.Schema({
    name: String,
    display_id: String,
    client: Number
})
const playersB = mongoose.Schema({
    name: String,
    display_id: String,
    client: Number
})
const teamAdata = mongoose.Schema({
    teamAscore: {
        type:  Number,
        default: null
    },
    teamAplayers: {
        type: [playersA],
        default: null
    } 
})

const teamBdata = mongoose.Schema({
    teamBscore: {
        type:  Number,
        default: null
    },
    teamBplayers: {
        type: [playersB],
        default: null
    } 
})

const livedataSchema = mongoose.Schema({
    partysize: {
        type: Number,
        default: null
    },
    maxsize: {
        type: Number,
        default: 9
    },
    teamA: teamAdata,
    teamB: teamBdata,
    livechat: {
        type: [String],
        default: null
    }
})

module.exports = mongoose.model("livedata", livedataSchema)