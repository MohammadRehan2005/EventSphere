const event_model = require("../models/event_model");
const ticket_model = require("../models/ticket_model");

// create Event
let createEvent = async (req, res) => {
    try {
        let { title, date, location, description, ticketPrice } = req.body;
        let userId = req.body.userId; // comes from checkToken

        let event = new event_model({
            title,
            date,
            location,
            description,
            ticketPrice: ticketPrice || 0,
            createdBy: userId
        });

        let savedEvent = await event.save();
        res.json({
            success: true,
            message: "Event created successfully",
            event: savedEvent
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

//joinEvent
let joinEvent = async (req, res) => {
    try {
        let { eventId } = req.body;
        let userId = req.body.userId; // comes from checkToken middleware

        // check if user already booked this event
        let existingTicket = await ticket_model.findOne({ userId, eventId });
        if (existingTicket) {
            return res.json({
                success: false,
                message: "You have already booked this event"
            });
        }

        // create ticket
        let ticket = new ticket_model({
            userId,
            eventId,
        });

        let savedTicket = await ticket.save();

        res.json({
            success: true,
            message: "Event booked successfully",
            ticket: savedTicket
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

let getAllEvents = async (req, res) => {
    try {
        let events = await event_model.find();
        res.json({
            success: true,
            events
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

let getEventById = async (req, res) => {
    try {
        let event = await event_model.findOne({ _id: req.params.id })
        if (!event) {
            return res.json({ success: false, message: "Event not found" })
        }
        res.json({ success: true, event })
    } catch (error) {
        res.json({ success: false, message: "Something went wrong", error })
    }
}

let getMyTickets = async (req, res) => {
    try {
        let userId = req.body.userId || req.query.userId;

        let tickets = await ticket_model.find({ userId })
            .populate("eventId")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            tickets
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}

module.exports = {createEvent, joinEvent, getAllEvents, getEventById, getMyTickets}