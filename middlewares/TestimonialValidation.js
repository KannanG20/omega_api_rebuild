
const ValidateData =  (req, res, next)=>{
    const { body: data } = req
        if(!data.description){
           return res.status(400).json({
            status: "failed",
            error: "Description is a mandatory field"
           })
        }else if(!data.author){
            return res.status(400).json({
                status: "failed",
                error: "Author Name is a mandatory field"
               })
        }else if(!data.role){
            return res.status(400).json({
                status: "failed",
                error: "Author Role is a mandatory field"
               })
        }
    next()
}

module.exports = ValidateData