const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event title is required"],
        trim: true,
    },
    date: {
        type: Date,
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
    ticketPrice: {
        type: Number,
        required: true,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);