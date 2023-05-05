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
  
      // check if 100 records exist in the database
      const latestStats = await Stats.find().sort({ createdAt: -1 }).limit(100);
      if (latestStats.length >= 100) {
        // delete previous 100 records
        await Stats.deleteMany({ createdAt: { $lte: latestStats[latestStats.length - 1].createdAt } });
  
        // insert new records
        const newStatsArray = [];
        const latestStatsIds = latestStats.map(stat => stat._id);
        for (let i = 0; i < latestStatsIds.length; i++) {
          newStatsArray.push({
            _id: latestStatsIds[i],
            stats: req.body
          });
        }
        await Stats.insertMany(newStatsArray);
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