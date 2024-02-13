const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv').config();

const app = express();

//default Middleware
app.use(express.json({ extended: true })); // for postman //Used to parse JSON bodies
app.use(cors()); //Middleware for connect server and react (used for server connection with unknown url)
app.use(express.urlencoded({ extended: true })); //for send the data via form //Parse URL-encoded bodies
//app.use(cookieParser());

const port = process.env.PORT || 4040

//db Connection
mongoose
    .connect(process.env.DB_URI)
    .then(console.log("Db Connection successfully"))
    .catch((error) => console.log("connection Error", error))


// Routing
app.use("/api", require("./routes"));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})