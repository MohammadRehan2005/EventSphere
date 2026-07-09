const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    qrCode: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["booked", "cancelled", "used"],
        default: "booked",
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);