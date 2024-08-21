const express = require("express");

const { signup, loginUser,forgotPassword,resetPassword } = require("../controller/authController");

const authRoute = express.Router();

authRoute.route("/login").post(loginUser);
authRoute.route("/signup").post(signup);
authRoute.route("/forgotPassword").post(forgotPassword);
authRoute
  .route("/resetPassword/:resetToken")
  .post(resetPassword);

module.exports = authRoute;
