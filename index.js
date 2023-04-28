const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const errorHandler = require("./middlewares/Errors");

const userRoute = require("./routes/userRoute");
const cms = require("./routes/cms");
const userRolesRoute = require("./routes/roles")
const companyRoute = require("./routes/companyRoute");
const testimonial = require("./routes/Testimonial")
const auth = require("./routes/auth")


dotenv.config();
app.use(cors());
app.use(express.json());

const mongoDB = process.env.MONGO_DB;


// Mongo DB connection 
const mongooseConnect = async ()=> {
    await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to database")).catch((err)=> console.log(err));
}
mongooseConnect();

// Start of backend server
app.listen(3000, (req, res)=>{
    console.log("backend running");
})


app.use("/api/v1",userRoute); // User Route
app.use("/api/v1",companyRoute); // Company Routes 
app.use("/api/v1", auth) // Auth Route
app.use("/api/v1", cms); // CMS Routes
app.use("/api/v1", testimonial) // Testimonial Routes
app.use("/api/v1", userRolesRoute)  // User Roles Routes

// Middlewares
app.use(errorHandler)





