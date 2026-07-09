const express = require('express');
const { userRoutes } = require('./auth_routes');
const { eventRoutes } = require('./event_routes');
const { paymentRoutes } = require('./payment_routes');
const { adminRoutes } = require('./admin_routes');

let routes = express.Router()

routes.use("/user", userRoutes)
routes.use("/event", eventRoutes)
routes.use("/payment", paymentRoutes)
routes.use("/admin", adminRoutes)

module.exports = { routes }