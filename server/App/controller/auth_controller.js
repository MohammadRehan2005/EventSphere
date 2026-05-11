require("dotenv").config();
let jwt = require('jsonwebtoken');
let myMap = new Map();
const bcrypt = require("bcrypt");
const e = require("cors");
const user_model = require('../models/user_model');
const { transporter } = require('../config/helper');
const saltRounds = 10;
let sendOTP = async (req, res) => {
    let { userEmail } = req.body;

    let userCheck = await user_model.findOne({ userEmail });

    if (userCheck) {
        res.json({
            status: false,
            message: "Email Id Already Exist...",
        });
    } else {
        let OTP = Math.floor(1000 + Math.random() * 9000).toString(); // always 4 digits

        myMap.set(userEmail, OTP);  // key = email, value = OTP

        await transporter.sendMail({
            from: '"EVENTSPHERE" <rehanmohammad853@gmail.com>',
            to: userEmail,
            subject: "Your EventSphere Verification Code",
            text: `Your OTP is ${OTP}. It is valid for 5 minutes.`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 10px;">
            
            <h2 style="color: #2563eb; text-align: center;">EventSphere</h2>
            
            <p style="color: #333; font-size: 16px;">Hello,</p>
            
            <p style="color: #333; font-size: 16px;">
                Thank you for registering with <b>EventSphere</b>. 
                Use the OTP below to verify your email address:
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <span style="
                    font-size: 36px; 
                    font-weight: bold; 
                    color: #2563eb; 
                    letter-spacing: 10px;
                    padding: 10px 20px;
                    border: 2px dashed #2563eb;
                    border-radius: 8px;
                ">${OTP}</span>
            </div>

            <p style="color: #666; font-size: 14px;">
                ⏱️ This OTP is valid for <b>5 minutes</b> only.
            </p>

            <p style="color: #666; font-size: 14px;">
                🔒 Do not share this OTP with anyone. EventSphere will never ask for your OTP.
            </p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

            <p style="color: #999; font-size: 12px; text-align: center;">
                If you did not request this OTP, please ignore this email.
            </p>

            <p style="color: #999; font-size: 12px; text-align: center;">
                © 2026 EventSphere. All rights reserved.
            </p>

        </div>
    `,
        });

        res.json({
            status: true,
            message: "OTP sent successfully to your email",
        });
    }
};

let createUser = async (req, res) => {
    let { otp, userEmail } = req.body;       // get email from body too
    let backendOTP = myMap.get(userEmail);   // look up OTP by that email
    if (otp == backendOTP) {
        let { userName, userEmail, userPassword, userPhone } = req.body;
        const hash = bcrypt.hashSync(userPassword, saltRounds);

        let obj = {
            userName,
            userEmail,
            userPassword: hash,
            userPhone,
        };

        let user = await user_model(obj);
        let resObj = await user.save();
        res.send({
            success: true,
            message: "user Created",
            resObj,
        });
        myMap.delete(userEmail);  // clean up after successful registration
    } else {
        res.json({
            success: false,
            message: "Invalid OTP",
        });
    }
};

let login = async (req, res) => {
    let { loginEmail, loginPassword } = req.body;

    //Login Email Check

    let userCheck = await user_model.findOne({ userEmail: loginEmail });

    if (userCheck) {
        let dbPassword = userCheck.userPassword;


        if (bcrypt.compareSync(loginPassword, dbPassword)) {

            let token = jwt.sign({ _id: userCheck._id }, process.env.TOKENKEY, { expiresIn: "1d" });  //token dies after 1 day

            res.json({
                success: true,
                message: "Login Successfull",
                userCheck,
                token
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Password",
            });
        }
    } else {
        res.json({
            success: false,
            message: "Invalid Email Id",
        });
    }
};


let changePassword = async (req, res) => {

    let { userId, confirmPassword, newPassword, oldPassword } = req.body;

    let userCheck = await user_model.findOne({ _id: userId });
    let dbPassword = userCheck.userPassword;
    if (bcrypt.compareSync(oldPassword, dbPassword)) { //True

        if (newPassword === confirmPassword) {
            let hash = bcrypt.hashSync(newPassword, saltRounds); //

            let updatedUser = await user_model.updateOne(
                { _id: userId },
                { $set: { userPassword: hash } }
            );
            return res.json({
                success: true,
                message: "Password Changed Successfully",
                updatedUser
            });
        }
        else {
            return res.json({
                success: false,
                message: "New Password and Confirm Password do not match",
            });
        }

    }
    else {
        return res.json({
            success: false,
            message: "Invalid Old Password",
        });
    }

}

module.exports = { sendOTP, createUser, login, changePassword };