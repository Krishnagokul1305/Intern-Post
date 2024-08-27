const authService = require("../services/authService");
const userService = require("../services/userService");
const { createToken } = require("../utils/jwtProvider");
const catchControllerError = require("../utils/asyncControllerError");
const AppError = require("../utils/AppError");

exports.getAllUsers = catchControllerError(async (req, res, next) => {
  const users = await userService.getUsers();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.getUserById = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.createUser = catchControllerError(async (req, res, next) => {
  const newUser = await authService.signup(req.body);
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.updateUser = catchControllerError(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError("This route is not for updating password", 400));
  }
  console.log(req.user)
  const updatedUser = await userService.updateUser({
    id: req.user.id,
    updateData: req.body,
  });
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.updatePassword = catchControllerError(async (req, res, next) => {
  console.log(req.body);
  const updatedUser = await userService.updateUserPassword({
    user: req.user,
    newPassword: req.body.newPassword,
    currentPassword: req.body.currentPassword,
    confirmPassword: req.body.newPassword,
  });
  const token = createToken(updatedUser.id);
  res.status(200).json({
    status: "success",
    token,
    data: updatedUser,
  });
});

exports.deleteUser = catchControllerError(async (req, res, next) => {
  await userService.deleteUser(req.user.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
