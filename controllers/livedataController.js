const customErrors = require("../utils/customError.js");
const Livedata = require("../models/livedata")
const mongoose = require("mongoose")

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

exports.update_live_data = async (req, res, next) => {
    try {
      const { _id } = req.params;
      if (!mongoose.isValidObjectId(_id)) {
        throw new customErrors("Invalid Id", 400);
      }
  
      const updating_data = {
        partysize: req.body.partysize,
        teamA: {
          teamAscore: req.body.teamA.teamAscore,
          teamAplayers: req.body.teamA.teamAplayers,
        },
        teamB: {
          teamBscore: req.body.teamB.teamBscore,
          teamBplayers: req.body.teamB.teamBplayers,
        },
        livechat: req.body.livechat,
      };
  
      const options = { new: true }; // Return the updated document
  
      const updatedLivedata = await Livedata.findByIdAndUpdate(_id, updating_data, options);
  
      if (!updatedLivedata) {
        throw new customErrors("No document found with that ID", 404);
      }
  
      return res.status(200).json({
        status: "success",
        result: updatedLivedata,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };
  
