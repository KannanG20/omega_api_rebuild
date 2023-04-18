const errorHandler = (err, req, res, next) =>{

    err.message = err.message || "Internal server error";
    err.code = err.code || 500;

    if(err.code === 11000){
        err.message = "user already exists";
        err.code = 400;
    }

    res.status(err.code).json({
        "success": false,
        "error": err.message
    })
}

module.exports = errorHandler;