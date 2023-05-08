const mongoose = require("mongoose");
const app = require('./app')



const mongoDB = process.env.MONGO_DB;

// Mongo DB connection 
const mongooseConnect = async ()=> {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to database");
    } catch (error) {
        console.error(error);
    }
}

mongooseConnect();

// Start of backend server
const port = process.env.PORT || 3000;
app.listen(port, (req, res)=>{
    console.log("backend running");
})







