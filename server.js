require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const router = require('./routes');

const app = express();

// use middlewares
app.use(require('cors')());
app.use(require('cookie-parser')());

// connects our back end code with the database
mongoose.connect(
    process.env.DB_CONN_STRING,
    { useCreateIndex: true, useNewUrlParser: true }
);

let db = mongoose.connection;

// checks if connection with the database is successful
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
const API_PORT = 3001;
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));