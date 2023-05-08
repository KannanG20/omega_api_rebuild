const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const errorHandler = require("./middlewares/Errors");

const userRoute = require("./routes/userRoute");
const whitelistRoute = require("./routes/whitelist")
const livedataRoute = require('./routes/livedataRoute');
const statsRoute = require("./routes/StatsRoute")
const suggestionRoute = require('./routes/suggestionRoute')
const reportsRoute = require('./routes/reportRoute')
const serverRoute = require('./routes/serverRoute')


dotenv.config();
app.use(cors());
app.use(express.json());


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


app.use("/api",userRoute); // User Route
app.use("/api", whitelistRoute)  // User Roles Routes
app.use("/api", livedataRoute)  // Live data routes
app.use("/api", statsRoute)
app.use("/api", suggestionRoute)
app.use("/api", reportsRoute)
app.use("/api", serverRoute)

// Middlewares
app.use(errorHandler)





