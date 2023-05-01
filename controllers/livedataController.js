const customErrors = require("../utils/customError.js");
const Livedata = require("../models/livedata")

exports.post_live_data = async (req, res, next)=>{
    try {
        
        const livedatafrombs = new Livedata({
            partysize: req.body.partysize,
            teamA: {
                score: req.body.teamAscore,
                players: req.body.teamAplayers
            },
            teamB: {
                score: req.body.teamBscore,
                players: req.body.teamBplayers
            },
            livechat: req.body.livechat
        })

        const saveData = await livedatafrombs.save()

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

exports.get_live_data = async (req, res, next)=>{
    try {
        
        const getlivedata = await Livedata.findOne();
        if(!getlivedata) return res.status(400).json({
            status: 'failed',
            error: "something went wrong"
        })

        return res.status(200).json({
            status: 'success',
            livedata: getlivedata
        })

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

exports.update_live_data = async (req, res, next)=> {
    try {
        
        const { _id } = req.params
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const updating_data = {
            partysize: req.body.partysize,
            teamA: {
                score: req.body.teamAscore,
                players: req.body.teamAplayers
            },
            teamB: {
                score: req.body.teamBscore,
                players: req.body.teamBplayers
            },
            livechat: req.body.livechat
        }
        const updatelivedata = await Livedata.findByIdAndUpdate(_id, updating_data)
        return res.status(200).json({
            status: 'success',
            result: 'updating live data'
        })

    } catch (error) {
        console.log(error)
        return next(error)
    }
}