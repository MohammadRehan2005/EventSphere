const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)

const ticket_model = require("./App/models/ticket_model")

ticket_model.find().then(t => {
    console.log("Total tickets:", t.length)
    console.log("Tickets:", JSON.stringify(t, null, 2))
    mongoose.disconnect()
})