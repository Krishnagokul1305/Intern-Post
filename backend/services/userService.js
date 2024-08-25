const userModel = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchServiceError = require("../utils/asyncServiceErrorHandler");

exports.getUsers = catchServiceError(async (req, res, next) => {
  const users = await userModel.find();
  return users;
});

exports.getUser = catchServiceError(async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new AppError("No user found with this ID", 404);
  }
  return user;
});

exports.updateUserPassword = catchServiceError(
  async ({ user, newPassword, currentPassword, confirmPassword }) => {
    if (!(await user.isValidPassword(currentPassword, user.password))) {
      throw new AppError("Invalid current password", 400);
    }

    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    const updatedUser = await user.save({ validateBeforeSave: false });
    return updatedUser;
  }
);

exports.updateUser = catchServiceError(async ({ id, updateData }) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError("No user found with this ID", 404);
  }

  return updatedUser;
});

exports.deleteUser = catchServiceError(async (id) => {
  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    throw new AppError("No user found with this ID", 404);
  }

  return null;
});
