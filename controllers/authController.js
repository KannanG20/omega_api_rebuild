
exports.POST_USER = async (req, res, next) => {
    try {
        
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD
        
        if((userData.email == email) && (userData.password == password)){
            return res.status(200).json({
                result : "PERMISSION ACCESSED"
            })
        }

        res.status(400).json({
            result: "PERMISSION DENIED"
        })

    } catch (error) {
        next(error)
    }
}
