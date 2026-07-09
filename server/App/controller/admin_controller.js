require("dotenv").config();
const event_model = require("../models/event_model");
const ticket_model = require("../models/ticket_model");
const payment_model = require("../models/payment_model");
const user_model = require("../models/user_model");

// Get Dashboard Stats
let getDashboardStats = async (req, res) => {
    try {
        let totalEvents = await event_model.countDocuments();
        let totalTickets = await ticket_model.countDocuments();
        let totalUsers = await user_model.countDocuments();

        let payments = await payment_model.find({ status: "success" });
        let totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

        res.json({
            success: true,
            stats: {
                totalEvents,
                totalTickets,
                totalUsers,
                totalRevenue
            }
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

// Get All Attendees
let getAllAttendees = async (req, res) => {
    try {
        let tickets = await ticket_model.find()
            .populate("userId", "userName userEmail userPhone")
            .populate("eventId", "title date location")
            .sort({ createdAt: -1 });

        res.json({ success: true, tickets });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

// Get All Events
let getAllEvents = async (req, res) => {
    try {
        let events = await event_model.find().sort({ createdAt: -1 });
        res.json({ success: true, events });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

// Create Event
let createEvent = async (req, res) => {
    try {
        let { title, date, location, description, ticketPrice } = req.body;
        let userId = req.body.userId;

        let event = new event_model({
            title,
            date,
            location,
            description,
            ticketPrice,
            createdBy: userId
        });

        let savedEvent = await event.save();
        res.json({
            success: true,
            message: "Event created successfully",
            event: savedEvent
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

// Delete Event
let deleteEvent = async (req, res) => {
    try {
        await event_model.deleteOne({ _id: req.params.id });
        res.json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error });
    }
}

module.exports = { getDashboardStats, getAllAttendees, getAllEvents, createEvent, deleteEvent };