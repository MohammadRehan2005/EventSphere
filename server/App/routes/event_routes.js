const express = require("express");
const { createEvent, joinEvent, getAllEvents, getEventById, getMyTickets } = require("../controller/event_controller");
const { checkToken } = require("../middleware/check_token");
const eventRoutes = express.Router();

eventRoutes.post("/create-event", checkToken, createEvent)  
eventRoutes.post("/join-event", checkToken, joinEvent)
eventRoutes.get("/all-events", getAllEvents)
eventRoutes.get("/get-event/:id", getEventById)
eventRoutes.post("/my-tickets", checkToken, getMyTickets)

module.exports = { eventRoutes }