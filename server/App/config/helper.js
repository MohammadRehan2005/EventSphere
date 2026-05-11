require("dotenv").config();
console.log("EMAIL:", process.env.EMAIL);  // should print your email
console.log("PASS:", process.env.PASS);    // should print your app password
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,    
  },
});

module.exports = { transporter };