const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/Errors");
const cms = require("./routes/cms");
const userRolesRoute = require("./routes/roles")
const partners = require("./routes/Partners")
const companyRoute = require("./routes/companyRoute");
const testimonial = require("./routes/Testimonial")
const auth = require("./routes/auth")
const bodyParser = require('body-parser')
const app = express();

dotenv.config({path: "./vars/.env"});
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))


const mongoDB = process.env.MONGO_DB;

await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to database")).catch((err)=> console.log(err));

app.listen(3000, (req, res)=>{
    console.log("backend running");
})

app.use("/api/v1",userRoute); // User Route
app.use("/api/v1",companyRoute); // Company Routes 
app.use("/api/v1", auth) // Auth Route
app.use("/api/v1", cms); // CMS Routes
app.use("/api/v1", testimonial) // Testimonial Routes
app.use("/api/v1", userRolesRoute)
app.use("/api/v1", partners)

// Middleware for ErrorHandling
app.use(errorHandler)




