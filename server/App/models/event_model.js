const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event title is required"],
        trim: true,
    },
    date: {
        type: Date,                             // ✅ Date type instead of String
        required: [true, "Event date is required"],
    },
    location: {
        type: String,
        required: [true, "Event location is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,   // ✅ links event to a user
        ref: "User",
        required: true,
    }
}, { timestamps: true });                       // ✅ adds createdAt and updatedAt

module.exports = mongoose.model("Event", eventSchema);