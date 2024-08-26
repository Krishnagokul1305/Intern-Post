const catchServiceError = require("../utils/asyncServiceErrorHandler");
const offersModel = require("../model/offersModel");
const AppError = require("../utils/AppError");

exports.getOffers = catchServiceError(async () => {
  const offers = await offersModel.find();
  return offers;
});

exports.getOfferById = catchServiceError(async (id) => {
  console.log(id);
  const offer = await offersModel.findById(id);

  if (!offer) {
    throw new AppError("no offers found", 404);
  }

  return offer;
});

exports.postOffer = catchServiceError(async (offerData) => {
  const newOffer = await offersModel.create(offerData);
  return newOffer;
});

exports.approveOffer = catchServiceError(async () => {});

exports.rejectOffer = catchServiceError(async () => {});
