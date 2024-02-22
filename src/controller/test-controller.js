const uploadService = require("../services/upload-service");
const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");

exports.uploadTest = catchError(async (req, res) => { 
  res.status(200).json({ message: "Image uploaded successfully", file: req.file.path });
});
