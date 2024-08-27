const userModel = require("../model/userModel");
const { decodeToken } = require("../utils/jwtProvider");

const AppError = require("../utils/AppError"); // Import the AppError class
const catchControllerError = require("../utils/asyncControllerError"); // Import the catchControllerError function

exports.isAuthenticated = catchControllerError(async (req, res, next) => {
  // Check if there is a token
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return next(new AppError("Please provide authorization token", 400));
  }

  // Verify the token
  const token = req.headers.authorization.split(" ")[1];
  const decoded = decodeToken(token);

  // Get the user from the DB
  const user = await userModel.findById(decoded.id).select("+password");
  if (!user) {
    return next(new AppError("No user found", 404));
  }

  // Check if the user changed the password after the token was created
  if (user.hasChangedPassword(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed the password. Please login again!",
        401
      )
    );
  }

  console.log(user)

  req.user = user;
  next();
});

exports.isAuthorized = (...authRoles) =>
  catchControllerError(async (req, res, next) => {
    if (!authRoles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this route", 401)
      );
    }

    next();
  });
