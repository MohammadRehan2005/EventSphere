require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const QRCode = require("qrcode");
const ticket_model = require("../models/ticket_model");
const payment_model = require("../models/payment_model");
const event_model = require("../models/event_model");

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


let createOrder = async (req, res) => {
    try {
        let { ticketId } = req.body;
        let userId = req.body.userId;

        let ticket = await ticket_model.findOne({ _id: ticketId });
        if (!ticket) {
            return res.json({ success: false, message: "Ticket not found" });
        }

        let event = await event_model.findOne({ _id: ticket.eventId });
        let amount = event.ticketPrice || 100; 

        let options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: `receipt_${ticketId}`,
        };

        let order = await instance.orders.create(options);

        
        let payment = new payment_model({
            ticketId,
            userId,
            amount,
            razorpayOrderId: order.id,
            status: "pending",
        });
        await payment.save();

        res.json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID,
            payment,
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}


let verifyPayment = async (req, res) => {
    try {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId } = req.body;

        let sign = razorpay_order_id + "|" + razorpay_payment_id;
        let expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.json({ success: false, message: "Payment verification failed" });
        }

        
        await payment_model.updateOne(
            { razorpayOrderId: razorpay_order_id },
            {
                $set: {
                    status: "success",
                    razorpayPaymentId: razorpay_payment_id,
                    paidAt: new Date(),
                }
            }
        );

       
        let qrData = JSON.stringify({
            ticketId: ticketId,
            paymentId: razorpay_payment_id
        });

        let qrCodeImage = await QRCode.toDataURL(qrData);

        
        await ticket_model.updateOne(
            { _id: ticketId },
            { 
                $set: { 
                    status: "booked",
                    qrCode: qrCodeImage
                } 
            }
        );

        res.json({ success: true, message: "Payment verified successfully" });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

module.exports = { createOrder, verifyPayment };