const express = require('express');
const { userRoutes } = require('./auth_routes');
const { eventRoutes } = require('./event_routes');

let routes = express.Router()

routes.use("/user",userRoutes)
routes.use("/event",eventRoutes)

module.exports = {routes}