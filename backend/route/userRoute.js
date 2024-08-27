const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  updatePassword,
} = require("../controller/userController");

const express = require("express");
const { uploadImage, resize } = require("../middleWare/fileUpload");
const { isAuthenticated } = require("../middleWare/authentication");
const offersRoute = require("./offersRoute");

const userRoute = express.Router();

userRoute.route("/").get(getAllUsers).post(createUser);
userRoute.use(isAuthenticated);
userRoute.route("/updatePassword").patch(updatePassword);

userRoute
  .route("/:id")
  .get(getUserById)
  .patch(uploadImage.single("avatar"), resize("user"), updateUser)
  .delete(deleteUser);

userRoute.use("/:userId/offers", offersRoute);

module.exports = userRoute;
