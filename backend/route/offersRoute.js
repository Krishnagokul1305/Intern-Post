const express = require("express");
const {
  createOffer,
  getAllOffers,
  getOffer,
  approveOffer,
  rejectOffer,
  offerOverallStats,
  todayActivities,
  getFiveDaysStats,
} = require("../controller/offerController");
const { uploadFiles, resize } = require("../middleWare/fileUpload");

const offersRoute = express.Router({ mergeParams: true });

offersRoute
  .route("/")
  .get(getAllOffers)
  .post(
    uploadFiles.fields([
      { name: "internshipOfferLetter", maxCount: 1 },
      { name: "jobOfferLetter", maxCount: 1 },
      { name: "letterOfIntent", maxCount: 1 },
    ]),
    resize("offers"),
    createOffer
  );

offersRoute.route("/overAll-stats").get(offerOverallStats);
offersRoute.route("/todayActivities").get(todayActivities);
offersRoute.route("/fivedaysActivities").get(getFiveDaysStats);

offersRoute.route("/:id").get(getOffer);
offersRoute.route("/approve/:id").patch(approveOffer);
offersRoute.route("/reject/:id").patch(rejectOffer);

module.exports = offersRoute;
