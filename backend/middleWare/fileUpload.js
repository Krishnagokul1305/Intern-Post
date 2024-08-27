const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const imageStorage = multer.memoryStorage();
const path = require("path");

exports.uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[0] == "image") {
      cb(null, true);
    } else {
      cb("Invalid file Please upload image", false);
    }
  },
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/offers")); // Save files in 'public/offers'
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using uuid
    const uniqueName = `${file.fieldname}-${uuidv4()}.pdf`;
    cb(null, uniqueName);
  },
});

// Initialize multer with storage and file filter
exports.uploadFiles = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Please upload a PDF."), false);
    }
  },
});

exports.resize = (fileService) => async (req, res, next) => {
  try {
    if (fileService === "user" && req.file) {
      const fileName = `user-${uuidv4()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, "../public/user", fileName));

      req.body.avatar = fileName;
    }
    if (fileService == "offers" && req.files) {
      console.log("offers");
      if (req.files.letterOfIntent) {
        req.body.letterOfIntent = req.files.letterOfIntent[0].filename;
      }
      if (req.files.jobOfferLetter) {
        req.body.jobOfferLetter = req.files.jobOfferLetter[0].filename;
      }
      if (req.files.internshipOfferLetter) {
        req.body.internshipOfferLetter =
          req.files.internshipOfferLetter[0].filename;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
