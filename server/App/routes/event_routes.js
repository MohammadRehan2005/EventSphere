const express = require("express");
const { createEvent, joinEvent, getAllEvents, getEventById } = require("../controller/event_controller");
const eventRoutes = express.Router();

eventRoutes.post("/create-event",createEvent)
eventRoutes.post("/join-event",joinEvent)
eventRoutes.get("/all-events", getAllEvents)
eventRoutes.get("/get-event/:id", getEventById)

module.exports = {eventRoutes}