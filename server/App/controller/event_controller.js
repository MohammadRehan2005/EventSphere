const event_model = require("../models/event_model");

// create Event
let createEvent =   async (req, res) => {
  const event = new event_model(req.body);
  await event.save();
  res.send({
    status: true,
    message:"Event created successfully",
    event
  });
}

//joinEvent
let joinEvent = async (req,res) => {
  
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

module.exports = {createEvent, joinEvent, getAllEvents, getEventById}