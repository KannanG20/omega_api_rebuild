const mongoose = require("mongoose");

const Whitelist = require("../models/whitelist")
const customErrors = require("../utils/customError.js");


exports.POST_WHITELIST = async (req, res, next)=> {
    try {
        // Get the existing whitelist data from the database
        const whitelist = new Whitelist({
            pbId: req.body.whitelist
        })
        await whitelist.save()
        res.status(200).json({
          status: "success",
          whitelist
        });

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.GET_WHITELISTS = async (req, res, next)=> {
    try {
        
        const whitelists = await Whitelist.find();
        if(!whitelists){
            throw new customErrors("Backend server is not responding", 400)
        }

        res.status(200).json(whitelists)

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.UPDATE_WHITELIST = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const whitelist = await Whitelist.findByIdAndUpdate(_id, { pbId: req.body.pbId }, { new: true });
            if (!whitelist) {
              return res.status(404).json({ msg: 'Whitelist not found' });
            }
            return res.status(200).json(whitelist);

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.DELETE_WHITELIST = async (req, res, next) => {
    try {
        const whitelist = await Whitelist.findById(req.params.id);
        if (!whitelist) {
          return res.status(404).json({ msg: 'Whitelist not found' });
        }
        const pbIdsToDelete = whitelist.pbId.filter(id => !req.body.pbIdsToDelete.includes(id));
        if (pbIdsToDelete.length === 0) {
          return res.status(200).json({
            status: 'success',
            results: 'deleted'
          })
        } else {
          const updatedPbIds = whitelist.pbId.filter(id => !req.body.pbIdsToDelete.includes(id));
          whitelist.pbId = updatedPbIds;
          await whitelist.save();
          return res.status(200).json({
            status: 'success',
            results: 'deleted'
          })
        }
    } catch (error) {
        console.log(error);
        return next(error)
    }
}



