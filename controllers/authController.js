const Roles = require("../models/roles")
const { validationResult } = require("express-validator");

exports.POST_USER = async (req, res, next) => {
    try {
          
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error : errors.array()});
        }
        const userData = {
            email: req.body.email,
            password: req.body.password
        };
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD

        const roles =  await Roles.find()
        const data = roles
        let i = 0;

        while ( i < data.length){
            for( const val of data){             
                if((val.email == userData.email) && (val.password == userData.password)){
                    return res.status(200).json({
                        status: "success",
                        results: "PERMISSION ACCESSED",
                        roles: val.user_access
                    })
                }
                if((userData.email == email) && (userData.password == password)){   // DEMO CREDENTIALS IF BACKEND FAILS
                    return res.status(200).json({
                        status: "success",
                        result : "PERMISSION ACCESSED",
                        roles: "all"
                    })
                }
            }
            return res.status(404).json({
                status: "failed",
                results: "INVALID CREDENTIALS"
            })
        }

    } catch (error) {
       return next(error)
    }
}
