const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    userEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    userPassword: {
        type: String,
        required: [true, "Password is required"],
    },
    userPhone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);