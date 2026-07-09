const jwt = require("jsonwebtoken");
const user_model = require("../models/user_model");

let checkAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        var decoded = jwt.verify(token, process.env.TOKENKEY);

        if (!req.body) {
            req.body = {};
        }

        let user = await user_model.findOne({ _id: decoded._id });

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        req.body.userId = decoded._id;
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
}

module.exports = { checkAdmin };