const Report = require('../models/Reports')

exports.post_report = async (req, res, next)=> {
    try {
        
        const newreport = new Report({
            username: req.body.username,
            pbId: req.body.pbId,
            message: req.body.message
        })

        await newreport.save()
        res.status(200).send("Posted user report")
    } catch (error) {
        return next(error)
    }
}

exports.get_reports = async (req, res, next)=> {
    try {
        
        const reports = await Report.find()
        if(!reports){
            return res.status(400).send("something went wrong")
        }

        res.status(200).json({
            status: 'success',
            results: reports
        })

    } catch (error) {
        return next(error)
    }
}

exports.get_report = async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const report = await Report.findById(_id)
        if(!report){
            return res.status(400).send("No report")
        }
        res.status(200).json({
            status: 'success',
            results: report
        })

    } catch (error) {
        return next(error)
    }
}