const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/Errors");
const cms = require("./routes/cms");
const companyRoute = require("./routes/companyRoute");
const testimonial = require("./routes/Testimonial")
const auth = require("./routes/auth")
const app = express();

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json());

const mongoDB = process.env.MONGO_DB;

app.listen(3000, (req, res)=>{
    console.log("backend running");
})

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to database")).catch((err)=> console.log(err));

app.use("/api/v1",userRoute); // User Route
app.use("/api/v1",companyRoute); // Company Routes 
app.use("/api/v1", auth) // Auth Route
app.use("/api/v1", cms); // CMS Routes
app.use("/api/v1", testimonial) // Testimonial Routes

// Middleware for ErrorHandling
app.use(errorHandler)




