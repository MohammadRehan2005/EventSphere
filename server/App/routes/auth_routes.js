const express = require('express');
const { checkToken } = require('../middleware/check_token');
const { sendOTP, createUser, login, changePassword } = require('../controller/auth_controller');

let userRoutes=express.Router()
userRoutes.post('/send-otp',sendOTP)
userRoutes.post('/create',createUser)
userRoutes.post('/login',login)
userRoutes.post('/change-password',checkToken,  changePassword)


module.exports={userRoutes}