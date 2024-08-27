const catchServiceError = require("../utils/asyncServiceErrorHandler");
const offersModel = require("../model/offersModel");
const AppError = require("../utils/AppError");

exports.getOffers = catchServiceError(async (query) => {
  const offers = await offersModel.find(query);
  return offers;
});

exports.getOfferById = catchServiceError(async (id) => {
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

exports.approveOffer = catchServiceError(async (id) => {
  const offerData = await offersModel.findById(id);
console.log(offerData)
  if (!offerData) {
    throw new AppError("no offer found : Invalid Id", 404);
  }

  if (offerData.status == "approved") {
    throw new AppError("Invalid Operation : already approved", 400);
  }

  if (offerData.status == "rejected") {
    throw new AppError(
      "Invalid Operation : rejected data cannot be approved",
      400
    );
  }

  offerData.status = "approved";
  await offerData.save();
});

exports.rejectOffer = catchServiceError(async ({ id, rejectedReason }) => {
  const offerData = await offersModel.findById(id);

  if (!offerData) {
    throw new AppError("no offer found : Invalid Id", 404);
  }

  if (offerData.status == "rejected") {
    throw new AppError("Invalid Operation : already rejected", 400);
  }

  if (!rejectedReason) {
    throw new AppError("please give a reason for rejecting the document", 400);
  }

  offerData.status = "rejected";
  offerData.rejectedReason = rejectedReason;
  await offerData.save();
});
