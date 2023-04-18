const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phoneNo: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    message: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: false
    }
},
{ timestamps: { createdAt: 'created_at' } }
)


module.exports = mongoose.model("Company", companySchema);