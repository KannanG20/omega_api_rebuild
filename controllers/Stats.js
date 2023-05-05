const Stats = require("../models/stats")

exports.post_stats = async (req, res, next) => {
    try {
      // find the latest record and remove it
      const latestStat = await Stats.findOneAndDelete().sort({ createdAt: -1 });
  
      // create a new record with the request body
      const newStats = new Stats({
        stats: req.body
      });
      const data = await newStats.save();
  
      res.status(200).json({
        status: 'success',
        results: data
      });
    } catch (error) {
      console.log(error);
      return next(error);
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
            stats
        })

    } catch (error) {
        console.log(error);
        return next(error)
    }
}