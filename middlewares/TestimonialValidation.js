const customError = require('../middlewares/Errors')

const validateData =  (req, res, next)=>{
    const { body: data } = req
    try {
        if(!data.description){
           throw new customError('Description is mandatory', 400)
        }else if(!data.author){
            throw new customError('Author Name is mandatory', 400)
        }else if(!data.role){
            throw new customError('Author Role is mandatory', 400)
        }
    } catch (error) {
        return next()
    }
}

    module.exports = validateData