const express = require("express");
const { createOrder, verifyPayment } = require("../controller/payment_controller");
const { checkToken } = require("../middleware/check_token");
const paymentRoutes = express.Router();

paymentRoutes.post("/create-order", checkToken, createOrder)
paymentRoutes.post("/verify-payment", checkToken, verifyPayment)

module.exports = { paymentRoutes }