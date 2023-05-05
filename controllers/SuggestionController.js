const Suggestion = require('../models/suggestion')

exports.post_suggestion = async (req, res, next)=> {
    try {
        
        const newSuggestion = new Suggestion({
            username: req.body.username,
            pbId: req.body.pbId,
            message: req.body.message
        })

        await newSuggestion.save()
        res.status(200).send("Posted user suggestion")
    } catch (error) {
        return next(error)
    }
}

exports.get_suggestions = async (req, res, next)=> {
    try {
        
        const suggestions = await Suggestion.find()
        if(!suggestions){
            return res.status(400).send("something went wrong")
        }

        res.status(200).json({
            status: 'success',
            results: suggestions
        })

    } catch (error) {
        return next(error)
    }
}

exports.get_suggestion = async (req, res, next)=> {
    try {
        const { _id } = req.params;
        let validId = mongoose.isObjectIdOrHexString(_id);
        if(!validId){
            throw new customErrors("Invalid Id", 400);
        }
        const suggestion = await Suggestion.findById(_id)
        if(!suggestion){
            return res.status(400).send("No suggestion")
        }
        res.status(200).json({
            status: 'success',
            results: suggestion
        })

    } catch (error) {
        return next(error)
    }
}