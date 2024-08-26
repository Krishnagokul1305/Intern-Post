const offersService = require("../services/offersService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getAllOffers = catchControllerError(async (req, res, next) => {
  let query = {};
  if (req.params.userId) {
    query = { student: req.params.userId };
  }

  const offers = await offersService.getOffers(query);
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

exports.approveOffer = catchControllerError(async (req, res, next) => {
  const { id } = req.params;

  await offersService.approveOffer(id);

  res.status(200).json({
    status: "success",
    message: "approved",
  });
});

exports.rejectOffer = catchControllerError(async (req, res, next) => {
  const { id } = req.params;

  await offersService.rejectOffer({
    id,
    rejectedReason: req.body.rejectedReason,
  });

  res.status(200).json({
    status: "success",
    message: "rejected",
  });
});
