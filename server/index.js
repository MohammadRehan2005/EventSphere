const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const { routes } = require('./App/routes/routes');
require("dotenv").config()

const App = express();

App.use(cors());  
App.use(express.json());

App.use("/routes",routes)


mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`).then(() => {
    App.listen(process.env.PORT, async ()=>{
        console.log("Server start", process.env.PORT)
    })
})
.catch(err => console.log(err));
