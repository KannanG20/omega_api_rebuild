const Stats = require("../models/stats")

exports.post_stats = async (req, res, next) => {
    try {
        
        const userStats = new Stats({
            stats: req.body
        }) 
        const data = await userStats.save()
        res.status(200).json({
            status: 'success',
            results: data
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}

exports.get_stats = async (req, res, next)=> {
    try {
        
        const stats = await Stats.find()
        if(!stats){
            return res.status(400).send("something is wrong")
        }

        res.status(200).json({
            status: 'success',
            results: stats
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}