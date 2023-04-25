const mongoose = require("mongoose");

const user_roles = mongoose.Schema({
    fullname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
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
    mobile: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required : true
    },
    user_access: [{
        type: String,
        default: "all"
    }],
    status: {
        type: Boolean,
        default: true,
    }
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model("roles", user_roles);