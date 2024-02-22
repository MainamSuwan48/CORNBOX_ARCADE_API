const uploadService = require("../services/upload-service");
const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");

exports.uploadTest = catchError(async (req, res) => {
  const path = req.file.path;
  const secure_url = await uploadService.upload(path);
  if (!secure_url) {
    throw createError(500, "Image upload failed");
  }

  res
    .status(200)
    .json({ message: "Image uploaded successfully", url: secure_url });
});
