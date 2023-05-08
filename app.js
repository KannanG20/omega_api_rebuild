// app.js
const express = require('express')
const app = express()
const cors = require("cors");
const dotenv = require("dotenv");

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

app.use("/api",userRoute); // User Route
app.use("/api", whitelistRoute)  // User Roles Routes
app.use("/api", livedataRoute)  // Live data routes
app.use("/api", statsRoute)
app.use("/api", suggestionRoute)
app.use("/api", reportsRoute)
app.use("/api", serverRoute)

// Middlewares
app.use(errorHandler)

module.exports = app 
