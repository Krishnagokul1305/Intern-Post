const authService = require("../services/authService");
const userService = require("../services/userService");
const { createToken } = require("../utils/jwtProvider");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await userService.getUser(id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await authService.signup(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      throw new Error("this route is not for updating password");
    }
    const updatedUser = await userService.updateUser({
      id: req.user.id,
      updateData: req.body,
    });
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
  } catch (err) {}
};
