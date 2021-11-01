const path = require("path");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadDishImageLocal = async (req, res) => {
  console.log(req.files);
  if (!req.files) {
    throw Error("No File Uploaded");
  }

  const dishImage = req.files.image;
  if (!dishImage.mimetype.startsWith("image")) {
    throw Error("Please Upload Image");
  }

  const maxSize = 1024 * 1024;
  if (dishImage.size > maxSize) {
    throw Error("Please upload image smaller than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${dishImage.name}`
  );

  await dishImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${dishImage.name}` } });
};

const uploadDishImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: false,
      folder: "dishes-photo",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  console.log(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadDishImage,
  uploadDishImageLocal,
};
