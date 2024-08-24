const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  updatePassword,
} = require("../controller/userController");

const express = require("express");
const { uploads, resize } = require("../middleWare/fileUpload");
const { isAuthenticated } = require("../middleWare/authentication");

const userRoute = express.Router();

userRoute.route("/").get(getAllUsers).post(createUser);
userRoute.use(isAuthenticated);
userRoute.route("/updatePassword").patch(updatePassword);

userRoute
  .route("/:id")
  .get(getUserById)
  .patch(uploads.single("avatar"), resize("user"), updateUser)
  .delete(deleteUser);

module.exports = userRoute;
