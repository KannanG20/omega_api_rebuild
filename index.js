const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/Errors");
const cms = require("./routes/cms");
const customErrors = require("./utils/customError");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const mongoDB = process.env.MONGO_DB;
const mongoState = mongoose.connection.readyState;

app.listen(3000, (req, res)=>{
    console.log("backend running");
})

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to database")).catch((err)=> console.log(err));

// If mongodb disconnects this Invokes!
app.use((req, res, next)=>{
    if(mongoState === 0 || mongoState === 3){
        return next(new customErrors("MongoDB Disconnected", 500)); 
     }
})

app.use("/api/v1",userRoute); // User Routes
app.use("/api/v1", cms); // CMS Routes

// Middleware for ErrorHandling
app.use(errorHandler)




