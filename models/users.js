const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pbId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    whitelist: {
        type: Boolean,
        required: true
    }
},
{ timestamps: { createdAt: 'created_at' } }
)


module.exports = mongoose.model("User", userSchema);
