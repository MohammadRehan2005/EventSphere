const express = require("express");
const { getDashboardStats, getAllAttendees, getAllEvents, createEvent, deleteEvent } = require("../controller/admin_controller");
const { checkAdmin } = require("../middleware/check_admin");
const adminRoutes = express.Router();

adminRoutes.get("/stats", checkAdmin, getDashboardStats)
adminRoutes.get("/attendees", checkAdmin, getAllAttendees)
adminRoutes.get("/events", checkAdmin, getAllEvents)
adminRoutes.post("/create-event", checkAdmin, createEvent)
adminRoutes.delete("/delete-event/:id", checkAdmin, deleteEvent)

module.exports = { adminRoutes }