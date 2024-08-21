const express = require("express");

const app = express();

const morgan = require("morgan");

const cors=require("cors")

const authRoute = require("./route/authRoute");

app.use(morgan("dev"));
app.use(cors())
app.use(express.json())

app.use("/auth",authRoute) 

module.exports = app;
