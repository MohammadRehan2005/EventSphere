const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        var decoded = jwt.verify(token, process.env.TOKENKEY);
        if (!req.body) {
            req.body = {};
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

module.exports = { checkToken };