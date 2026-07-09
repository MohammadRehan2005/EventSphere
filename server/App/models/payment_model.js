const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    razorpayOrderId: {
        type: String,
        default: "",
    },
    razorpayPaymentId: {
        type: String,
        default: "",
    },
    paidAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);