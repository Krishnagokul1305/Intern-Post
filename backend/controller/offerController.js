const offersService = require("../services/offersService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getAllOffers = catchControllerError(async (req, res, next) => {
  let query = {};
  if (req.params.userId) {
    query = { student: req.params.userId };
  }

  let params=req.query
  console.log(req.query)

  const offers = await offersService.getOffers({query,params});
  res.status(200).json({
    status: "success",
    results: offers.length,
    data: { ...offers },
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
  console.log(id);

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

exports.offerTodayStats = catchControllerError(async (req, res, next) => {});

exports.offerOverallStats = catchControllerError(async (req, res, next) => {
  const stats = await offersService.totalStats();
  res.status(200).json({
    status: "success",
    data: stats,
  });
});

exports.todayActivities = catchControllerError(async (req, res, next) => {
  const activites = await offersService.todayActivities();
  res.status(200).json({
    status: "success",
    result: activites.length,
    data: activites,
  });
});

exports.getFiveDaysStats = catchControllerError(async (req, res, next) => {
  const stats = await offersService.fiveDaysStats();
  res.status(200).json({
    status: "success",
    result: stats.length,
    data: stats,
  });
});
