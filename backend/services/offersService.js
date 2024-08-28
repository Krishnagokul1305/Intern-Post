const catchServiceError = require("../utils/asyncServiceErrorHandler");
const offersModel = require("../model/offersModel");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getOffers = catchServiceError(async ({ query, params }) => {
  const features = new ApiFeatures(offersModel.find(query), params)
    .filter()
    .limit()
    .sort()
    .page();
  const offers = await features.query;
  const totalPages = await offersModel.countDocuments();
  return { offers, totalPages };
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

exports.totalStats = catchServiceError(async () => {
  const stats = await offersModel.aggregate([
    {
      $group: {
        _id: "$status",
        total: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        statusStats: { $push: { status: "$_id", total: "$total" } },
        overallTotal: { $sum: "$total" },
      },
    },
    {
      $project: {
        _id: 0,
        statusStats: 1,
        overallTotal: 1,
      },
    },
  ]);

  return stats[0];
});

exports.todayActivities = catchServiceError(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the day

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to the start of the next day

  const query = {
    updatedAt: { $gte: today, $lt: tomorrow },
    status: { $in: ["approved", "rejected"] },
  };

  const todayactivities = await offersModel.find(query).limit(5);

  return todayactivities;
});

exports.fiveDaysStats = catchServiceError(async () => {
  const fiveDaysBefore = new Date();
  fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);

  const stats = await offersModel.aggregate([
    {
      $match: {
        createdAt: { $gte: fiveDaysBefore },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        uploads: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Optional: Sort by date
    },
  ]);

  return stats;
});
