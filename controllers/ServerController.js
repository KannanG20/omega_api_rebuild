const { mongoose } = require("mongoose");

const Server = require('../models/Servers')

exports.post_server = async (req, res, next)=> {
    try {
        
        const server = new Server({
            private: req.body.private,
            public: req.body.public
        })

        await server.save()
        res.status(200).send('created servers config')

    } catch (error) {
        return next(error)
    }
}

exports.get_servers = async (req, res, next)=> {
    try {
        
        const servers = await Server.findOne()
        if(!servers){
            return res.status(400).send("server down")
        }
        res.status(200).json({
            status: 'success',
            servers
        })

    } catch (error) {
        return next(error)
    }
}

exports.update_servers = async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const data = {
            private: req.body.private,
            public: req.body.public
        }
        await Server.findByIdAndUpdate(_id, data)
        res.status(200).json({
            status: 'success',
            result: 'Updated servers'
        })
    } catch (error) {
        return next(error)
    }
}