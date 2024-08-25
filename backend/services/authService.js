const userModel = require("../model/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const validator = require("validator");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

exports.signup = catchServiceError(async function (userData) {
  const { fullName, password, email, confirmPassword, RegNo, phoneNo, dep } =
    userData;

  if (!fullName) {
    throw new AppError("Full name must be filled", 400);
  }
  if (!password) {
    throw new AppError("Password must be filled", 400);
  }
  if (!email) {
    throw new AppError("Email must be filled", 400);
  }
  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email", 400);
  }
  if (!confirmPassword) {
    throw new AppError("Confirm password must be filled", 400);
  }
  if (!RegNo) {
    throw new AppError("Registration number must be filled", 400);
  }
  if (!phoneNo) {
    throw new AppError("Phone number must be filled", 400);
  }
  if (!dep) {
    throw new AppError("Department must be filled", 400);
  }
  if (!userData.role && !userData.batch) {
    throw new AppError("Batch must be filled", 400);
  }

  const newUser = await userModel.create(userData);
  return newUser;
});

exports.login = catchServiceError(async function (userData) {
  const { email, password } = userData;

  if (!email) {
    throw new AppError("Email must be filled", 400);
  }
  if (!password) {
    throw new AppError("Password must be filled", 400);
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.isValidPassword(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  return user;
});

exports.forgotPassword = catchServiceError(async function (email) {
  if (!email) {
    throw new AppError("Please provide an email", 400);
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new AppError("No user found with this email", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = encryptedToken;
  user.passwordExpireTime = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  return resetToken;
});

exports.resetPassword = catchServiceError(async function ({
  resetToken,
  confirmPassword,
  newPassword,
}) {
  if (!resetToken) {
    throw new AppError("Please provide a reset token", 400);
  }

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: encryptedToken,
    passwordExpireTime: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Token is invalid or has expired", 400);
  }

  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordExpireTime = undefined;

  await user.save();
});
