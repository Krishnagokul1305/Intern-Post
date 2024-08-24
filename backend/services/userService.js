const userModel = require("../model/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");

exports.getUsers = catchServiceError(async (req, res, next) => {
  const users = await userModel.find();

  return users;
});

exports.getUser = catchServiceError(async (id) => {
  console.log(id);
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("no user found");
  }
  return user;
});

exports.updateUserPassword = catchServiceError(
  async ({ user, newPassword, currentPassword, confirmPassword }) => {
    if (!(await user.isValidPassword(currentPassword, user.password))) {
      throw new Error("Invalid currentPassword");
    }
    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    const updatedUser = await user.save();
    console.log(updatedUser);
    return updatedUser;
  }
);

exports.updateUser = catchServiceError(async ({ id, updateData }) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
});

exports.deleteUser = async (req, res, next) => {
  try {
  } catch (err) {}
};
