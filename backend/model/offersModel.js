const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerLetterSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
    trim: true,
  },
  companyType: {
    type: String,
    required: [true, "Company Type is required"],
    enum: ["Core", "IT", "Others"],
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
  letterOfIntent: {
    type: String,
    // required: [true, 'Letter of Intent is required']
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  rejectedReason: {
    type: String,
  },
});

// Auto-populate the student details when querying OfferLetter documents
offerLetterSchema.pre(/^find/, function () {
  this.populate({
    path: "student",
    select: "fullName email dep batch phoneNo RegNo -_id",
  });
});

const OfferLetter = mongoose.model("OfferLetter", offerLetterSchema);

module.exports = OfferLetter;
