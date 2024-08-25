const express = require("express");

const app = express();

const morgan = require("morgan");

const cors = require("cors");

const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const errorController = require("./controller/errorController");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use(errorController);
module.exports = app;
