const Stats = require("../models/stats")

exports.post_stats = async (req, res, next) => {
    try {
      const newStats = new Stats({
        stats: req.body
      });
      const data = await newStats.save();
      res.status(200).json({
        status: 'success',
        results: data
      });
  
      // delete previous record if it exists
      const latestStat = await Stats.findOne().sort({ createdAt: -1 });
      if (latestStat) {
        await latestStat.remove();
      }
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