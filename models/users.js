const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        min: [4, "First name should consist of minimum 4 characters"],
        required: true
    },
    lastname:{
        type: String,
        min: [1, "Last name should consist of minimum 1 character"],
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
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
{ timestamps: { createdAt: 'created_at' } }
)


module.exports = mongoose.model("User", userSchema);