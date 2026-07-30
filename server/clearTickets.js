const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)

const ticket_model = require("./App/models/ticket_model")

ticket_model.deleteMany({}).then(result => {
    console.log("Cleared:", result)
    mongoose.disconnect()
})