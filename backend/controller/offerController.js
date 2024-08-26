const offersService = require("../services/offersService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getAllOffers = catchControllerError(async (req, res, next) => {
  const offers = await offersService.getOffers();
  res.status(200).json({
    status: "success",
    results: offers.length,
    data: offers,
  });
});

exports.getOffer = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const offer = await offersService.getOfferById(id);
  res.status(200).json({
    status: "success",
    data: offer,
  });
});

exports.createOffer = catchControllerError(async (req, res, next) => {
  const newOffer = await offersService.postOffer(req.body);
  res.status(201).json({
    status: "success",
    data: newOffer,
  });
});

exports.approveOffer = catchControllerError(async (req, res, next) => {});

exports.rejectOffer = catchControllerError(async (req, res, next) => {});
