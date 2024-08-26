const express = require("express");
const {
  createOffer,
  getAllOffers,
  getOffer,
} = require("../controller/offerController");

const offersRoute = express.Router();

offersRoute.route("/").get(getAllOffers).post(createOffer);

offersRoute.route("/:id").get(getOffer);

module.exports = offersRoute;
