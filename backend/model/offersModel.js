const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  currentlyWorkingAt: {
    type: String,
  },
  numOffers: {
    type: Number,
    required: [true, "Number of Offers is required"],
    min: 1,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  rejectedReason: String,
  offers: [
    {
      companyName: {
        type: String,
        required: [true, "Company Name is required"],
        trim: true,
      },
      companyType: {
        type: String,
        required: [true, "Company Type is required"],
        enum: ["core", "IT", "others"],
      },
      joiningDate: {
        type: Date,
        required: [true, "Joining Date is required"],
      },
      stipend: {
        type: Number,
        required: [true, "Stipend is required"],
      },
      location: {
        type: String,
        required: [true, "Location is required"],
      },
      internshipOfferLetter: {
        type: String,
        // required: [true, 'Internship Offer Letter is required']
      },
      jobOfferLetter: {
        type: String,
        // required: [true, 'Job Offer Letter is required']
      },
      letterOfIntend: {
        type: String,
        // required: [true, 'Letter of Intent is required']
      },
    },
  ],
});

offerSchema.pre(/^find/, function () {
  this.populate({
    path: "student",
    select: "fullName email dep batch phoneNo RegNo -_id",
  });
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
